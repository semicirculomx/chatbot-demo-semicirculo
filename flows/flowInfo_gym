const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flujoReserva = require('./flowReservas_gym');

const horarios = addKeyword(EVENTS.ACTION)
.addAnswer([
    'Nuestros horarios son flexibles:',
    '🕗 Mañanas: 9:00 AM - 12:00 PM',
    '🕒 Tardes: 4:00 PM - 8:00 PM',
    '🌙 Noches: 8:30 PM - 10:00 PM',
  ])
  .addAnswer('¿Quieres reservar una clase de prueba? Escribe RESERVAR', {capture: true}, (ctx, ctxFn) => {
        if(ctx.body === 'RESERVAR') {
            console.log('mandar a reservar')
            ctxFn.gotoFlow(flujoReserva)
        }else if(ctx.body === 'CANCELAR') {
            return ctxFn.endFlow()
        }else {
            ctxFn.fallBack('Intentalo de nuevo o escribe CANCELAR')
        }
  });

const flujoInformacion = addKeyword(EVENTS.ACTION)
  .addAnswer('En el "Último Round" ofrecemos clases de box emocionantes. escribe CLASES', {capture: true}, async (ctx, ctxFn) => {
    if(ctx.body === 'CLASES') {
        console.log('clases')
        return ctxFn.gotoFlow(horarios)
    }
  }, [horarios])
  

module.exports = flujoInformacion;
