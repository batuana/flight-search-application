export default function TextButton({ text, handleOnClick, isDisabled }) {
  return (
    <button
      className="text-button"
      onClick={handleOnClick}
      disabled={isDisabled}
    >
      <span>{text}</span>
    </button>
  );
}
