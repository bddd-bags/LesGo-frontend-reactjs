import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const BlankData = ({ image, link, h1, h2, btn }) => {
	return (
		<>
			<div>
				<div className="row justify-content-center align-items-center">
					<div className={`col-11 col-md-12 py-4`}>
						<div className="d-flex align-items-center justify-content-center">
							<div style={{ minWidth: "400px !important" }}>
								<img
									src={image}
									alt="companies"
									style={{ maxWidth: "300px" }}
								/>
							</div>
							<div className="ms-2" style={{ maxWidth: "400px" }}>
								<h2>{h1}</h2>
								<p>{h2}</p>
								<Link to={link}>
									<button
										className={`btn btn-primary ${styles.blankBtnRegist}`}
									>
										{btn}
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlankData;
