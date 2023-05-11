import { setDoc, doc, getDoc, collection, updateDoc } from "@firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import data from "./../../../apikey.json";
import cors from "cors";
import express from 'express';
import crypto from 'crypto';
import fs from 'fs';

const app_fb = initializeApp(data);
const firestore = getFirestore(app_fb);

const app = express();
app.use(cors());

const algorithm = 'aes-256-cbc';

const keyFile = './key.bin';
const masterKey = 'next-formsub';
let key, iv;

if (fs.existsSync(keyFile)) {
  const data = fs.readFileSync(keyFile);
  key = Uint8Array.prototype.slice.call(data, 0, 32); 
  iv = Uint8Array.prototype.slice.call(data, 32, 48); 
} 
else {
  key = crypto.randomBytes(32);
  iv = crypto.randomBytes(16);
  const data = Buffer.concat([key, iv]);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
  fs.writeFileSync(keyFile, encryptedData);
}

const encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

const decrypt = (text) => {
  text = {iv: iv, encryptedData: text};
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export default function handler(req, res) {
  const method = req.method;
  const info = req.body;
  if(method === "POST"){
    authuser(info).then((auth) => {
      res.status(200).json({code:auth.code, info:auth.info});
    });
  }
  else{
    res.status(200).json({message: ""})
  }
}

const authuser = async(info) => {
  if(info.mode === "account" || info.mode === "phone"){
    const identifier = encrypt(info.mode === "account" ? info.username : info.phone);
    const secondary = encrypt(info.mode === "account" ? info.password : info.verificationCode);
    const ref = doc(firestore, "auth", decrypt(identifier));
    const refSnap = await getDoc(ref);
    if(refSnap.exists()){
      const data = refSnap.data();
      const verifier = info.mode === "account" ? data.password : data.verificationCode;
      if(secondary === verifier){
        Object.keys(data).forEach((key, index) => {data[key] = decrypt(data[key])})
        return {code: 200, info:data};
      }
      return {code: 401, info:null};
    }
    else{
      return {code: 402, info:null};
    }
  }
  else{
    return {code: 500, info:null}
  }
}