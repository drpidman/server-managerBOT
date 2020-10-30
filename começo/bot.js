const Discord = require('discord.js')
//Busca o modulo discord.js, caso nao exista ela retorna uma mensagem de erro no console.
const client = new Discord.Client()
// aqui criamos um novo cliente puxando a constante Discord criada a cima.
const config = require('./config.json')
//aqui buscamos o arquivo json config que contem algumas configurações, como o token do bot e o prefixo.

//bom, como esse é apenas um começo vamos fazer um code basico.

client.on('ready', () => {
  console.log('Estou online, ebaa')
  //aqui definimos um evento do estado do bot 'ready', este evento ocorre quando ele loga corretamente no client que é o seu bot
});

//agora vamos criar o nosso primeiro comando, vamos criar um evento, chamado message, que é nada menos que um evento de mensagem quando o bot detecta uma mensagem.
client.on('message', message => {
  if (message.author.bot) return; // aqui verificamos se o autor da mensagem não é o propio bot, isso serve tambem para o bot nao ficar respondendo o proprio comando.
  if (message.content === 'ping') {
  //aqui em cima definimos os conteudo da mensagem em que 'ativara' o bot, ele respondera a apenas o conteudo fornecido dentro do if
  message.reply(`pong, latencia do bot ${Date.now () - message.createdTimestamp}ms, latencia da api ${Math.round(client.ws.ping)}ms`)
  /* bom, aqui basicamente definimos a mensagem em que o bot respondera, em 'message.createdTimestamp' ele calcula o tempo em que a mensagem demorou para ser enviada.
 e logo a frente retorna a latencia da API, chamamos de 'rodada de matematica'
  */
  
}
})

client.login(config.token) //ele puxara a constante 'config' definida lá em cima e o token do bot existente dentro do seu 'config.json'. 
