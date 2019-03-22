const express = require('express');
const bodyParser = require('body-parser');
const Discord = require('discord.js');
const client = new Discord.Client()

const bot = require('./bot');


const config = require('../config.json')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requestsed-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next()
});

app.get("/api/jewcrew", (req, res, next) => {
  bot.lots_of_messages_getter().then(msg => {
    userList = [];
    for (i = 0; i < msg.length; i++) {
      userList.push(msg[i].author.username)

    }
    res.json(userList)
  })

})

client.login(config.token)
module.exports = app;

