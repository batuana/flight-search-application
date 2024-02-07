import { useState, useRef, useLayoutEffect, useEffect } from "react";

export default function SearchInput({
  style,
  label,
  data,
  value,
  setValue,
  isValid,
  validate,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const firstUpdate = useRef(true);

  const autoCompletedData =
    autoComplete &&
    data.filter((item) => item.toLowerCase().includes(value.toLowerCase()));

  function onFocus() {
    setAutoComplete(true);
    setIsFocused(true);
  }

  function onBlur() {
    setAutoComplete(false);
    if (value === "") setIsFocused(false);
    if (!data.includes(value));
    validate(value);
  }

  function handleAutoComplete(autoComplete) {
    setAutoComplete(false);
    setValue(autoComplete);
  }

  useLayoutEffect(() => {
    value === "" ? setIsFocused(false) : setIsFocused(true);
  }, [value]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    validate(value);
  }, [value]);

  return (
    <div style={style} className="input-container">
      <input
        className={`input-box ${isValid ? "" : "input-box-error"}`}
        type="text"
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => setAutoComplete(true)}
      />
      {!isValid && <p className="error-message">This is a required field.</p>}
      <div
        className={`input-label input-label-${isFocused ? "top" : "middle"}`}
      >
        {label}
      </div>
      {autoComplete && autoCompletedData && autoCompletedData.length !== 0 && (
        <div className="auto-complete">
          <ul>
            {autoCompletedData.map((item) => (
              <li
                key={item}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleAutoComplete(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
