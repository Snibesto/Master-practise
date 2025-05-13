    import React from 'react';
    import Input from '../components/Input'

    export default function Login() {

        const [usernameStatus, setUsernameStatus] = React.useState("neutral")
        const [passwordStatus, setPasswordStatus] = React.useState("neutral")
        const [emailStatus, setEmailStatus] = React.useState("neutral")

        const [usernameMsg, setusernameMsg] = React.useState("")
        const [passwordMsg, setPasswordMsg] = React.useState("")
        const [emailMsg, setEmailMsg] = React.useState("")

        function handleSubmit(event) {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)

            const name = formData.get("name")
            const email = formData.get("email")
            const password = formData.get("password")

            console.log(name, email, password);
            

            if(name.length == 1) {
                setUsernameStatus("invalid")
                setUsernameMsg("use")
            }
        }

        return (
            <div className="flex justify-center items-center bg-slate-200 h-screen text-slate-800 bg-[url(../assets/backgrounds/login-bg.svg)] bg-no-repeat bg-cover">
                <form onSubmit={handleSubmit} className="w-1/6 text-center mb-44">
                    <h1 className="text-3xl mb-5">Prisijungti</h1>
                    <div>
                        < Input status={usernameStatus} type="text" label="Slapyvardis" name="name" errorMsg={usernameMsg} />
                        < Input status={passwordStatus} type="text" label="E-paštas" name="email" errorMsg={emailMsg} />
                        < Input status={emailStatus} type="password" label="Slaptikas" name="password" errorMsg={passwordMsg} />
                    </div>
                    <button className="bg-gradient-to-br from-indigo-600 to-indigo-800 w-full my-2.5 p-2 rounded-lg text-white text-2xl cursor-pointer hover:rounded-2xl transition-all shadow-2xl shadow-indigo-400">Prisijungti</button>
                    <a className="text-md underline text-indigo-800 cursor-pointer mt-5">Neturi paskyros?</a>
                </form>
            </div>
        )
    }   