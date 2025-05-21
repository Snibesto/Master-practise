import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input'

export default function Register() {
    const navigate = useNavigate()
    
    console.log(localStorage.getItem('lsUsername'));
    
    const [usernameStatus, setUsernameStatus] = React.useState("neutral")
    const [passwordStatus, setPasswordStatus] = React.useState("neutral")

    const [usernameMsg, setUsernameMsg] = React.useState("")
    const [passwordMsg, setPasswordMsg] = React.useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        let valid = true

        setUsernameStatus("neutral")
        setPasswordStatus("neutral")

        const formData = new FormData(event.currentTarget)

        const username = formData.get("name")
        const password = formData.get("password")
        

        if(username.length < 5 || username.length > 20) {
            setUsernameStatus("invalid")
            setUsernameMsg("name length has to be 5-20 characters long")
            valid = false
        }

        if(valid) {
            const res = await axios.post("http://localhost:3000/registerUser", { username, password });
            if(!res.data.ok) {
                if(res.data.status == 1) {
                    setUsernameStatus("invalid")
                    setUsernameMsg("User already exists!")
                }
            }
            else {
                localStorage.setItem('lsUser', username);
                navigate('/dashboard')
            }
        }
    }

    return (
        <div className="flex justify-center items-center bg-slate-200 h-screen text-slate-800 bg-[url(../assets/backgrounds/login-bg.svg)] bg-no-repeat bg-cover">
            <form onSubmit={handleSubmit} className="w-1/6 text-center mb-44">
                <h1 className="text-3xl mb-5">Sukurti paskyrą</h1>
                <div>
                    < Input status={usernameStatus} type="text" label="Slapyvardis" name="name" errorMsg={usernameMsg} />
                    < Input status={passwordStatus} type="password" label="Slaptažodis" name="password" errorMsg={passwordMsg} />
                </div>
                <button className="bg-gradient-to-br from-indigo-600 to-indigo-800 w-full my-2.5 p-2 rounded-lg text-white text-2xl cursor-pointer hover:rounded-2xl transition-all shadow-2xl shadow-indigo-400" type="submit">Prisijungti</button>
                <a className="text-md underline text-indigo-800 cursor-pointer mt-10" onClick={() => navigate('/login')}>Jau turiu paskyrą</a>
            </form>
        </div>
    )
}   