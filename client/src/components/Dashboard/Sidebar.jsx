import SidebarPalette from './SidebarPalette'

export default function Sidebar(props) {
    const colorPalettesJsx = props.colorPalettes
    ? props.colorPalettes.map(palette => <SidebarPalette colorCodes={palette.colors} name={palette.name} id={palette.id} key={palette.id} />)
    : null;
        
    return (
        <div className="max-w-64 w-80 bg-slate-900 border-r overflow-visible border-indigo-600/20 shadow-lg p-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-indigo-600 mb-6">Vividus</h1>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-4">Kūrinių istorija</h2>
                {colorPalettesJsx}
            </div>
        </div>
    )
}
