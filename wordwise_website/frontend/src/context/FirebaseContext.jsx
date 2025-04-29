import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, getFirestore, addDoc, query, where } from 'firebase/firestore';


export const useFirebase = createContext();


//firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDD_n0qhvKuorl6YwJyIy9ObgfcUX3x6bE",
    authDomain: "fluentify-7a78a.firebaseapp.com",
    projectId: "fluentify-7a78a",
    storageBucket: "fluentify-7a78a.firebasestorage.app",
    messagingSenderId: "1096214608573",
    appId: "1:1096214608573:web:e947b22b3542da8ba695d4"
};

//initializing the firebase app -- that's the very first step !!
const app = initializeApp(firebaseConfig);

//initializing the authentication 
const auth = getAuth(app);

const FirebaseContext = (props) => {

    //user's info initialization
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [allWords, setAllWords] = useState([]);
    const [userID, setUserID] = useState('');
    const [gotData, setGotData] = useState(false);
    const newWords = [];

    //navigation
    const navigate = useNavigate();

    //getting the database instance 
    const wordsDB = getFirestore(app);

    //creating a user in the database
    const createUser = (email, password) => {
        let errorCreatingUser = undefined;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;

                return updateProfile(user, {
                    displayName: name
                })
            })
            .catch((error) => {
                errorCreatingUser = error.message;

                throw error
            })

        if (errorCreatingUser) {
            return errorCreatingUser;
        } else {
            return true;
        }
    }


    //authenticating the user in the database - email/password method
    const signInUser = (email, password) => {
        let errorSigningUser = undefined;

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                if (user) {
                    console.log("login successful")
                }
            })
            .catch((error) => {
                errorSigningUser = error.message;

                throw error
            })

        if (errorSigningUser) {
            return errorSigningUser;
        } else {
            return null;
        }
    }

  

    //checking where the user has logged in b4 or not
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setUserID(user.uid);
                setIsLoggedIn(true);

                if (!gotData) {
                    getAllWords();
                    setGotData(true);

                }
            } else {
                setUser(null);
            }
        })
    }, [])


    

    // useEffect(()=>{
    //   if(!gotData && user){
    //     getAllWords();
    //     setGotData(true);

    //   }
    // },[user])



    //logging out the user
    const logOut = () => {
        if (user) {
            signOut(auth).then(() => {

                console.log('logged out')
                newWords.splice(0, newWords.length);
                setAllWords([])
                navigate('/');
                setIsLoggedIn(false);

            })
        }
    }

    //getting all the words from the firestore

    const getAllWords = async () => {
        newWords.splice(0, newWords.length);
        const user = auth.currentUser;
        if (user !== null) {
            //create a users ref
            const currentUserRef = collection(wordsDB, 'users');


            //search the document where email === currentUser.email
            const currentUserDocQuery = query(currentUserRef, where("email", "==", `${user.email}`))
            const currentUserDocRef = await getDocs(currentUserDocQuery);
            let currentUserDocID = '';
            currentUserDocRef && currentUserDocRef.forEach((item) => {
                const itemPath = item._key.path.segments;
                currentUserDocID = itemPath[itemPath.length - 1];

            })
            //create a words collection ref associated with the currentUser
            const userWordsCollectionRef = collection(wordsDB, 'users', currentUserDocID, 'words');

            //get the data
            const allWordsSnapshot = await getDocs(userWordsCollectionRef);
            allWordsSnapshot.forEach((item) => {

                const newWord = {
                    word: item.data().word,
                    translation: item.data().translation,
                    definition: item.data().definition,
                    example: item.data().example,
                }
                newWords.some(w => w.word === newWord) ? null : newWords.push(newWord);
            });
            setAllWords((prev) => [...prev, ...newWords.filter(word => !prev.some(w => w.word === word.word))]);
        } else {
            console.error("not getting words");
        }

    }

    //adding new user into the database for his/her words storage
    const addUserIntoDatabase = async (name, email, language, avatarIndex) => {
        let errorAddingUser = '';
        try {
            await addDoc(collection(wordsDB, "users"), {
                name: name,
                email: email,
                language: language,
                avatarIndex: avatarIndex,
            });

        } catch (error) {
            errorAddingUser = error;
            throw error;
        }
        if (errorAddingUser) {
            console.error(errorAddingUser);
        } else {
            return true;
        }
    }


    //reset password
    const resetUserPassword = async () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("password email sent");
            })
            .catch((error) => {
                console.error("error in sending reset password msg", error);
            })
    }



    return (
        <useFirebase.Provider value={{ createUser, signInUser, name, setName, email, setEmail, password, setPassword, isLoggedIn, logOut, user, getAllWords, allWords, setAllWords, addUserIntoDatabase, userID, setUserID, resetUserPassword, avatarIndex, setAvatarIndex }}>
            {props.children}
        </useFirebase.Provider>
    )
}

export default FirebaseContext