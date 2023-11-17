const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const flujoPedirDatos = addKeyword(EVENTS.ACTION)
.addAnswer('¿Cómo te llamas? Por favor, escríbeme tu nombre.', {capture: true} , (ctx, ctxFn ) => {
    console.log('pedir datos')
    if(ctx.body) {
        ctxFn.state.update({nombre: ctx.body})
    }
    return ctxFn.endFlow('Gracias! seguimos pendientes')
})

module.exports = flujoPedirDatos