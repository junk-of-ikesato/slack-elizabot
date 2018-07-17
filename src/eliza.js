import Botkit from 'botkit'
import ElizaBot from 'elizabot'

const controller = Botkit.slackbot({debug: false});
const bot = controller.spawn({
  token: process.env.token
}).startRTM();

controller.hears(
  ['Hello, Eliza'],
  'direct_message, direct_mention',
  (bot, message) => {
    const eliza = new ElizaBot();
    const askEliza = (res, convo) => {
      convo.ask(eliza.transform(res.text), askEliza);
      convo.next();
    }
    bot.startConversation(message, (err, convo) => {
      convo.ask(eliza.getInitial(), askEliza);
    });
  }
);
