import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();
const app = express();
const port = 3000;
const configuration = new Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.OPENAI_KEY,
  });
const openai = new OpenAIApi(configuration);

app.use(express.json());

app.get('/', async (req, res) => {    
    
    try {
        if(!req.body.prompt) throw new Error("Prompt is required");
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.prompt,
            max_tokens: 200,
          });
        // retrieve the completion text from response
        const completion = response.data.choices[0].text;

        res.json({blog: completion});
    } catch (error) {        
        res.json({error: error.message});
    }    

    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);