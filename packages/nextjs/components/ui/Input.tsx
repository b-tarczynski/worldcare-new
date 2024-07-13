interface InputProps {
  label?: string
  placeholder?: string
  className?: string
  inputClass?: string
}

export const Input = ({ label, placeholder, className }: InputProps) => {
  return <label className={className}>
    <div className="label">
      {label && <span className="label-text">{label}</span>}
    </div>
    <input type="text" placeholder={placeholder} className="input input-bordered w-full bg-white" />
  </label>
}
