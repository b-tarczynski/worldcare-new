interface InputProps {
  label?: string
  placeholder?: string
  className?: string
  inputClass?: string
  textarea?: boolean
}

export const Input = ({ label, placeholder, className, textarea }: InputProps) => {
  return (
    <label className={className}>
      <div className="label">{label && <span className="label-text">{label}</span>}</div>

      {textarea ? (
        <textarea rows={6} placeholder={placeholder} className="input p-3 input-bordered w-full bg-white h-auto mb-4" />
      ) : (
        <input type="text" placeholder={placeholder} className="input input-bordered w-full bg-white" />
      )}
    </label>
  )
}
