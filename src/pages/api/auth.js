export default function handler(req, res) {
  const method = req.method;
  const info = req.body;
  if(method === "POST"){
    res.status(200).json({user:info.user, password:info.password, message: "post request"})
  }
  else{
    res.status(200).json({message: "other request"})
  }
}
