import { OpenAI } from "openai";
import { load } from 'ts-dotenv';

class AIAgent {
    private openAiKey: string;
    private importantOrder: string;
    private openai: OpenAI;
    
    constructor(){
        const env = load({
            OPENAI_KEY: String,
            IMPORTANT_ORDER: String,
        });
        this.openAiKey = env.OPENAI_KEY;
        this.importantOrder = env.IMPORTANT_ORDER;
        this.openai = new OpenAI({
            apiKey: this.openAiKey,
        })
        
    }

    askAi = async (message: string) => {
        const compliment = await this.openai.chat.completions.create({
            messages:[{
                role: 'user', content:`Please summarize the following message ${message} Also, be sure to observe the following orders ${this.importantOrder}`,
            }],
            model: "gpt-3.5-turbo",
        });

        console.log(compliment);
    }
}

export default AIAgent;