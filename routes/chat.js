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
    // join chatroom
    socket.join("chat")
    // to everyone update userlist
    // socket.to("chat").emit("xd", "joined!")`
    // chat messages
    socket.on("chat message", (msg) => {
      console.log(msg)
      socket.to('chat').emit("cr", msg, socket.request.session.id)
      console.log("done")
    })
    // in the room actively
    socket.on("disconnect", () => {
      // resend the user list
      console.log("bye")
    })
  })
    return router
}

export default createRouter;
