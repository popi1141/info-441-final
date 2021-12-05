import { enable } from 'debug';
import express from 'express';

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.testVar = "ThisRocks";
  let PORT = process.env.PORT
  res.render('index', { title: 'Express', testVar : "ThisRocks" });
});

router.get('/portNUM', function(req, res, next) {
  res.type('json')
  console.log("port")
  console.log(req.app.get('port'))
  res.send(JSON.stringify({port: req.app.get('port')}));
});

router.get('/playingAs', function(req, res, next) {
  if(req.query.user)
    req.session.user = req.query.user
  res.type('json')
  res.redirect("/");
});

router.get('/getRanked', function(req, res, next) {
  res.type('json')
  res.send(JSON.stringify({user: req.session.user}));
});


export default router;
