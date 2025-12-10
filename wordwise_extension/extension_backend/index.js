import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

//what is this doing 
/**
 * checking whether user exists or not by email
 * getting random word
 */

const app = express();
app.use(express.json());

const geminiAPIKEY = process.env.GEMINI_API_KEY;
if (!geminiAPIKEY) {
  console.error("GEMINI_API_KEY is missing!");
}
const ai = new GoogleGenAI({ apiKey: geminiAPIKEY });

const backendURL = "https://backend.gghimanshu333.workers.dev";


//checking whether user exists or not by email
app.get("/check/:email", async (req, res) => {
  const { email } = req.params;


  try {
    const response = await fetch(
      `${backendURL}/auth/getUserByEmail/${email}`
    );
    const userRecord = await response.json();
    if (userRecord) {
      console.log(userRecord)
      res.status(200).send({ ...userRecord });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//getting random word
app.get("/randomWord/:idx", async (req, res) => {
  const { idx } = req.params;

  try {
    const allWordsResponse = await fetch(
      "https://api-cdn.dioco.io/base_dict_getAllWordsForLang?lang_G=de&numWords=8000"
    );
    const allWords = await allWordsResponse.json();

    const word = allWords.data.words[parseInt(idx)].text;

    const randomWordPrompt = `Give the english translation for the word ${word}. Answer should be in json format and i want the following things   
   {
      word : the word i gave to you, 
      meaning : English translation of that word , 
      example : a sentence in german using that word (its english translation should also be there in brackets), 
}
`;
    //using ai

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: randomWordPrompt,
    });
    //console.log(response.text);

    if (response) {
      const cleaned = response.text
        .replace(/```json\n?/, "") // remove ```json or ```json\n
        .replace(/```/, "") // remove trailing ```
        .trim(); // trim whitespace or \n

      console.log(cleaned);
      const parsedData = JSON.parse(cleaned); // finally parse it
      res.json(parsedData); // send real JSON to frontend
    }
  } catch (error) {
    console.error("Error in /randomWord/:idx:", error);
    res.status(500).json({ error: error.message || error, stack: error.stack });
  }
});


app.listen(3000, () => {
  console.log("app is listening at 3000");
});
