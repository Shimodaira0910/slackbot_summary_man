import SlackBot from "./api/slack/slackBot";

const bot = new SlackBot();
bot.start();
bot.sendMessage();