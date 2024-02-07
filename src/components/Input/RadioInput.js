export default function RadioInput({ name, id, label, value, setValue }) {
  return (
    <div className="radio-button-container">
      <input
        className="radio-input"
        type="radio"
        name={name}
        id={id}
        value={id}
        checked={value === id}
        onChange={(e) => setValue(e.target.value)}
      />
      <label className="radio-input-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
