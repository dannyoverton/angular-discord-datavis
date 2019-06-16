const Discord = require('discord.js');
const client = new Discord.Client()

const config = require('../config.json')


client.on('ready', () => {
  console.log("Bot connected sucessfully")
      // Loop from my stackoverflow question that iterates through multiple arrays using an element from previous array
      module.exports.lots_of_messages_getter = async function lots_of_messages_getter(limit = 500) {                              // Create async function
        sum_messages = [];                                                              // Create sum_messages as empty array
        let last_id;                                                                    // Create var to hold id of last message of array
        var generalChannel = client.channels.get("546476817213685762")

        while (true) {                                                                  // Start loop, with True boolean loop will continue until we add a break
            const options = {                                                           // Creating an options object
                limit: 100
            };                                                                          // End object creation
            if (last_id) {                                                              // Create first condition
                options.before = last_id;                                               // Here we say if last_id exists, append its value to options object
            }

            const messages = await generalChannel.fetchMessages(options);      // Set up fetching the messages, pass it the options object which holds our arguments
            sum_messages.push(...messages.array());                                     // Here we use a "Spread Operator" for an array literal and push the messages array to sum_messages
            last_id = messages.last().id;                                               // Thanks to hoisting (I think) we can assign last_id here and use it in the previous if statement

            if (messages.size != 100 || sum_messages >= limit) {                        // This is our break function stating if our original array is less that 100 it will exit to prevent errors
                break;                                                                  // and if sum_messages reaches our limit it will end, otherwise it will loop until it reaches an end and break
            }
        }



        return sum_messages;                                                            // Here we return sum_messages, allowing us to use the data in other functions
    }

})







client.login(config.token)
