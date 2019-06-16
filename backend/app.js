const express = require('express');
const bodyParser = require('body-parser');
const Discord = require('discord.js');
const client = new Discord.Client()
const cors = require('cors')

const bot = require('./bot');


const config = require('../config.json')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requestsed-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next()
// });

app.get("/api/users", cors(), (req, res, next) => {
  bot.lots_of_messages_getter().then(msg => {
    userList = [];
    for (i = 0; i < msg.length; i++) {
      userList.push(msg[i].author.username)
    }
      // Parsing the data down to the info we need because our bot gets EVERYTHING. Check links for more details
      // (one is for getting the unique users and one is for getting the count)
      const counts = {}; // https://stackoverflow.com/questions/15052702/count-unique-elements-in-array-without-sorting
      for (var i = 0; i < userList.length; i++) {
        counts[userList[i]] = 1 + (counts[userList[i]] || 0);
      }

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      // usage example:   https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      let a = userList;
      let unique = a.filter(onlyUnique);
      let result = Object.values(counts);
      var posts = []

    // SOLUTION FOUND HERE https://stackoverflow.com/questions/42448966/combine-the-values-of-two-arrays-into-object
    // Basically it takes two seperate arrays and combines them into an object with key:value pairs
    unique.forEach((v, i) => {
      var obj = {};
      obj.users = v;
      obj.count = result[i];
      posts.push(obj)
     })

    // for (i = 0; i < unique.length; i++) {
    //   posts = [
    //     {
    //       users: unique[i++],
    //       count: result[i++]
    //     }
    //   ]
    // }
    res.json({
      posts: posts
    })
  })

})

client.login(config.token)
module.exports = app;

