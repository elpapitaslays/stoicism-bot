const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Usa esto para testear el bot"),
    
    async execute(interaction){
        await interaction.reply(`¡Hola ${interaction.user.username}, estoy funcionando! ¡Gracias por usarme!`);
    }
}