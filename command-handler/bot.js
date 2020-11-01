//vamos definir algumas coisas em primeiro lugar, se voce nao entende esta parte, leia a pasta anterior!

const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require('enmap');
const fs = require('fs')
const config = require('./config.json');

//vamos começar a fazer o nosso manipulador, que tal começar por eventos ? 

//Este loop lê a pasta /events/ e anexa cada arquivo de evento ao evento apropriado.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
// Se o arquivo não for um arquivo JS, ele sera ignorado.
    if (!file.endsWith(".js")) return;
    //carregamos o arquivo de eventos
    const event = require(`./events/${file}`); 
    //Obtenha apenas o nome do evento a partir do nome do arquivo
    let eventName = file.split(".")[0];
    // receita supersecreta para chamar eventos com todos os seus argumentos apropriados * após * a var do `client`.
    //sem entrar em muitos detalhes, isso significa que cada evento será chamado com o argumento do cliente,
    //seguido por seus argumentos "normais", como mensagem, membro, etc, etc.
    // Essa linha é incrível, a propósito. Apenas dizendo'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

//Agora, vamos manipular a pasta de comandos!
client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
   // Carrega o próprio arquivo de comando
    let props = require(`./commands/${file}`);
   // Pega apenas o nome do comando do nome do arquivo
    let commandName = file.split(".")[0];
    console.log(`carregando comando: ${commandName} carregado`);
    // Aqui, simplesmente armazenamos tudo no comando Enmap. Não estamos executando agora.
    client.commands.set(commandName, props);
  });
});

client.login(config.token)//aqui logamos em nosso bot
