// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getUserInfo } from "util/db";

export default async function handler(req, res) {
  try {
    const response = await getUserInfo(req.query.uid)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=0');
    res.json({ name: response.name, number: response.clownsona})
  }
  catch(error) {
    res.json(error);
    res.status(405).end();
  }
}
