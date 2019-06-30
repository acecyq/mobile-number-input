import React, { useEffect, useRef, useState } from "react";
import styles from "./OtpInput.module.css";
import SquareBox from "../SquareBox/SquareBox";

function OtpInput() {
  const [checkIndex, setCheckIndex] = useState(0);
  const [displayValue, setDisplayValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [platform, setPlatform] = useState("desktop");
  const [timeoutId, setTimeoutId] = useState(null);
  const otpInputRef = useRef(null);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setPlatform("mobile");
    }
  }, []);

  function changeValueToAsterisks(value) {
    const lastIndex = value ? value.length - 1 : 0;
    const secondStep = value.replace(/[^*]/g, "*");
    let firstStep = value;

    if (
      lastIndex > checkIndex ||
      (lastIndex === checkIndex && lastIndex === 0)
    ) {
      let asterisks = "*".repeat(lastIndex);
      firstStep = asterisks += value.charAt(lastIndex);
    } else {
      firstStep = secondStep;
    }

    setCheckIndex(lastIndex);

    return { firstStep, secondStep };
  }

  function delayChangeDisplayValue(firstStep, secondStep) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setDisplayValue(firstStep);

    const delayedSetDisplayValue = setTimeout(() => {
      setDisplayValue(secondStep);
    }, 1000);
    setTimeoutId(delayedSetDisplayValue);
  }

  function validateValue(value) {
    const validated = value.replace(/[^0-9]/gi, "");
    return validated.length > 6 ? validated.slice(0, 6) : validated;
  }

  function handleChangeInputValue(event) {
    const { value } = event.target;
    const targetValue = validateValue(value);

    setOtpValue(targetValue);

    const { firstStep, secondStep } = changeValueToAsterisks(targetValue);

    if (platform === "mobile") {
      delayChangeDisplayValue(firstStep, secondStep);
    } else {
      setDisplayValue(secondStep);
    }
  }

  function handleClickDisplayValue() {
    otpInputRef.current.focus();
  }

  return (
    <div className={styles.otp_container}>
      <p className={styles.otp_display}>{displayValue}</p>

      <div className={styles.square_box_container}>
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
