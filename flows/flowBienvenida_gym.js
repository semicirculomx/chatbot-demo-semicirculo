const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flujoPedirDatos = require('./pedirDatos_gym');
const flujoInformacion = require('./flowInfo_gym');

const flujoBienvenida = addKeyword(EVENTS.ACTION)
.addAnswer('👋 ¡Hola! Soy el asistente virtual del Gimnasio de Box "Último Round".', null, async (ctx, ctxFn) => {
    const currentState = ctxFn.state.getMyState()
    try {
            console.log('bienvenida_gym');
            if (!currentState?.nombre) {
                ctxFn.state.update({ preguntandoNombre: true });
                return ctxFn.gotoFlow(flujoPedirDatos)
            }
         else {
                ctxFn.state.update({ preguntandoNombre: false });
                return ctxFn.gotoFlow(flujoInformacion)
              } 
    } catch (error) {
        console.error('Error al procesar la acción:', error);
    }
      
  })

module.exports = flujoBienvenida;
