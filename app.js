const express = require('express');
const {Telegraf, Markup, Scenes, session} = require('telegraf');
require('dotenv').config()

const nannyCancellationScene  = require('./nannyCancel');
const cancellationScene = require('./cancellation');
const nannyRequestScene = require('./nannyRequest');

const PORT = process.env.PORT || 3000;
const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN)
const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true
    })
  )

const stage = new Scenes.Stage([nannyCancellationScene, cancellationScene]);
bot.use(session());
bot.use(stage.middleware())


bot.hears('Няня отменила визит', ctx => ctx.scene.enter('nannyCancellationWizzard'));
bot.hears('Отменить визит', ctx => ctx.scene.enter('cancellationWizzard'));
bot.hears('Запрос на няню', ctx => ctx.scene.enter('nannyRequestWizzard'));



bot.start(async (ctx) => {
    console.log(ctx.scene)
    try{
        const {first_name} = ctx.from;
        await ctx.reply(`Добрый день ${first_name}, какой у вас вопрос?`, Markup.keyboard([["Няня отменила визит"], ["Отменить визит"]]).oneTime().resize())
    }catch(e){
        console.log(e)
    }
})

bot.launch();

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})