import React from "react"

export default function Home() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const sendCreds = () => {
    fetch("http://localhost:3000/api/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user:username, password:password})
    }).then(
      response => response.json()
    ).then(data =>
      console.log(data)
    )
  }

  const toggleReveal = () => {
    let pw = document.getElementById("password");
    if (pw.type === "password") {
      pw.type = "text";
    } else {
      pw.type = "password";
    }
  }

  return (
    <div className="h-screen flowers">
      <div className="blurbg"/>

      <div className="modalcenter w-[35%] bg-white/[0.8] rounded-lg">
          <div className="flex flex-col gap-[10px] items-center py-[10%]">
            <p className="text-black text-[1.8em]">Form Submission</p>

            <div className="flex flex-col">
              <label htmlFor="username" className="text-[1em] text-black">
                Username
              </label>
              <input id="username" value={username} maxLength={20} onChange={(info) => {setUsername(info.target.value)}}
                className="inputfield pl-[4%] text-black"/>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-[1em] text-black">
                Password
              </label>
              <input id="password" type="password" maxLength={20} value={password} onChange={(info) => {setPassword(info.target.value)}}
                className="inputfield pl-[4%] text-black"/>
              <div className="flex flex-row gap-[10px] mt-[2px] items-center">
                <input type="checkbox" className="self-left" onClick={toggleReveal}/>
                Show Password
              </div>
            </div>

            <button className="mt-[20px] wine-to-coral rounded-lg
              text-white" onClick={sendCreds}>Submit</button>
          </div>
      </div>
    </div>
  )
}
