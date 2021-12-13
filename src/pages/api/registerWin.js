// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getUserInfo, updateUser } from "util/db";

export default async function handler(req, res) {
  try {
    const response = await getUserInfo(req.query.uid)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=0');
    let update =  { ...response };
    if(update.tokens){
      update.tokens = update.tokens + 10;
    }
    else{
      update.tokens = 10;
    }
    updateUser(req.query.uid, update);
    res.json(response)
  }
  catch(error) {
    res.json(error);
    res.status(405).end();
  }
}
