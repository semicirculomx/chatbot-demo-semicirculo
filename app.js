require("dotenv").config();
const { createBot, createProvider, createFlow, } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const JsonFileAdapter = require('@bot-whatsapp/database/json');

/**
 * ChatGPT
 */
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

/**
 * Flows
 */
const flowPrincipal = require("./flows/flowPrincipal");
const flowAgente = require("./flows/flowAgente");
const { flowReparacion } = require("./flows/flowReparacion");
const { flowOfertas } = require("./flows/flowOfertas");
const flowActivarDemoGym = require("./flows/flowActivarDemoGym");
const flowDistribuidor = require("./flows/flowDistribuidor");
const flujoBienvenida = require("./flows/flowBienvenida_gym");
const flujoPedirDatos = require("./flows/pedirDatos_gym");
const flujoInformacion = require("./flows/flowInfo_gym");
const flujoReserva = require("./flows/flowReservas_gym");
const flujoCancelar = require("./flows/flujoCancelar");

/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new JsonFileAdapter();



  const adapterFlow = createFlow([
    flowPrincipal,
    flowAgente,
    flowReparacion(chatGPT),
    flowOfertas(chatGPT),
    flowActivarDemoGym,
    flowDistribuidor,
    flujoBienvenida,
    flujoPedirDatos,
    flujoInformacion,
    flujoReserva,
    flujoCancelar
  ]);
  
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();