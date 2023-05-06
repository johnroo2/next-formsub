import React from "react";
import Link from "next/link";
import Head from "next/head";

import { useTranslation } from 'react-i18next';

export default function Home() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");

  const [passwordOpen, setPasswordOpen] = React.useState(false);
  const [loginType, setLoginType] = React.useState("account");

  const [accountButtonAnimate, setAccountButtonAnimate] = React.useState(false);
  const [phoneButtonAnimate, setPhoneButtonAnimate] = React.useState(false);

  const { t, i18n } = useTranslation();

  const lngs = [
    { code: "en", native: "English" },
    { code: "zh", native: "中文" },
    { code: "fr", native: "Français"}
  ];

  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

  const sendCreds = () => {
      fetch("http://localhost:3000/api/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user:username, password:password})
      }).then(
        response => response.json()
      ).then(data => {
          console.log(data);
        }
      )
  }

  const codesend = 111006;

  return(
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="h-screen circbg">
          <div className="blurbg"/>
            
          <div className="mt-[0.5em] language-selector p-[2em]">
            <div className="flex flex-col items-end">
              <div className="language-button">
                <button className="w-[1.5em] h-[1.5em] outline-none">
                  <img src="globeicon.png"/>
                </button>
              </div>
              <div className="language-options flex flex-col w-[9em] rounded-sm">
                {lngs.map((lng, i) => {
                  const { code, native } = lng;
                  return (
                    <>
                      {code === i18n.language && 
                        <button
                          onClick={() => {
                            handleTrans(code);
                          }}
                          className="text-[0.9em] rounded-sm language-options-text text-left pl-[0.25em] 
                            border-[1px] bg-aquabluetrans border-lagoonbluetrans outline-none py-[0.1em]">
                          <div className="flex flex-row hover:font-bold">
                            <div className="flex-[2]">{code.toUpperCase()}</div>
                            <div className="flex-[3]">{native}</div>
                          </div>
                        </button>
                      }
                      {code !== i18n.language && 
                        <button
                          onClick={() => {
                            handleTrans(code);
                          }}
                          className="text-[0.9em] rounded-sm language-options-text text-left pl-[0.25em] 
                            border-none bg-whitetrans outline-none py-[0.1em]">
                          <div className="flex flex-row hover:font-bold">
                            <div className="flex-[2]">{code.toUpperCase()}</div>
                            <div className="flex-[3]">{native}</div>
                          </div>
                        </button>}
                    </>
                    )
                })}
              </div>
            </div>
          </div>

          <div className="modalcenter w-[450px] rounded-sm">
              <div className="flex flex-col gap-[0.75em] items-center py-[2em]">
                  <div>
                    <p className="title-text"><b>{t('demonstration')}</b></p>
                    <p className="subtitle-text">{t('subtitle')}</p>
                  </div>

                  <div className="flex flex-col items-center mt-[1em]">
                    <div className="flex flex-row gap-[2.5em]">
                      <button className={`subtitle-text outline-none
                      ${loginType === "account" ? "border-b-[2px] py-[0.5em] border-antblue" : ""} 
                      ${accountButtonAnimate ? "login-selector-trans" : ""}`}
                      onClick={() => {
                        if(loginType === "phone"){
                          setAccountButtonAnimate(true);
                        }
                        setLoginType("account");
                      }}
                      onAnimationEnd={() => {
                        setAccountButtonAnimate(false);
                      }}>
                          {t('account_login')}
                      </button>
                      <button className={`subtitle-text outline-none
                      ${loginType === "phone" ? "border-b-[2px] py-[0.5em] border-antblue" : ""} 
                      ${phoneButtonAnimate ? "login-selector-trans" : ""}`}
                      onClick={() => {
                        if(loginType === "account"){
                          setPhoneButtonAnimate(true);
                        }
                        setLoginType("phone");
                      }}
                      onAnimationEnd={() => {
                        setPhoneButtonAnimate(false);
                      }}>
                          {t('phone_login')}
                      </button>
                    </div>
                    <div className="barwidth authtype-underline border-t-[1px] mt-[-1px]"/>
                  </div>

                  {loginType === "account" &&
                    <>
                      <div className="flex flex-col self-center">
                        <label htmlFor="username" className="inputfield-text">
                            {t('username')}
                        </label>
                        <div className="container">
                          <div className="inputfield-below barwidth bg-paleblue rounded-sm"/>
                          <input id="username" value={username} maxLength={30} onChange={(info) => {setUsername(info.target.value)}}
                              className="inputfield barwidth pl-[4%] text-black bg-transparent text-[1em] rounded-sm" placeholder=""/>
                          <div className="inputfield-above bg-palepaleblue rounded-sm"/>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="password" className="inputfield-text">
                          {t('password')}
                        </label>
                        <div className="container">
                          <div className="inputfield-below barwidth bg-paleblue rounded-sm"/>
                          <input id="password" type={passwordOpen ? "text" : "password"} maxLength={30} value={password} onChange={(info) => {setPassword(info.target.value)}}
                              className="inputfield barwidth pl-[4%] text-black bg-transparent text-[1em] rounded-sm" placeholder=""/>
                          <div className="inputfield-above bg-palepaleblue rounded-sm"/>
                        </div>

                        <div className="flex flex-row gap-[0.5em] mt-[0.5em] items-center">
                          <button onClick={() => {setPasswordOpen(!passwordOpen)}}
                            className={`self-left w-[1em] h-[1em] rounded-sm bg-${passwordOpen?"white":"palepaleblue"}
                            text-base leading-[1em] outline-none`}>
                              {passwordOpen ? "✓" : ""}
                          </button>
                          <p className="inputfield-text">{t('show_password')}</p>
                        </div>
                      </div>
                        
                      <Link className="outline-none" href={{pathname:"/auth", query:
                        {user:username, password:password}}}>
                        <button className="antblue-button barwidth rounded-sm outline-none
                          submit-text self-center mt-[1em]" onClick={()=>{}}>{t('submit')}</button>
                      </Link>
                    </>
                  }
                  {loginType === "phone" &&
                    <>
                      <div className="flex flex-col self-center">
                        <label htmlFor="phone-number" className="inputfield-text">
                            {t('phone_number')}
                        </label>
                        <div className="container">
                          <div className="inputfield-below barwidth bg-paleblue rounded-sm"/>
                          <input id="phone-number" value={phone} maxLength={30} onChange={(info) => {setPhone(info.target.value)}}
                              className="inputfield barwidth pl-[4%] text-black bg-transparent text-[1em] rounded-sm" placeholder=""/>
                          <div className="inputfield-above bg-palepaleblue rounded-sm"/>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="verification-code" className="inputfield-text">
                          {t('verification_code')}
                        </label>
                        <div className="container barwidth">
                          <div className="inputfield-below w-[200px] bg-paleblue rounded-sm"/>
                          <input id="verification-code" maxLength={6} value={verificationCode} onChange={(info) => {
                            let output = "";
                            for(let i = 0; i < info.target.value.length; i++){
                              if(/^[0-9]*$/.test(info.target.value.charAt(i))){
                                output += info.target.value.charAt(i);
                              }
                            }
                            setVerificationCode(output)
                            
                          }}
                              className="inputfield pl-[4%] text-black bg-transparent text-[1em] rounded-sm" placeholder=""/>
                          <div className="inputfield-small-above bg-palepaleblue rounded-sm"/>
                          <button className="ml-[10px] w-[90px] rounded-sm inputfield-text getcode-button"
                          onClick={() => {
                            setTimeout(() => {alert(`Your code is: ${codesend}`)}, 1000)
                          }}>
                            Get Code</button>
                        </div>
                      </div>

                      <Link className="outline-none" href={{pathname:"/auth", query:
                        {user:phone, password:verificationCode}}}>
                        <button className="antblue-button barwidth rounded-sm outline-none
                          submit-text self-center mt-[1em]" onClick={()=>{}}>{t('submit')}</button>
                      </Link>
                    </>
                  }
              </div>
          </div>
      </div>
    </>
  )
}
