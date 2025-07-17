const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Comando para testear el bot"),
    async execute(interaction){
        await interaction.reply("Funciona");
    }
};