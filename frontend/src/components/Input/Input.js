import "./Input.styles.css";

const Input = ({
  label,
  value,
  handleChangeValue,
  placeholder,
  customClass,
  ...props
}) => {
  return (
    <div className={`input-container ${!!customClass && customClass}`}>
      <label className="input-container__label">{label}</label>
      <input
        className="input-container__input"
        value={value}
        onChange={(e) => handleChangeValue(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
