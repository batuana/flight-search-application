export default function TextButton({ text, handleOnClick }) {
  return (
    <button className="text-button" onClick={handleOnClick}>
      <span>{text}</span>
    </button>
  );
}
