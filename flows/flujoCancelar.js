const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const flujoCancelar = addKeyword(EVENTS.ACTION).addAnswer('Se canceló tu proceso de registro, intentalo de nuevo', null, (ctx, ctxFn) => {
    ctxFn.state.update({ botOn: 'true' })
    return
  })

  module.exports = flujoCancelar