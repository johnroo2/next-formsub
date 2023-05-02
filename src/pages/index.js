import React from "react";
import Link from "next/link";
import Head from "next/head";

import { useTranslation } from 'react-i18next';

export default function Home() {
  const [auth, setAuth] = React.useState(null);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [passwordOpen, setPasswordOpen] = React.useState(false);

  const sendCreds = () => {
      fetch("http://localhost:3000/api/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user:username, password:password, email:email})
      }).then(
        response => response.json()
      ).then(data => {
          console.log(data);
          setAuth(data)
        }
      )
  }

  const { t, i18n } = useTranslation();

  const lngs = [
    { code: "en", native: "English" },
    { code: "cn", native: "中文" },
  ];

  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

  return(
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="h-screen flowers">
          <div className="blurbg"/>
            
          <div className="flex flex-col gap-[5px] p-[1%] language-button">
            {lngs.map((lng, i) => {
              const { code, native } = lng;
              return <button onClick={() => handleTrans(code)}
              className="text-white wine-to-coral no-reverse rounded-lg">{native}</button>;
            })}
          </div>

          <div className="modalcenter w-[450px] bg-white/[0.8] rounded-lg">
              <div className="flex flex-col gap-[18px] items-center py-[10%]">
                  <p className="text-black text-[1.8em]"><b>{t('form_submission')}</b></p>

                  <div className="flex flex-col self-center">
                    <label htmlFor="username" className="text-[1em] text-black">
                        <b>{t('username')}</b>
                    </label>
                    <div className="container">
                      <div className="inputfield-below bg-white"/>
                      <input id="username" value={username} maxLength={30} onChange={(info) => {setUsername(info.target.value)}}
                          className="inputfield pl-[4%] text-black bg-transparent text-[1em]" placeholder=""/>
                      <div className="inputfield-above bg-white no-reverse"/>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[1em] text-black">
                        <b>{t('email')}</b>
                    </label>
                    <div className="container">
                      <div className="inputfield-below bg-white"/>
                      <input id="email" type="email" value={email} maxLength={30} onChange={(info) => {setEmail(info.target.value)}}
                          className="inputfield pl-[4%] text-black bg-transparent text-[1em]" placeholder=""/>
                      <div className="inputfield-above bg-white no-reverse"/>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="password" className="text-[1em] text-black">
                      <b>{t('password')}</b>
                    </label>
                    <div className="container">
                      <div className="inputfield-below bg-white"/>
                      <input id="password" type={passwordOpen ? "text" : "password"} maxLength={30} value={password} onChange={(info) => {setPassword(info.target.value)}}
                          className="inputfield pl-[4%] text-black bg-transparent text-[1em]" placeholder=""/>
                      <div className="inputfield-above bg-white no-reverse"/>
                    </div>

                    <div className="flex flex-row gap-[5px] mt-[5px] items-center">
                      <button onClick={() => {setPasswordOpen(!passwordOpen)}}
                        className="self-left w-[1em] h-[1em] rounded-sm bg-white text-base leading-[1em]">
                        <b>{passwordOpen ? "✓" : ""}</b>
                      </button>
                      {t('show_password')}
                    </div>
                  </div>
                    
                  <Link href={{pathname:"/auth", query:
                    {user:username, password:password, email:email}}}>
                    <button className="mt-[20px] wine-to-coral rounded-lg
                  text-white self-center no-reverse" onClick={sendCreds}>{t('submit')}</button>
                  </Link>
              </div>
          </div>
      </div>
    </>
  )
}
