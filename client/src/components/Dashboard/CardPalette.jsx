export default function SidebarPalette(props) {
    const colorcodesJsx =  props.colorCodes.map(colorCode => <div style={{backgroundColor: colorCode}} className="w-full">{"\u00A0"}</div>)
    return (
        <div className="flex mx-5 rounded-t-xl border border-slate-800 overflow-hidden h-7 cursor-pointer w-full">
            {colorcodesJsx}
        </div>
    )
}