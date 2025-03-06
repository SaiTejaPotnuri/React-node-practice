import React, { useRef, useImperativeHandle } from "react";

const Input = React.forwardRef(({divClass,labelClass,label,type,value,onChangeHandler=() => {},onInputHandler = () => {},handleBlurEvent = () => {},id,placeholder,required,error}, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    isValid: inputRef.current?.validity.valid || false
  }));

  return (
    <div className={divClass}>
      <label className={labelClass}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        className="form-control"
        onChange={onChangeHandler}
        onInput={onInputHandler}
        id={id}
        aria-describedby="emailHelp"
        placeholder={placeholder}
        required={required}
        onBlur={() => handleBlurEvent("fullName", value)}
      />
      {error && <div style={{width: "100%", marginTop: "0.25rem", fontSize: "0.875em", color: "#dc3545"}}>{error}</div>}
      </div>
  );
});

export default Input;