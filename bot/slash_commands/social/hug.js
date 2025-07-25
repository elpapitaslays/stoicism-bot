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
        async function getImage(){
            const query = "hug";
            
            const res = await fetch(`https://tenor.googleapis.com/v2/search?q=${query}&key=${tenorAPIKey}&limit=100`);
            
            if (!res.ok) {
                throw new Error("No pudimos obtener la imagen, ¡avisa al staff!");
            }

            const data = await res.json();

            const randomNumber = Math.floor(Math.random() * data.results.length);

            const gifUrl = data.results[randomNumber].media_formats.gif.url;

            return gifUrl;
        };

        const { options } = interaction;
        const huggedUser = options.getUser("usuario");
        const image = await getImage();

        // el embed tampoco
        const embed = new EmbedBuilder()
        .setTitle("ABRAZO")
        .setDescription(`### ${interaction.user} ha abrazado a ${huggedUser}`)
        .setColor("Red")
        .setFooter({text: "Powered by Tenor"})
        .setTimestamp()
        .setImage(image);

        // si quieren cambiar el if cambienlo pero q funcione
        if(interaction.user == huggedUser){
            await interaction.reply({content: "No te puedes abrazar a ti mismo!", ephemeral: true});
        } else{
            await interaction.reply({embeds: [embed]});
        }
    }

};