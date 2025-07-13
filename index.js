const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

//console log to verify if bot is enabled
client.once(Events.ClientReady, readyClient =>{
    console.log(`Bot: ${readyClient.user.tag} ready!`);
});

//login
client.login(token);