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

export default router;
