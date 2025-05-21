export default function Input(props) {
  const styleMap = {
    valid: 'text-emerald-600 border-emerald-600',
    invalid: 'text-red-500 border-red-500',
    neutral: 'text-black border-black',
  };

  return (
    <div className="text-left relative mb-1.5 w-80">
      <label className={`absolute bg-slate-200 px-1 ml-4 mb-8 ${styleMap[props.status]}`}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        className={`rounded-sm outline-0 p-2 pt-3 w-full border mt-2.5 ${styleMap[props.status]}`}
      />
      <p className={`ml-2.5 ${styleMap[props.status]} ${props.status == "neutral" ? "invisible" : "visible"}`}>{props.errorMsg ? props.errorMsg : "\u00A0"}</p>
    </div>
  );
}