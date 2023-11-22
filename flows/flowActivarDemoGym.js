const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flujoBienvenida = require("./flowBienvenida_gym");
const delay = require('../utils');

const flowActivarDemoGym = addKeyword(EVENTS.ACTION)
.addAnswer('Listo', null, async (ctx, ctxFn) => {
    await delay(1000)
    console.log('flow_activador')
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