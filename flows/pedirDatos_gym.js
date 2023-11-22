const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flujoCancelar = require('./flujoCancelar');

const flujoDespedida = addKeyword(EVENTS.ACTION)
.addAnswer('¡Perfecto, ya confirmamos tus datos! ', null, async (ctx, ctxFn) => {
    const currentState = ctxFn.state.getMyState()
    const nombreCapturado = currentState?.nombreCapturado
    await ctxFn.flowDynamic({body:`Un placer atenderte ${nombreCapturado}. `})
})
.addAnswer("Si deseas activar el bot de nuevo, escribe 'PRUEBABOT'.")

const confirmarDatos = addKeyword(EVENTS.ACTION)
.addAnswer('¿Deseas confirmarlo? (SI/NO)', { capture: true, idle: 20000 }, async (ctx, ctxFn) => {

    let intentos = ctxFn.state.getMyState().intentos ? ctxFn.state.getMyState().intentos: 0;
    console.log(ctxFn.state.getMyState(), intentos)

    if(ctx?.idleFallBack) return ctxFn.gotoFlow(flujoCancelar)

    if (ctx.body === 'SI' || ctx.body === 'si' || ctx.body === 'Si' || ctx.body === 'sii') {
        console.log('flow_confirmar_si')
      // Confirmar y guardar en el state
      ctxFn.state.update({ botOn: 'true' });
      return ctxFn.gotoFlow(flujoDespedida);

    } else if (ctx.body === 'NO' || ctx.body === 'no' || ctx.body === 'No' || ctx.body === 'Noo') {
        console.log('flow_confirmar_no')
      // Repetir el proceso o finalizar después de 3 intentos
      intentos = intentos + 1
      if (intentos < 3) {
        await ctxFn.state.update({ intentos: intentos });
        console.log(ctxFn.state.getMyState(), intentos)
        return ctxFn.gotoFlow(flujoPedirDatos);

      } else {
        return ctxFn.gotoFlow(flujoCancelar);
      } 

    }
  }, [flujoDespedida])

  const flujoPedirDatos = addKeyword(EVENTS.ACTION)
  .addAnswer('Antes de continuar, escríbe tu nombre para poder recordarte después', { capture: true, idle: 20000 }, async (ctx, ctxFn) => {
    console.log('flow_pedirdatos')
    if(ctx?.idleFallBack) return ctxFn.gotoFlow(flujoCancelar)
    if (ctx.body) {
      ctxFn.state.update({ nombreCapturado: ctx.body });
    }
     await ctxFn.flowDynamic([{body: `¡Gracias!, ${ctx.body}.`}]);
     return ctxFn.gotoFlow(confirmarDatos)

  }, [confirmarDatos])

module.exports = flujoPedirDatos;
