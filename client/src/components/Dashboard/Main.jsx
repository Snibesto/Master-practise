import CardPalette from "./CardPalette"
import settingsIcon from '../../assets/icons/settings-icon.svg'
import { useState, useEffect } from 'react'
import PaletteCreator from "./PaletteCreator"
import data from "../../data/palette_db.json"

export default function Main(props) {
    const [randomPalette, setRandomPalette] = useState(null);

    function toggleMenu () {
        const menu = document.getElementById("menu");
        menu.classList.toggle("hidden");
    }

    function logout() {
        localStorage.removeItem("lsUser");
        window.location.reload();
    }

    function generateRandomPalette() {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomPalette(data[randomIndex]);
    }

    // Optional: If you want to load a random palette on mount
    useEffect(() => {
        generateRandomPalette();
    }, []);

    return (
        <div className="flex flex-col w-full bg-slate-950 p-8">
            <div className='flex justify-between items-center mb-8'>
                <h1 className="text-3xl font-bold text-indigo-600">Valdymo skydas</h1>
                <div className="flex items-center gap-4">
                    <form className="mr-4">
                        <input type="text" placeholder="Search palettes..." className="rounded-lg bg-slate-800 border border-indigo-600/20 outline-none text-slate-200 py-2 px-4 focus:border-indigo-600 transition-all" />
                    </form>
                    <div className="relative">
                        <div className="p-2 rounded-full hover:bg-indigo-600/10 transition-all cursor-pointer" onClick={toggleMenu}>
                            <img src={settingsIcon} alt="Settings" className="h-6 w-6" />
                        </div>
                        
                        <div id="menu" className="hidden absolute right-0 mt-2 w-24 bg-slate-800 border border-indigo-600/20 rounded-lg shadow-lg">
                            <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-indigo-600/20 transition-all cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </div>
                    <h1>{props.username}</h1>
                </div>
            </div>
            
            {/* Pass the AI-generated palette ONLY if it exists */}
            <PaletteCreator AiPalette={randomPalette ?? undefined} />
            
            <h1 className="text-3xl font-bold text-indigo-600 mb-8">Taip pat siūlome</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col items-center bg-slate-900 rounded-xl border border-indigo-600/20 hover:border-indigo-600/40 transition-all cursor-pointer" onClick={generateRandomPalette}>
                    <CardPalette colorCodes={["#9B4DCA", "#7B1FA2", "#6A1B9A", "#4A148C", "#38006B"]} />
                    <div className="w-full p-4">
                        <h3 className="text-xl font-semibold mb-3">Sugeneruota DI</h3>
                        <p className="text-slate-400">Dirbtinio intelekto pasiūlymai.</p>
                    </div>
                </div>

                <div className="flex flex-col items-center bg-slate-900 rounded-xl border border-green-600/20 hover:border-green-600/40 transition-all">
                    <CardPalette colorCodes={["#A5D6A7", "#81C784", "#66BB6A", "#4CAF50", "#388E3C"]} />
                    <div className="w-full p-4">
                        <h3 className="text-xl font-semibold mb-3">Bendruomenės galerija</h3>
                        <p className="text-slate-400">Vartotojų sukurtos paletės.</p>
                    </div>
                </div>

                <div className="flex flex-col items-center bg-slate-900 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                    <CardPalette colorCodes={["#FFECB3", "#FFD54F", "#FFCA28", "#FFC107", "#FFA000"]} />
                    <div className="w-full p-4">
                        <h3 className="text-xl font-semibold mb-3">Populiariausios paletės</h3>
                        <p className="text-slate-400">Labiausiai vertinamos paletės.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
