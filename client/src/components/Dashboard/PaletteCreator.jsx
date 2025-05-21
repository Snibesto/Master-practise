    import { useEffect, useState } from "react"
    import ColorCard from './ColorCard'
    import axios from "axios";

    export default function PaletteCreator(props) {
        const isAiPalette = typeof props.AiPalette !== "undefined";

        const [responseStatus, setResponseStatus] = useState("neutral")
        const [paletteStatus, setPaletteStatus] = useState("neutral")
        const [current, setCurrent] = useState();
        const [colorCodes, setColorCodes] = useState(isAiPalette ? props.AiPalette.colors : [])
        const hexadecimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

        // ONLY update colorCodes when AiPalette prop changes
        useEffect(() => {
            if (isAiPalette) {
                setColorCodes(props.AiPalette.colors);
            }
        }, [props.AiPalette]);

        const colorCodesJsx = colorCodes.map((color, index) => <ColorCard color={color} removeColor={removeColor} key={index} id={index} />)

        async function handleSubmit(event) {
            let valid = true;
            event.preventDefault()

            const formData = new FormData(event.currentTarget)
            let colorCode = formData.get("colorCode").toUpperCase()

            if(colorCode.length !== 3 && colorCode.length !== 6) {
                valid = false
            }

            if(colorCode.length === 3) {
                colorCode = colorCode[0] + colorCode[0] + colorCode[1] + colorCode[1] + colorCode[2] + colorCode[2]
            }

            for(let i of colorCode) {
                if(!hexadecimal.includes(i.toUpperCase())) {
                    valid = false
                    break
                }
            }

            if(valid) {
                setColorCodes(prevColorCodes => [...prevColorCodes, colorCode])
            }
            setResponseStatus(valid ? "valid" : "invalid");
        }

        function updatePreview(e) {
            const value = e.target.value;
            let valid = true;
            let color = value;

            if (color.length !== 3 && color.length !== 6) {
                valid = false;
            }

            if (color.length === 3) {
                color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
            }

            for (let i of color) {
                if (!hexadecimal.includes(i.toUpperCase())) {
                    valid = false;
                    break;
                }
            }

            setCurrent(valid ? color : "invalid");
            setResponseStatus("neutral")
        }

        function clearPalette() {
            setColorCodes([])
            setResponseStatus("neutral")
        }

        function removeColor(id) {
            setColorCodes(prevColorCodes => prevColorCodes.filter((_, index) => index !== id))
        }

        async function submitPalette() {
            let isValid = true

            if(colorCodes.length < 3) {
                isValid = false
            }

            if(document.getElementById("paletteName").value.length < 6) {
                isValid = false
            }

            setPaletteStatus(isValid ? "valid" : "invalid")
            setTimeout(() => setPaletteStatus("neutral"), 2500)

            if(isValid) {
                await axios.post("http://localhost:3000/createPalette", {username: localStorage.getItem("lsUser"), palette: {name: document.getElementById("paletteName").value, colors: colorCodes}})
                window.location.reload();
            }
        }
        
        return (
            <div className="mb-8 z-0">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600">Sukurti naują spalvų paletę</h1>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-2xl border border-indigo-600/20 h-[450px] relative">
                    <div>
                        <div className="flex items-center mb-6 gap-4">
                            <h1 className="text-xl font-bold">Paletės pavadinimas:</h1>
                            <input type="text" id="paletteName"className="px-4 py-2 bg-slate-800 rounded-lg border border-indigo-600/20 focus:border-indigo-600 outline-none" maxLength={20}/>
                        </div>
                        <form className="flex items-center gap-4 mb-2" onSubmit={handleSubmit}>
                            <input type="text" id="colorCode" name="colorCode" placeholder="000000" className="px-4 py-2 bg-slate-800 rounded-lg border border-indigo-600/20 focus:border-indigo-600 outline-none" maxLength={6} onChange={updatePreview} />
                            <div 
                                className="w-10 h-10 rounded-lg border border-black" 
                                style={{ backgroundColor: current == "invalid" ? "transparent" : `#${current}` }}
                            />
                            <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all" type="submit">
                                Pridėti spalvą
                            </button>
                        </form>

                        <p className={`ml-1 ${responseStatus === "neutral" ? "invisible" : "visible"} ${responseStatus === "invalid" ? "text-red-500" : "text-green-500"}`}>
                            {responseStatus === "invalid" ? "Spalvos kodas neteisingas!" : "Spalvos kodas pridėtas!"}
                        </p>
                        <div className="flex gap-5 absolute bottom-0 mb-28">
                            {colorCodesJsx}
                        </div>
                        <div className="flex gap-5 absolute w-full bottom-0 left-0 p-6 pb-10">
                            <button
                                className={`flex-1 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg shadow-lg shadow-indigo-600/20 text-xl cursor-pointer font-bold
                                    ${paletteStatus === "valid" ? "ring-4 ring-green-500" : ""}
                                    ${paletteStatus === "invalid" ? "ring-4 ring-red-500" : ""}
                                `}
                                onClick={submitPalette}
                            >
                                Išsaugoti paletę
                            </button>
                            <button className="px-6 py-4 bg-gradient-to-r from-rose-500 to-red-700 hover:from-rose-600 hover:to-red-800 opacity-90 rounded-lg border border-indigo-600/20 cursor-pointer font-bold" onClick={clearPalette}>
                                Išvalyti
                            </button>
                        </div>
                        <p className={`
                            absolute bottom-0 mb-1 text-xl rounded-lg transition-all
                            ${paletteStatus === "valid" ? "text-green-500 visible" : ""}
                            ${paletteStatus === "invalid" ? "text-red-500 visible" : ""}
                            ${paletteStatus === "neutral" ? "invisible" : ""}
                        `}>
                            {paletteStatus === "valid" ? "Paletė sėkmingai išsaugota!" : null}
                            {paletteStatus === "invalid" ? "Paletės pavadinimas turi būti ilgesnis nei 5 raidės, paletė turi turėti daugiau nei 2 spalvas." : null}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
