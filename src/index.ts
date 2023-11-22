import { App } from '@slack/bolt'
import { load } from 'ts-dotenv'
import Translate from '../api/translate/translate'
import AIAgent from '../api/client/openai'

const env = load({
    SLACK_BOT_TOKEN: String,
    SLACK_SIGNING_SECRET: String,
    PORT: Number
});

const app = new App({
    token: env.SLACK_BOT_TOKEN,
    signingSecret: env.SLACK_SIGNING_SECRET
})

const port = env.PORT;
const tr = new Translate();
const ai = new AIAgent();

app.message('', async ({ message, say }) => {
    if (!message.subtype) {
      const text = message.text;
      const botMessage: string = await tr.fetchApiData(text);
      const test = await ai.askAi(botMessage); 
      await say(botMessage);
    }
});

(async () => {
    await app.start(port || 3000);
    console.log('⚡️ Bolt app is running!!!!');
})();