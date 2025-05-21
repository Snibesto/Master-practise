export default function ColorCode(props) {
    return (
        <div className="flex flex-wrap gap-4">
            <div className="relative group">
                <div 
                    className="w-24 h-24 rounded-lg"
                    style={{ backgroundColor: `#${props.color}` }}/>
                <button
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => props.removeColor(props.id)}>
                    ×
                </button>
                <div className="text-center mt-2">{props.color}</div>
            </div>
        </div>
    )
}