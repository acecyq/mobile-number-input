import React from "react";
import OtpInput from "./components/OtpInput/OtpInput";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <header>
        <div className={styles.header_container}>
          <h1 className={styles.header_text}>MOBILE NUMBER INPUT</h1>
        </div>
      </header>

      <section className={styles.otp_container}>
        <OtpInput />
      </section>
    </div>
  );
}

export default App;
