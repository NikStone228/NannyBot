const keyboard = [
    [{ text: 'Отменить визит', callback_data: "1" }],
    [{ text: 'Няня отменила визит', callback_data: "2" }],
    [{ text: 'Запрос на няню', callback_data: "3" }],
]

let options = {
    reply_markup: JSON.stringify({
        inline_keyboard: keyboard,
    })
};


bot.on('callback_query', ctx => {
    if(ctx.callbackQuery.data === "2"){
        ctx.reply('Ты шо охуел?')
    }
    if(ctx.callbackQuery.data === "1"){
        const {first_name, last_name, username} = ctx.from;
        const fullMsg = [];
        ctx.reply('Введите Имя и Фамилию ребенка');
        bot.on('message', (ctx) => {
            fullMsg.push(ctx.message.text);
        })
        ctx.reply('Введите имя Няни');
        bot.on('message', (ctx) => {
            fullMsg.push(ctx.message.text);
        })
        ctx.reply('Введите дату и время визита');
        bot.on('message', (ctx) => {
            fullMsg.push(ctx.message.text);
        })
       
        const sendMsg = async () => {
            const res = `Новое сообщение! ${fullMsg.join('')}`
            const request = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage?chat_id=@${chatId}&text=${res}`);
            const resp = await request.json();
        }
        sendMsg();  
    }
    ctx.reply('Спасибо! Ваша заявка отправлена и будет обработана в ближайшее время!')
    console.log(ctx.callbackQuery.data, 'THIS IS CALLBACK QURY')
})