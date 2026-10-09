import React from "react";
import logo from "../../../assets/images/HBL-Logo.png";
import styles from "./style.module.css";
const Loader = ({loaderstyle}) => {
  console.log("auth.Loading")
  return (
    <>
    {loaderstyle ==="authenticationLoaderStyle"?
      <div id="overlay" className="authenticationLoaderStyle">
      <div className={styles.containerloader}>
        <span className={styles.Loaderlogo}>
          <img src={logo} alt="loading" />
        </span>
        <div className={styles.line}>
          <div className={styles.inner}></div>
        </div>
      </div>
    </div>
    :
  //   <div id="overlay" className={loaderstyle}>
  //   <div className={styles.containerloader}>
  //     <span className={styles.Loaderlogo}>
  //       <img src={logo} alt="loading" />
  //     </span>
  //     <div className={styles.line}>
  //       <div className={styles.inner}></div>
  //     </div>
  //   </div>
  // </div>
  null
  }
    </>
  );
};
export default Loader;
