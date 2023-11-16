const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flowDistribuidor = require("./flowDistribuidor");


const flowPrincipal = addKeyword(EVENTS.WELCOME)
.addAnswer('Bivenid@ a *Demo Bot de Semicirculo*', null, async (_, { flowDynamic }) => {
  try {
      await flowDynamic([
        {body:'Soy demobot tu asistente el día de hoy'},
        {body:`¿Qué tipo de bot quieres probar?
*1* Bot de reparación de celulares
*2* Bot para reservar clase de prueba`},
      ])

  } catch (error) {
    // Manejar el error de la promesa aquí
    console.error('Error al procesar la acción:', error);
  }
}).addAnswer('Escríbe en el chat el número del bot que quieres probar! ', { capture: true})
  .addAction(async (ctx, ctxFn) => {
    try {
      if(ctx.body === '1' || ctx.body === '2' || ctx.body === '3' || ctx.body === '4' || ctx.body === '5' ) {
        console.log('entra al actión principal para mandar a distribuidor','hola')
        return ctxFn.gotoFlow(flowDistribuidor)
      } else {
        ctxFn.fallBack('Intenta de nuevo')
      }
    } catch (error) {
      // Manejar el error de la promesa aquí
      console.error('Error al procesar la acción:', error);
    }
  })

module.exports = flowPrincipal;