export default function handler(req, res) {
  const method = req.method;
  const info = req.body;
  if(method === "POST"){
    res.status(200).json({user:info.user, password:info.password, email:info.email, message: "post request"})
  }
  else{
    res.status(200).json({message: "other request"})
  }
}
