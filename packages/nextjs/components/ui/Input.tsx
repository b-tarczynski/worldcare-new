interface InputProps {
  id: string
  label?: string
  placeholder?: string
  className?: string
}

export const Input = ({ id, label, placeholder, className }: InputProps) => {
  return <label className={className}>
    <div className="label">
      {label && <span className="label-text">{label}</span>}
    </div>
    <input id={id} name={id} type="text" placeholder={placeholder} className="input input-bordered w-full bg-white" />
  </label>
}
