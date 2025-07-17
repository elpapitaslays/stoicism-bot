const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { tenorAPIKey } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("abrazo")
    .setDescription("Abraza a alguien!")
    .addUserOption(option =>
        option
        .setName("usuario")
        .setDescription("Usuario que quieres abrazar")
        .setRequired(true)
    ),

    async execute(interaction){
        const { options } = interaction;
        const huggedUser = options.getUser("usuario");

        const embed = new EmbedBuilder()
        .setTitle("Abrazo")
        .setDescription(`${interaction.user} ha abrazado a ${huggedUser}`)

        await interaction.reply({embeds: [embed]});
    }

}