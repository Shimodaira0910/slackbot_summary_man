import { App } from '@slack/bolt'
import { load } from 'ts-dotenv'

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

app.message('', async ({ message, say }) => {
    if (!message.subtype) {
      await say(`Hello, <@${message.user}>. You said: ${message.text}`);
    }
});

(async () => {
    //⑤SlackBotを起動する
    await app.start(port || 3000);
  
    console.log('⚡️ Bolt app is running!');
  })();