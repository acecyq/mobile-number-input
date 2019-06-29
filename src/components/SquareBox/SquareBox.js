import React from "react";

function SquareBox({ onClick, styles }) {
  return <div className={styles} onClick={onClick} />;
}

export default SquareBox;
