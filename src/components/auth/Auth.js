import React from 'react'
import styles from './index.module.css'
import imageAuth from "../../assets/images/login-banner.png";

const Auth = (props) => {
  const {element} = props 
  return (
    <>
      <section className={`${styles.authPage}`}>
				<div className="container">
					<div
						className={`row align-items-center justify-content-center ${styles.authCard}`}
					>
						<div className={`row col-12 ${styles.sectionAuth} px-0  m-3`}>
							<div
								className={`col-md-7 px-0 d-none d-md-block d-flex align-items-center justify-content-center flex-wrap ${styles.borderRight}`}
							>
								<div
									className={`text-center p-5 my-2`}
									style={{ boxSizing: "border-box !important" }}
								>
									<img src={imageAuth} alt="img-auth" className="w-100" />
								</div>
							</div>
							<div
								className={`col-md-5 d-flex align-items-center justify-content-center px-0 ${styles.borderLeft}`}
							>
								{element}
							</div>
						</div>
					</div>
				</div>
			</section>
    </>
  )
}

export default Auth