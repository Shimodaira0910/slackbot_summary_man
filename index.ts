import SlackBot from "./slack/slackBot";

const bot = new SlackBot();
bot.start();
bot.sendMessage();