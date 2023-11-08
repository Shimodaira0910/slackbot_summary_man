import { App } from '@slack/bolt'
import { load } from 'ts-dotenv'
import Translate from '../translate/translate';

class SlackBot{
    private app: App;
    private port: number;
    private tr: Translate;

    constructor() {
        const env = load({
            SLACK_BOT_TOKEN: String,
            SLACK_SIGNING_SECRET: String,
            PORT: Number
        });
        
        this.app = new App({
            token: env.SLACK_BOT_TOKEN,
            signingSecret: env.SLACK_SIGNING_SECRET
        })
        
        this.port = env.PORT;    
        this.tr = new Translate();
    }

   processMessage(){
    this.app.message('', async ({ message, say }) => {
        const userMessage: string = message.toString();
        const alterMessage: string = this.tr.fetchApiData(userMessage);

        if(!message.subtype) {
            await say(alterMessage);
        }
    })
   }

   sendMessage(){
    this.app.message('', async ({ message, say }) => {
        if (!message.subtype) {
          await say(`Hello, <@${message.user}>. You said: ${message.text}`);
        }
      });
   }

    async start(){
        await this.app.start(this.port || 3000);
        console.log('Bolt is running!!')
   }
}

export default SlackBot;