const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token, clientId, guildId } = require("./config.json");
const fs = require("node:fs");
const path = require("path");
const { REST, Routes } = require("discord.js");
const foldersPath = path.join(__dirname, "slash_commands");
const commandFolder = fs.readdirSync(foldersPath).filter(file => fs.statSync(path.join(foldersPath, file)).isDirectory());

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const commands = [];

client.commands = new Collection();

for (const folder of commandFolder){
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for(const file of commandFiles){
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if('data' in command && 'execute' in command){
			client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
		} else{
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
    try{
		console.log(`Registrando ${commands.length} slashcommands (/).`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Cargados exitosamente ${data.length} slashcommands (/).`);
    } catch(error){
        console.error(error);
    }
})();

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        console.error(`El comando ${interaction.commandName} no fue encontrado`);
        return;
    }

    try{
        await command.execute(interaction);
    } catch (error){
        console.error(error);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({ content: "Error ejecutando el comando, ¡avísale al staff!", ephemeral: true });
        } else{
            await interaction.reply({ content: "Error ejecutando el comando, ¡avísale al staff!", ephemeral: true });
        }
    }
});

client.once(Events.ClientReady, readyClient =>{
    console.log(`Bot: ${readyClient.user.tag} listo!`);
});

client.login(token);