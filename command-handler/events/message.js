module.exports = (client, message) => {
  // igonora mensagens de bots.
  if (message.author.bot) return;

  // Ignora mensagens que não começam com o prefixo do bot
  if (message.content.indexOf(client.config.prefix) !== 0) return;

 // Nossa definição de nome de argumento / comando padrão.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

 // Pegue os dados de comando do client.commands Enmap
  const cmd = client.commands.get(command);

 //e se caso o comando nao exista, o bot ignora a mensagem.
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
