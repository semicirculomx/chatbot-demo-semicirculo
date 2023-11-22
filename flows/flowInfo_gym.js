const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const flujoReserva = require('./flowReservas_gym');
const flujoCancelar = require('./flujoCancelar');
const delay = require('../utils');

const plans = [
  {
    "planIndex": "1",
    "planType": "Anual",
    "planName": "Pro Fight Champ",
    "cost": 9000,
    "buyLink": 'https://boxmagic.cl/market/plan/oV4dkGlLr2',
    "description": "El plan anual perfecto para desafiar tus límites y conseguir resultados rápidos.",
  },
  {
    "planIndex": "2",
    "planType": "Semestral",
    "planName": "Fighter's Evolution",
    "cost": 4800,
    "buyLink": 'https://boxmagic.cl/market/plan/AvLXPJbLEK',
    "description": "Compromiso a largo plazo para mejorar tus habilidades en el boxeo y alcanzar metas de acondicionamiento físico.",
  },
  {
    "planIndex": "3",
    "planType": "Trimestral",
    "planName": "Último Trimestre del Año (Descuento 10%)",
    "cost": 2250,
    "buyLink": 'https://boxmagic.cl/market/plan/eGDGRbn0ZJ',
    "description": "Paga ahora el último trimestre del año por $2,500 y recibe un 10% de descuento. Vuelve a pagar hasta enero en tu fecha de corte. *Válido hasta el 31/10.",
  },
  {
    "planIndex": "3",
    "planType": "Trimestral",
    "planName": "Power Punch",
    "cost": 2100,
    "buyLink": 'https://boxmagic.cl/market/plan/5rLazoW4ja',
    "description": "Perfecto para un impulso de energía y un entrenamiento completo de boxeo y ejercicios funcionales durante tres meses.",
  },
  {
    "planIndex": "4",
    "planType": "Mensual",
    "planName": "Pro",
    "cost": 900,
    "buyLink": 'https://boxmagic.cl/market/plan/j80p3j34W6',
    "description": "Acceso ilimitado para los apasionados del boxeo que quieren entrenar sin límites.",
  },
  {
    "planIndex": "4",
    "planType": "Mensual",
    "planName": "Power Student",
    "cost": 750,
    "buyLink": 'https://boxmagic.cl/market/plan/wvLYJMQ47E',
    "description": "Experiencia suprema para estudiantes. Se requiere presentar credencial de estudiante.",
  },
  {
    "planIndex": "4",
    "planType": "Mensual",
    "planName": "Elite",
    "cost": 700,
    "buyLink": 'https://boxmagic.cl/market/plan/oGDPwbR0b5',
    "description": "Compromiso total con el boxeo y el estado físico. 16 sesiones al mes.",
  },
  {
    "planIndex": "4",
    "planType": "Mensual",
    "planName": "Olympyc",
    "cost": 600,
    "buyLink": 'https://boxmagic.cl/market/plan/Vx0JObKDvB',
    "description": "Entrenamiento intensivo de 12 sesiones al mes como un atleta de élite.",
  },
  {
    "planIndex": "4",
    "planType": "Mensual",
    "planName": "Amateur",
    "cost": 500,
    "buyLink": 'https://boxmagic.cl/market/plan/MeL3n5zDap',
    "description": "8 sesiones al mes para aprender las bases del boxeo y mejorar la técnica.",
  },
  {
    "planIndex": "5",
    "planType": "Por día",
    "planName": "Punch & Power",
    "cost": 100,    
    "buyLink": 'https://boxmagic.cl/market/plan/9KLBkb84GJ',
    "description": "Clase explosiva de boxeo y ejercicios funcionales en 'El Último Round' para mejorar agilidad, fuerza y resistencia.",
  },
  {
    "planIndex": "5",
    "planType": "Por día",
    "planName": "Jumpy Box Promo",
    "cost": 49,
    "buyLink": 'https://boxmagic.cl/market/plan/RX05pwR4OQ',
    "description": "Promoción válida hasta el 03/11/2023. ¡Aprovecha ahora!",
  },
];

const horarios = addKeyword(EVENTS.ACTION)
.addAnswer([`🥊 En "El Último Round" ofrecemos clases emocionantes y atractivas. Van más allá de simples ejercicios; son oportunidades para construir relaciones y amistades
`, '¿Te gustaría inscribirte a una clase de prueba?'])
  .addAnswer('Escribe RESERVAR', {capture: true}, (ctx, ctxFn) => {
        if(ctx.body === 'RESERVAR' || ctx.body === 'RESERVA' || ctx.body === 'reservar' || ctx.body === 'reserva') {
            console.log('mandar a reservar')
            ctxFn.gotoFlow(flujoReserva)
        }else if(ctx.body === 'CANCELAR' || ctx.body === 'cancelar' || ctx.body === 'RESERVA') {
            return ctxFn.endFlow()
        }else {
            ctxFn.fallBack('Intentalo de nuevo o escribe CANCELAR')
        }
  });

const ubicacion = addKeyword(EVENTS.ACTION)
.addAnswer(`Nos puedes encontrar en Av. Revolución 80, Escandón I Secc, Miguel Hidalgo, 11800 Ciudad de México, CDMX: 
📍 https://maps.app.goo.gl/gUsNTVGiAAbCWR757`)
.addAnswer(`En los siguientes horarios: 
Lunes	7 AM–12 PM, 2–9 PM
Martes	7 AM–12 PM, 2–9 PM
Miércoles	7 AM–12 PM, 2–9 PM
Jueves	7 AM–12 PM, 2–9 PM
Viernes	7 AM–12 PM, 2–9 PM
Sábado	8 AM–1 PM`, null, async(ctx, { gotoFlow, provider}) => {
  await delay(500)
    await provider.sendLocation(`${ctx.from}@s.whatsapp.net`,19.404711 ,-99.184473)
    await delay(2000)
    await gotoFlow(flujoInformacion)
})

const planes = addKeyword(EVENTS.ACTION)
.addAnswer(`Manejamos una gran variedad de planes para ti
*1.* Anual
*2.* Semestral
*3.* Trimestral
*4.* Mensual
*5.* Por Día`)
.addAnswer(`¿Cuál de esos te interesaría? Escribe el número para continuar` , {capture: true, idle: 20000}, async(ctx, ctxFn) => {
if(ctx?.idleFallBack) return ctxFn.gotoFlow(flujoCancelar)
  let counter = 0
  
  if(ctx.body !== '1' && ctx.body !== '2' && ctx.body !== '3' && ctx.body !== '4' && ctx.body !== '5' ){
     if (ctx.body === 'MENU' || ctx.body === 'menu' || ctx.body === 'Menu' || ctx.body === 'Menú'){
      return ctxFn.gotoFlow(flujoInformacion)
    } else {

    await ctxFn.flowDynamic([
      {
        body: `Escribe uno de los números de las opciónes`,
      },
    ])
  }

  } else {
  for (const plan of plans) {
    if(plan.planIndex === ctx.body){
    await delay(500)
    await ctxFn.flowDynamic([
      {
        body: `*${plan.planType} - ${plan.planName}*
  
- Costo: *$${plan.cost}.00 MXN*
  
- Detalles: ${plan.description}
        `,
      },
    ])
  }
    counter = counter + 1;
  
  }
  await ctxFn.flowDynamic([
    {
      body: `Escríbe el número de la opción a elegir`,
    },
    {
      body: `Si quieres regresar al menú, escríbe *MENU*`
    }
  ])
  }

})

const flujoInformacion = addKeyword(EVENTS.ACTION)
  .addAnswer(`Elige una opción para continuar`)
  .addAnswer(`*1*📍 ¿Dónde nos encontramos?
*2* 💼 Planes y Precios 
*3* 🥊 Clase de Prueba
  
¡Estoy para ayudarte!`, {capture: true, idle: 20000}, async (ctx, ctxFn) => {
  if(ctx?.idleFallBack) {
  return ctxFn.gotoFlow(flujoCancelar)
  }
  else {
    ctxFn.state.update({ botOn: 'true' })

  if(ctx.body === 'CLASES' || ctx.body === 'Clases' || ctx.body === 'clases' || ctx.body === '3') {
        console.log('clases')
        return ctxFn.gotoFlow(horarios)
    } else if(ctx.body === 'ubicación' || ctx.body === 'ubicacion' || ctx.body === 'Ubicación' || ctx.body === '1' || ctx.body === 'Ubicacion' || ctx.body === 'Ubicación') {
        console.log('ubicacion')
        return ctxFn.gotoFlow(ubicacion)
    }else if(ctx.body === 'planes' || ctx.body === 'plan' || ctx.body === 'Planes' || ctx.body === '2' || ctx.body === 'Plan' || ctx.body === 'precio' || ctx.body === 'precios' || ctx.body === 'Precio' || ctx.body === 'Precios' ) {
        console.log('planes y precios')
        return ctxFn.gotoFlow(planes)
    } else {
      return ctxFn.fallBack('Para continuar, escríbe  el número de la opción a elegir')
    }
  }
  }, [horarios, ubicacion, planes])
  
module.exports = flujoInformacion;
