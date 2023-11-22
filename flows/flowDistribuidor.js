const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flowActivarDemoGym = require("./flowActivarDemoGym");
const delay = require("../utils");


const flowDistribuidor = addKeyword(EVENTS.ACTION)
    .addAnswer('Inicializando la demo..', null, async (ctx, ctxFn) => {
        await delay(2000)
        console.log('flow_distribuidor')
        try {
        if(ctx.body === '1') {
            return ctxFn.gotoFlow(flowActivarDemoGym)
        }else {
            ctxFn.fallBack('Intenta de nuevo ')
        }
    } catch (error) {
        // Manejar el error de la promesa aquí
        console.error('Error al procesar la acción:', error);
      }
    })

module.exports = flowDistribuidor