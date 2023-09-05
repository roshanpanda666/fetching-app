// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'

 export default function handler(req, res) {
if(req.method === 'POST'){
  const email=req.body.email
  const feedbacktext =req.body.text
  
  const newFeedback={
    id:new Date().toISOString(),
    email:email,
    text:feedbacktext
  }
  const filepath = path.join(process.cwd(),'data','feedback.json')
  const filedata=fs.readFileSync(filepath)
  const data =  JSON.parse(filedata)

  data.push(newFeedback)
  fs.writeFileSync(filepath,  JSON.stringify(data))
  res.status(201).json({ massage: 'success',feedback:newFeedback })
}
else{
  res.status(200).json({ name: 'roshan panda' })
}
 }
