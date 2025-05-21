import Sidebar from '../components/Dashboard/Sidebar'
import Main from '../components/Dashboard/Main'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'

export default function Dashboard() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (!localStorage.getItem('lsUser')) {
            navigate('/register')
        }
    }, [])

    
    useEffect(() => {
        async function fetchUserData() {
            const lsUser = localStorage.getItem('lsUser');
            const response = await axios.post("http://localhost:3000/fetchUserData", { lsUser });
            setUserData(response.data);
        }

        fetchUserData();
    }, []);
    
    
    return (
        <div className="flex bg-slate-950 min-h-screen text-slate-200" id="dashboard">
            <Sidebar colorPalettes={userData.colorPalettes} />
            <Main username={userData.username} />
        </div>
    )
}