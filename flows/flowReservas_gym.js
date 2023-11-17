const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const flujoReserva = addKeyword(EVENTS.ACTION)
  .addAnswer('¡Genial! ¿Te gustaría reservar una clase de muestra gratuita?', null, async (ctx, { state, flowDynamic, gotoFlow }) => {
    await flowDynamic(['Perfecto. Para comenzar, ¿puedo obtener tu número de teléfono?']);
    state.update({ preguntandoTelefono: true });
  })
  .addAnswer(
    'Mi número de teléfono es:',
    { capture: true },
    async (ctx, { state, flowDynamic, fallBack }) => {
      const telefono = ctx.body;
      if (!telefono.match(/^\d{10}$/)) {
        return fallBack('Por favor, ingresa un número de teléfono válido.');
        
      } else {
        state.update({ telefono, preguntandoTelefono: false });
        await flowDynamic(['¡Gracias! ¿Cuándo te gustaría tomar tu clase de muestra?']);
      }
    }
  )
  .addAnswer('Me gustaría reservar para', { capture: true }, async (ctx, { state, flowDynamic }) => {
    const fecha = ctx.body;
    state.update({ fechaReserva: fecha });
    await flowDynamic(['Excelente. Por último, te enviaré un enlace para completar tu reserva.']);
    // Lógica para generar y enviar un enlace de compra
    const enlaceCompra = 'https://ejemplo.com/comprar';
    await flowDynamic(['¡Todo listo!', 'Puedes completar tu reserva haciendo clic en este enlace: ' + enlaceCompra]);
  });

module.exports = flujoReserva;
