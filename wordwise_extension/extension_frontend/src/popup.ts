import "./common.css";
// import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const backendBaseUrl = "https://wordwise-extension-backend-1.onrender.com";
//types
type RandomWord = {
  word: string;
  definition: string;
  example: string;
};
type newWord = { 
  word: string, 
  definition : string,
}

//getting the env variables
const apiKey = <string>process.env.API_KEY;
const FIREBASE_API_KEY = <string>process.env.FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = <string>process.env.FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = <string>process.env.FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = <string>process.env.FIREBASE_STORAGE_BUCKET;
const FIREBASE_SENDER_ID = <string>process.env.FIREBASE_SENDER_ID;
const FIREBASE_APP_ID = <string>process.env.FIREBASE_APP_ID;

//Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const wordsDB = getFirestore(app);
let userID;
let userDocID;
const allWords: RandomWord[] = [];

//accessing all dom elements

const emailFormContainer = document.getElementById(
  "email-container"
) as HTMLDivElement;
const randomWordContainer = document.getElementById(
  "random-word-container"
) as HTMLDivElement;
const userEmailInput = document.getElementById(
  "email-input"
) as HTMLInputElement;
const emailSubmitButton = document.getElementById(
  "email-submit-button"
) as HTMLButtonElement;
const wordPNode = document.getElementById("word") as HTMLParagraphElement;
const definitionPNode = document.getElementById(
  "definition"
) as HTMLParagraphElement;
const examplePNode = document.getElementById("example") as HTMLParagraphElement;
const errorPNode = document.getElementById("error-para") as HTMLParagraphElement;



const doesEmailExistInLocalStorage =  localStorage.getItem('wordwiseUserEmail');
const isRandomWordIndex = localStorage.getItem("wordwiseRandomWordIndex");
const randomWordIndex = isRandomWordIndex ? parseInt(isRandomWordIndex) : 0;

//at startup
function displayRandomWord() {
  generateRandomWord().then((responseData) => {
    wordPNode.innerHTML = responseData?.word;
    definitionPNode.innerHTML = responseData?.definition;
    examplePNode.innerHTML = <string>responseData?.example;

    //adding the new word to firestore
    addNewWordToFirebase(<RandomWord>responseData, <string>localStorage.getItem('wordwiseUserEmail'));

    // adding this new word to chrome storage
    chrome.storage.local.get(['wordwiseAllWordsList'], (res) => { 
      const storedWordsList = res.wordwiseAllWordsList || [];
      
      const modifiedWord = {
        word : responseData?.definition, 
        definition : responseData?.word,
      }
      if(storedWordsList.length >= 0 && storedWordsList.findIndex((word : newWord )=> word.word === modifiedWord.word) < 0) { 
        storedWordsList.push(modifiedWord);
      }
      chrome.storage.local.set({wordwiseAllWordsList : storedWordsList});
      
    })

    

    //increment the random word index in local storage
    localStorage.removeItem('wordwiseRandomWordIndex');
    localStorage.setItem('wordwiseRandomWordIndex',`${randomWordIndex + 1}` );
  });
}
if (doesEmailExistInLocalStorage) {
  //make email form hidden
  emailFormContainer.classList.remove("flex");
  emailFormContainer.classList.add("hidden");
  //make random word visible
  randomWordContainer.classList.add("flex");
  randomWordContainer.classList.remove("hidden");

  // show the random word
  displayRandomWord();
} else {
  //make email form visible
  emailFormContainer.classList.remove("hidden");
  emailFormContainer.classList.add("flex");
  //make random word hidden
  randomWordContainer.classList.add("hidden");
  randomWordContainer.classList.remove("flex");
}

emailSubmitButton.addEventListener("click", handleEmailSubmitEvent);

async function handleEmailSubmitEvent() {
  if (userEmailInput.value && userEmailInput.value.length <= 0) {
    alert("Invalid Email ID");
    return;
  }
  try {
    const userEmail = userEmailInput.value;
    const response = await fetch(`${backendBaseUrl}/check/${userEmail}`);
    const responseData = await response.json();
    const doesUserExists = responseData ? responseData.userExists : false;
    if(response.status === 500 || response.status === 404) { 
      errorPNode.innerHTML = "This email doesn't have any account. Please sign up!!!";
    }
    if (doesUserExists) {
      localStorage.setItem("wordwiseUserEmail", userEmail);
      //make email form hidden
      emailFormContainer.classList.remove("flex");
      emailFormContainer.classList.add("hidden");
      //make random word visible
      randomWordContainer.classList.add("flex");
      randomWordContainer.classList.remove("hidden");
      
      // show the random word
      displayRandomWord();
    } 
    
  } catch (error) {
    errorPNode.innerHTML = "This email doesn't have any account. Please sign up!!!";
    console.error("some error while fetching the user");
  }
  userEmailInput.value = "";
}

//dont change it
async function generateRandomWord() {
  try {
    const response = await fetch(
      `${backendBaseUrl}/randomWord/${randomWordIndex}`
    );
    const text = await response.text(); // get it as raw text
    const responseData = JSON.parse(text.trim()); // remove \n and parse
    console.log(responseData);
    if (response && responseData) {
      const newWord = {
        word: responseData?.["germanWord"],
        definition: responseData?.["englishWord"],
        example: `${responseData?.["exampleSentenceEnglish"]} ( ${responseData?.["exampleSentenceGerman"]} )`,
      };
      return newWord;
    }
  } catch (error) {
    console.error("Error while fetching new word from the backend", error);
  }
}

async function addNewWordToFirebase(newWord: RandomWord, userEmail: string) {
  //get Collection ref where the email === userEmail
  const collectionRef = collection(wordsDB, "users");
  const currentUserDocQuery = query(
    collectionRef,
    where("email", "==", userEmail)
  );
  const currentUserDocRef = await getDocs(currentUserDocQuery);
  let currentUserDocID = "";
  currentUserDocRef &&
  currentUserDocRef.forEach((item) => {
    console.log(item);
    // const itemPath = item._key.path.segments;
      currentUserDocID = item.id;
    });



    
    console.log("curreunt user",currentUserDocRef,currentUserDocID)
    if(currentUserDocID.length > 0) {
      const modifiedWord = { 
        word : newWord.word, 
        definition : newWord.definition, 
        example : newWord.example,
        userID : currentUserDocID,
      } 
      try {
        const response = await fetch(`${backendBaseUrl}/addWord`, { 
          method: 'POST', 
          headers: { 
  
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(modifiedWord)
          
        })

        if(response)  { 
          console.log(response);
        }
      } catch (error) {
        console.error("Error adding new Word", error);
      }
    

      
      
      

    }

}

async function checkEmail() {
  const userEmail = localStorage.getItem("wordwiseUserEmail");
  if (!userEmail) {
    return -1;
  } else {
    //call to the backend api to check whether user exists or not
    // for now lets assume it does
    try {
      const response = await fetch(`${backendBaseUrl}/check/${userEmail}`);
      const responseData = await response.json();
      console.log(responseData);
      const doesUserExists = responseData ? responseData.userExists : false;

      if (doesUserExists) {
        return { email: userEmail };
      } else {
        return -1;
      }
    } catch (error) {
      console.error("some error while fetching the user");
    }
  }
}