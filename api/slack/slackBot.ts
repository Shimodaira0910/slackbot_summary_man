import { App } from '@slack/bolt'
import { load } from 'ts-dotenv'

class SlackBot{
    private app: App;
    private port: number;

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
    }

   sendMessage(){
    this.app.message('', async ({ message, say }) => {
        if(!message.subtype){
            await say(`Hello, <@${message.user}>`)
        }
    });
   } 

   processMessage(message: string): string{
    const response: string = message;
    return response;
   }

    async start(){
        await this.app.start(this.port || 3000);
        console.log('Bolt is running!!')
   }
}

export default SlackBot;