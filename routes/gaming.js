import express from 'express';
import path from 'path';
// import enableWS from 'express-ws'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import Queue from '../modules/queue.js'

function createRouter(io, sharedsesh) {
  var router = express.Router();
  const _queue = io.of("/queue")
  _queue.use((socket, next) => {
    sharedsesh(socket.request, {}, next)
  })
  const _ingame = io.of("/ingame")
  _ingame.use((socket, next) => {
    sharedsesh(socket.request, {}, next)
  })
  /* GET home page. */
  router.get('/', function(req, res, next) {
      // check that they're a valid player in the game...
      // use auth tokens for this
      //console.log(req.query)
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

  _queue.on("connection", (socket) => {
    // add someone to the queue
    let userData = {
      "socket": socket,
      // TODO REPLACE THIS WITH USER AUTH
      "session_id": socket.request.session.id
    };
    queue.enqueue(userData)
    // if two or more people are connected, pop them from the dict and send them to a game
    if (queue.length >= GAME_SIZE) {
      // obj to redirect to game page
      // get the array of players from the queue
      let players = queue.popQueue()
      let gameData = []
      players.forEach(item => {
        // users are not connected to the game
        gameData.push({
          // TODO: REPLACE WITH USER AUTH
          "user": item.session_id,
          "connected": false
        })
        // send the user the redirect info
        item.socket.broadcast.emit("redirect", JSON.stringify({
          type: "redirect",
          url: "/gaming",
          // TODO: REPLACE WITH USER AUTH
          userId: item.session_id,
          gameid: gameid
        }))
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
    socket.on('disconnect', () => {
      console.log("a user disconnected")
      queue.dequeue(userData)
      console.log("queue.length: " + queue.length)
    })
  })
  _ingame.on('connection', (socket) => {
    if (games.size == 0){
      return
    }
    let gameid = socket.request._query.gameId
    // TODO: REPLACE THIS WITH USER AUTH
    let user = socket.request._query.uid
    let gamedata = games.get(gameid)
    let allowed_users = gamedata.players
    // kill anyone who is trying to join and not allowed
    // if (allowed_users.has(req.cookies["connect.sid"])) {
    // is a TODO
    if (true) {
      // todo: NO FUCKING CLUE WHY THIS WONT SEND TO EVERYONE???
      socket.broadcast.emit("roles", "go")
      // update the websocket
      gamedata.sockets.push(socket)

      if (gamedata.minus == null) {
        gamedata.minus = user
      }
      console.log(gamedata.minus)
      console.log(socket.request._query.uid)
    } else {
      // kick from game
      let response = {
        type: "error",
        msg: "you are not a player in this game!"
      }
      socket.broadcast.emit("roles", JSON.stringify(response))
    }

    socket.on("move", (msg) => {
      // return if we have no active game for this socket...
      if (!gamedata) {
        return
      }
      if(gamedata.sockets.length == 2 && (gamedata.score < 19 && gamedata.score > -19)) {
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
          socket.broadcast.emit("play", JSON.stringify(msg))
        });

      } else {
        let msg = {
          type: "gameover",
          winner: gamedata.score > 0 ? "Plus Wins" : "Minus Wins"
        }
        gamedata.sockets.forEach(socket => {
          socket.broadcast.emit("gameover", JSON.stringify(msg))
        });
      }
    })
  })
  return router
}

export default createRouter;
