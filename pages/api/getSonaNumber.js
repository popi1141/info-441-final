// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import useAuth from "../../utils/auth";


export default function handler(req, res) {
  let returnName = 'John Doe';
  if(req.query){
    returnName = req.query.user;
  }
  res.status(200).json({ name: returnName, number: 1 })
}
