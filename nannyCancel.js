const {Markup, Composer, Scenes } = require('telegraf');


const startStep = new Composer();
startStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data = {};
        ctx.wizard.state.data.title = ctx.message.text;
        ctx.wizard.state.data.username = ctx.message.from.username;
        ctx.wizard.state.data.firstName = ctx.message.from.first_name;
        ctx.wizard.state.data.lastName = ctx.message.from.last_name;
        await ctx.replyWithHTML("<b>Введите имя и фамилию ребенка</b>")
        return ctx.wizard.next();
    }catch(e){
        console.log(e);
    }
})

const nannyInfoStep = new Composer();
nannyInfoStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.childInfo = ctx.message.text;
        await ctx.replyWithHTML("<b>Введите имя и фамилию няни</b>")
        return ctx.wizard.next();
    }catch(e){
        console.log(e);
    }
})

const dateStep = new Composer();
dateStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.nannyInfo = ctx.message.text;
        await ctx.replyWithHTML("<b>Введите дату и время визита</b>")
        return ctx.wizard.next();
    }catch(e){
        console.log(e);
    }
})

const finalStep = new Composer();
finalStep.on('text', async (ctx) => {
    try {
        ctx.wizard.state.data.dateInfo = ctx.message.text;
        const wizardData = ctx.wizard.state.data;
        await ctx.replyWithHTML(`<b>Ваше обращение:\nТема: <i>${wizardData.title}</i>\nИмя и фамилия ребенка: <i>${wizardData.childInfo}</i>\nИмя и фамилия няни: <i>${wizardData.nannyInfo}</i>\nДата и время визита: <i>${wizardData.dateInfo}</i></b>`)
        await ctx.replyWithHTML("<b>Спасибо! Ваша заявка была успешно отправлена и будет обработана в ближайшее время!</b>")
        await ctx.telegram.sendMessage(process.env.CHAT_ID, `Новая заявка!\nТема: ${wizardData.title}\nИмя и фамилия ребенка: ${wizardData.childInfo}\nИмя и фамилия няни: ${wizardData.nannyInfo}\nДата и время визита: ${wizardData.dateInfo}\nИмя отправителя: ${wizardData.firstName} ${wizardData.lastName}\nИмя пользователя отправителя: ${wizardData.username}`)
        return ctx.scene.leave();
    }catch(e){
        console.log(e);
    }
})


const nannyCancellationScene = new Scenes.WizardScene('nannyCancellationWizzard', startStep, nannyInfoStep, dateStep, finalStep);
module.exports = nannyCancellationScene;