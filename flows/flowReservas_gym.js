const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const flujoReserva = addKeyword(EVENTS.ACTION)
  .addAnswer(`🥊 ¡Excelente elección! Aquí están las opciones de clases disponibles y sus horarios`)
  .addAnswer(`
1. Clase de Boxeo Tradicional:
  - Lunes a Viernes: 18:00 - 19:30
  - Sábado: 10:00 - 11:30
  
2. Clase de Entrenamiento Funcional:
  - Martes y Jueves: 19:00 - 20:30
  - Sábado: 12:00 - 13:30
  
3. Clase de Boxeo Cardio:
  - Lunes, Miércoles y Viernes: 20:00 - 21:30
  - Sábado: 14:00 - 15:30

¡Estaremos emocionados de tenerte con nosotros!`)
.addAnswer('Te enviaré un enlace para completar tu reserva.', null, async (ctx, { state, flowDynamic }) => {
    const fecha = ctx.body;
    state.update({ fechaReserva: fecha, botOn: 'true' });    // Lógica para generar y enviar un enlace de compra
    const enlaceCompra = 'https://boxmagic.cl/sport_page/Elltimoround47';
    await flowDynamic(['Puedes completar tu reserva haciendo clic en este enlace: ' + enlaceCompra]);
  });

module.exports = flujoReserva;
