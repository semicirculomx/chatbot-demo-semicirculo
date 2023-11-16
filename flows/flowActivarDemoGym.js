const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flujoBienvenida = require("./flowBienvenida_gym");

const flowActivarDemoGym = addKeyword(EVENTS.ACTION)
.addAnswer('Listo', {delay: 1000}, (ctx, ctxFn) => {
    try {
        if(ctx.body === '1'){
            console.log('activador_gym');
             return ctxFn.gotoFlow(flujoBienvenida)
        } 
    } catch (error) {
        console.error('Error al procesar la acción:', error);
    }

})


module.exports = flowActivarDemoGym 