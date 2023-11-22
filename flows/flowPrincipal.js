const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flowDistribuidor = require("./flowDistribuidor");
const flujoCancelar = require("./flujoCancelar");

const flowPrincipal = addKeyword('BOXBOT')
.addAction((_, { state, endFlow }) => {
    if (state.getMyState()?.botOn === 'false') {
      state.update({ botOn: 'true' })
      return endFlow()
    }
})
.addAnswer('Bivenid@ a los chats *Demo de Semicirculo*', null, async (_, { state, flowDynamic, endFlow }) => {
        console.log('flow_principal')
        state.update({ botOn: 'false' })
        await flowDynamic([
          {
            body: `¿Qué Asistente deseas probar?
👉 *1* SmartBot *Club de boxeo*`},
        ])
      
   })
.addAnswer('Escríbe en el chat el número del bot que quieres probar! ', { capture: true, idle: 20000 }, async (ctx, { state, fallBack, gotoFlow }) => {
    if (ctx?.idleFallBack) {
      return gotoFlow(flujoCancelar)
    } else {
      if (ctx.body === '1' || ctx.body === '2' || ctx.body === '3' || ctx.body === '4' || ctx.body === '5') {
        state.update({ botOn: 'true' })
        return gotoFlow(flowDistribuidor)
      } else {
        fallBack('Intenta de nuevo')
      }
    }
  })


module.exports = flowPrincipal;