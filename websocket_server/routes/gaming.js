import express from 'express';
import path from 'path';
import enableWS from 'express-ws'

var router = express.Router();
enableWS(router)

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* GET home page. */
router.get('/', function(req, res, next) {
    // check that they're a valid player in the game...
    // use auth tokens for this
    console.log(req.query)
    res.sendFile(path.join(__dirname,'/../public/ingame.html'));
});

// the queue itself
let queue = {}
// logs ids of people who are in queue
let queuePlaceholders = []
// game id to direct ppl
let gameid = 0
// track the number of people/id of people in queue
let queuePosition = 0
// active games
let games = {}
// MAJOR TODO: need to make it so that when someone leaves or disconnects
// while in queue, it removes them from the queue and from the placeholders.
// I may need to implement my own data structure to deal with that, but that is an after thanksgiving issue
// websocket stuff
router.ws("/queue", (ws, req) => {
  // add someone to the queue and increment the number of the queue position
  queue[queuePosition] = ({
    "socket": ws,
    "session_id": req.cookies["connect.sid"]
  });
  let myPosition = queuePosition
  queuePlaceholders.push(queuePosition)
  ++queuePosition

  // if two or more people are connected, pop them from the dict and send them to a game
  console.log(Object.keys(queue).length)
  if (Object.keys(queue).length >= 2) {
    let players = {}
    for (let i = 0; i < 2; i++) {
      // redirect to game page
      let j = {
        type: "redirect",
        url: "/gaming",
        gameid: gameid
      }
      // get the oldest player in queue and retrieve their data
      // then pop them from the queue obj
      let player_pos = queuePlaceholders.shift()
      let player = queue[player_pos]
      delete queue[player_pos]
      // say the user is not connected to the game
      players[player.session_id] = {"connected": false}
      // send the user the redirect with the game id
      player.socket.send(JSON.stringify(j))
    }
    // store game data and increment game id
    games[gameid] = {
      "players": players,
      "sockets": [],
      "score": 0,
      "minus": null
    }
    gameid++
  }
  // remove from queue
  ws.on("close", function close() {
    console.log(myPosition)
  })

  // idk why this is here
  ws.on("message", msg => {
    // console.log(msg)
    queue.forEach(socket => {
      let j = {
        type: "data",
        content: "" + queue.length
      }
      socket.send(JSON.stringify(j))
    })
  })
})

router.ws('/ingame', (ws, req) => {
    // console.log(req.query.gameId)
    let gameid = req.query['gameId']
    let gamedata = games[gameid]
    let allowed_users = gamedata.players
    let user = req.cookies["connect.sid"]

    // kill anyone who is trying to join and not allowed
    // if (allowed_users.has(req.cookies["connect.sid"])) {
    // is a TODO
    if (true) {
      // update the websocket
      gamedata.sockets.push(ws)
      let msg = {
        type: "player",
        msg: "",
      }
      if (gamedata.minus == null) {
        gamedata.minus = req.cookies["connect.sid"]
        msg.msg = "You are Minus"
      } else {
        msg.msg = "You are Plus"
      }
      ws.send(JSON.stringify(msg))
    } else {
      // kick from game
      let response = {
        type: "error",
        msg: "you are not a player in this game!"
      }
      ws.send(JSON.stringify(response))
    }

    ws.on("message", (ws, req) => {
      if(gamedata.sockets.length == 2 && (gamedata.score < 20 && gamedata.score > -20)) {
        // todo: needs to implement whatever auth we are using 
        // to do this better
        if(gamedata.minus == user) {
          gamedata.score = gamedata.score - 1
        } else {
          gamedata.score = gamedata.score + 1
        }
        let msg = {
          type: "play",
          value: gamedata.score
        }
        gamedata.sockets.forEach(socket => {
          socket.send(JSON.stringify(msg))
        });

      } else {
        let msg = {
          type: "gameover",
          winner: gamedata.score > 0 ? "Plus Wins" : "Minus Wins"
        }
        gamedata.sockets.forEach(socket => {
          socket.send(JSON.stringify(msg))
        });
      }
    })


    // wait for on connect, see if they are both connected
    
    // wait for two "ready's"
    // send 3, 2, 1, go
    // accepting messages that increase or decrease. 
    })

export default router;
