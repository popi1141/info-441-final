import express from 'express';
import path from 'path';
import enableWS from 'express-ws'

var router = express.Router();
enableWS(router)

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import Queue from '../queue.js'

/* GET home page. */
router.get('/', function(req, res, next) {
    // check that they're a valid player in the game...
    // use auth tokens for this
    console.log(req.query)
    res.sendFile(path.join(__dirname,'/../public/ingame.html'));
});

// gamesize
const GAME_SIZE = 2
// // the queue itself
let queue = new Queue(GAME_SIZE)
// game id to direct ppl
let gameid = 0
// active games
let games = new Map()
// websocket stuff
router.ws("/queue", (ws, req) => {
  // add someone to the queue
  let userData = {
    "socket": ws,
    "session_id": req.cookies["connect.sid"]
  };
  queue.enqueue(userData)

  // if two or more people are connected, pop them from the dict and send them to a game
  if (queue.length >= GAME_SIZE) {
    // obj to redirect to game page
    let j = {
      type: "redirect",
      url: "/gaming",
      gameid: gameid
    }
    // get the array of players from the queue
    let players = queue.popQueue()
    let gameData = []
    players.forEach(item => {
      // users are not connected to the game
      gameData.push({
        "user": userData.session_id,
        "connected": false
      })
      // send the user the redirect info
      item.socket.send(JSON.stringify(j))
    })
    // store game data and increment game id
    games.set(gameid.toString(), {
      "players": gameData,
      "sockets": [],
      "score": 0,
      "minus": null,
      "plus": null
    })
    gameid++
  }
  // remove from queue
  ws.on("close", function close() {
    queue.dequeue(userData)
  })
})

router.ws('/ingame', (ws, req) => {
    let gameid = req.query['gameId']
    let gamedata = games.get(gameid)
    let allowed_users = gamedata.players
    let user = req.cookies["connect.sid"]
    console.log(req)
    ws.send(JSON.stringify({"here": "a"}))
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
        gamedata.minus = user
        msg.msg = "You are Minus"
      } else {
        // this is to debug lol
        gamedata.plus = user
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
})
  
export default router;
