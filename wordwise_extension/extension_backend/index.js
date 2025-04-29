import { getAuth } from "firebase-admin/auth";
import express from 'express';
import admin from 'firebase-admin';
import  { GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const geminiAPIKEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey : geminiAPIKEY});



const config = { 
  credential : admin.credential.cert({
    "type": process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
    "project_id": process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    "client_id":process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
    "token_uri": process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X590_CENT_URL,
    "client_x509_cert_url": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X590_CERT_URL,
    "universe_domain": process.env.FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN
  })
}
const firebaseApp = admin.apps.length ? admin.app() : admin.initializeApp(config);
const allWordsDB = admin.firestore(firebaseApp);





//checking whether user exists or not by email
app.get('/check/:email', async (req,res) => {
    const {email }= req.params;
    console.log(email);
    try {
      const userRecord = await getAuth().getUserByEmail(email);
      if(userRecord) { 
        res.status(200).send({userExists : userRecord.emailVerified  })
      }
    } catch (error) {
      res.status(500).send(error);
    }
    
});
  
//getting random word
app.get('/randomWord/:idx', async(req,res) => { 
  const {idx} = req.params;
 
  try {
    const allWordsResponse = await fetch('https://api-cdn.dioco.io/base_dict_getAllWordsForLang?lang_G=de&numWords=8000')
    const allWords = await allWordsResponse.json();

    const word = allWords.data.words[parseInt(idx)].text;
  
    const randomWordPrompt = `Give the english translation for the word ${word}. Answer should be in json format and i want the following things   
   {
      germanWord : the word i gave to you, 
      englishWord : English translation of that word , 
      exampleSentenceEnglish : a sentence in english using that word, 
      exampleSentenceGerman : german translation of exampleSentenceEnglish
}
`
    //using ai
    

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: randomWordPrompt,
      });
      //console.log(response.text);
    
  
   if(response) { 
    const cleaned = response.text
  .replace(/```json\n?/, '')  // remove ```json or ```json\n
  .replace(/```/, '')         // remove trailing ```
  .trim();                    // trim whitespace or \n

     console.log(cleaned);
const parsedData = JSON.parse(cleaned); // finally parse it
res.json(parsedData);                   // send real JSON to frontend

   }
  } catch (error) {
    res.send(error);
  }
})

app.post('/addWord',async (req, res) =>  { 

  /**
   * things i need to add the data to the respective user's collection 
   * first userID 
   * new Word
   * check in the front end that the word you tryna add doesn't already exist 
   */

  const {userID, word, definition, example} = req.body;

  try {
    const newWord =  { 
      word : word, 
      definition : definition, 
      example : example,
    }
    
    const response = await allWordsDB.collection(`users/${userID}/words`).add(newWord);
    
    if(response) { 
      res.status(201).json({message : "added successfully", word : response});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
 
  
})



app.listen(3000, () => { 
    console.log('app is listening at 3000');
})
