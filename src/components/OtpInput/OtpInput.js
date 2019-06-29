import React, { useRef, useState } from "react";
import styles from "./OtpInput.module.css";
import SquareBox from "../SquareBox/SquareBox";

function OtpInput() {
  const [displayValue, setDisplayValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const otpInputRef = useRef(null);

  function changeValueToAsterisks(value) {
    const asterisks = value.replace(/\S/gi, "*");
    setDisplayValue(asterisks);
  }

  function handleChangeInputValue(event) {
    const { value } = event.target;

    const validated = value.replace(/[^0-9]/gi, "");
    let targetValue = validated.length > 6 ? validated.slice(0, 6) : validated;

    setOtpValue(targetValue);
    changeValueToAsterisks(targetValue);
  }

  function handleClickDisplayValue() {
    otpInputRef.current.focus();
  }

  return (
    <div className={styles.otp_container}>
      <p className={styles.otp_display}>{displayValue}</p>

      <div
        className={styles.square_box_container}
        // onFocus={handleClickDisplayValue}
      >
        {Array(6)
          .fill(true)
          .map((_, index) => (
            <SquareBox
              key={index}
              border="1px solid black"
              length={10}
              onClick={handleClickDisplayValue}
              styles={styles.square_box}
            />
          ))}
      </div>

      <div className={styles.otp_input_container}>
        <input
          className={styles.otp_input}
          autoFocus
          onChange={handleChangeInputValue}
          ref={otpInputRef}
          type="tel"
          value={otpValue}
        />
      </div>
    </div>
  );
}

export default OtpInput;
