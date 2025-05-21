import axios from "axios";
import TrashIcon from "../../assets/icons/trash-bin.svg"
import UploadIcon from "../../assets/icons/upload.svg"

export default function SidebarPalette(props) {
  const colorcodesJsx = (props.colorCodes || []).map(colorCode => (
    <div key={colorCode} style={{ backgroundColor: `#${colorCode}` }} className="w-full h-10 inline-block">{"\u00A0"}</div>
  ));

  async function deletePalette() {
    await axios.post("http://localhost:3000/deletePalette", {username: localStorage.getItem("lsUser"), paletteId: props.id})
    window.location.reload()
  }

  async function publishPalette() {
    await axios.post("http://localhost:3000/publishPalette", {createdBy: localStorage.getItem("lsUser"), paletteColors: props.colorCodes, paletteName: props.name })
  }

  return (
    <div className="relative mb-8 z-10">
      <div className="rounded-sm border border-slate-800 bg-slate-800 overflow-hidden h-8 transition-all hover:rounded-lg hover:h-20 hover:w-80 w-52 z-10">
        <div className="flex justify-between">{colorcodesJsx}</div>
        <div className="flex justify-between items-center px-2">
          <h1 className="font-bold">{props.name}</h1>
          <div className="flex gap-2">
            <button className="flex justify-center items-center rounded-md bg-green-500 my-2 w-6 h-6 cursor-pointer">
              <img src={UploadIcon} onClick={publishPalette} className="w-4 h-4" />
            </button>
            <button className="flex justify-center items-center rounded-md bg-red-500 my-2 w-6 h-6 cursor-pointer">
              <img src={TrashIcon} onClick={deletePalette} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
