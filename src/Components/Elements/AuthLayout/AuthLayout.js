import React from "react";
import styles from "./style.module.css";

// Split-screen shell for the Login page: a white form side and an orange
// panel decorated with floating shapes (same design as FRMU main's AuthLayout).
// Security Admin has no Sign Up page, so FRMU main's panel switch button and
// the curtain animation that runs between Login and Sign Up are left out.
const AuthLayout = ({ children }) => {
  return (
    <div className={styles.shell}>
      <section className={styles.formSide}>
        <div className={styles.brand}>Fraud Digitization Portal</div>
        <div className={styles.formInner}>{children}</div>
      </section>

      <aside className={styles.panel}>
        <span className={`${styles.shape} ${styles.triangleBig}`} />
        <span className={`${styles.shape} ${styles.triangleSmall}`} />
        <span className={`${styles.shape} ${styles.diamond}`} />
        <span className={`${styles.shape} ${styles.circleBig}`} />
        <span className={`${styles.shape} ${styles.dotOne}`} />
        <span className={`${styles.shape} ${styles.dotTwo}`} />
        <span className={`${styles.shape} ${styles.bar}`} />

        <div className={styles.panelContent}>
          <h2 className={styles.panelTitle}>Welcome, Security Admin</h2>
          <p className={styles.panelText}>
            Manage users and roles for the Fraud Digitization Portal.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default AuthLayout;
