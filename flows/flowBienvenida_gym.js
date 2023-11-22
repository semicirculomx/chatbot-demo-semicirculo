const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flujoPedirDatos = require('./pedirDatos_gym');
const flujoInformacion = require('./flowInfo_gym');
const delay = require('../utils');

const flujoBienvenida = addKeyword(EVENTS.ACTION)
.addAnswer( `👋 🥊 ¡Bienvenido al Club de Boxeo "El Último Round"! 🥊`)
.addAnswer(
   [ `Con gusto te brindamos más información sobre nuestros servicios.`],
    null,
    async (ctx, { state, gotoFlow }) => {
      const currentState = state.getMyState();
      try {
        console.log('flow_bienvenida');
        if (!currentState?.nombreCapturado) {
          
          return gotoFlow(flujoInformacion);
        } else {
          return gotoFlow(flujoInformacion);
        }
      } catch (error) {
        console.error('Error al procesar la acción:', error);
      }
    }
  );

module.exports = flujoBienvenida;

