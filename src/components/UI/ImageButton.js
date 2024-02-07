export default function ImageButton({ img, altText, handleOnClick, style }) {
  return (
    <button style={style} className="image-button" onClick={handleOnClick}>
      <img className="button-image" src={img} alt={altText} />
    </button>
  );
}
