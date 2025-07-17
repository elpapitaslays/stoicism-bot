const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("usa esto para testear el bot"),
    
    async execute(interaction){
        await interaction.reply("xd");
    }
}