import Botkit from 'botkit'

const controller = Botkit.slackbot({debug: false});
const bot = controller.spawn({
  token: process.env.token
}).startRTM();

controller.hears(
  ['Hello'],
  'direct_message, direct_mention, mention',
  (bot, message) => {
    bot.api.users.info(
      {user: message.user}, (err, res) => {
        bot.reply(
          message,
          'こんにちは、' + res.user.name + 'さん'
        );
      }
    );
  }
);
