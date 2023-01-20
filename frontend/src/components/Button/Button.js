import "./Button.styles.css";

const Button = ({ onClick, text, customClass }) => {
  return (
    <button
      className={`main-button ${!!customClass && customClass} `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
