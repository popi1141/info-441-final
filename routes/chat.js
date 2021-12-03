import express from 'express';
import path from 'path';
// import enableWS from 'express-ws'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createRouter(io, sharedsesh) {
  var router = express.Router();
  const _chat = io.of("/chat")
  _chat.use((socket, next) => {
    sharedsesh(socket.request, {}, next)
  })
  /* GET home page. */
  router.get('/', function(req, res, next) {
      // check that they're a valid player in the game...
      // use auth tokens for this
      //console.log(req.query)
      res.sendFile(path.join(__dirname,'/../public/chat.html'));
  });

  _chat.on("connection", (socket) => {
    // to everyone update userlist
    socket.emit("joined room")
    // chat messages
    socket.on("chat message", (msg) => {
      socket.broadcast.emit("this is a mf test lol")
    })
    // in the room actively
    socket.on("disconnect", () => {
      // resend the user list
    })
  })
    return router
}

export default createRouter;
