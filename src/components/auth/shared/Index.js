import React from "react";
import Navbar from "./Navbar";
import styles from "./index.module.css";
import { GrCircleAlert } from "react-icons/gr";
import Footer from "./Footer";

const Index = (props) => {
	const { name, element, icon } = props;
	
	return (
		<>
			<div className={`${styles.backgroundRoot}`}>
				<Navbar />
				<div className={`container ${styles.sectionStyle}`}>
					<div className="d-flex mb-4 justify-content-between px-3">
						<div className="d-flex align-items-center">
							<div
								className={`${styles.bgGradient} d-flex align-items-center justify-content-center`}
							>
								{icon}
							</div>
							<h5
								className="mb-0 ms-3"
								style={{ color: "#343A40", fontSize: "18px" }}
							>
								{name}
							</h5>
						</div>
						<div className={`d-flex align-items-center ${styles.overview}`}>
							<p className="mb-0">
								Overview <GrCircleAlert size={18} className="mb-1 ms-1" />
							</p>
						</div>
					</div>
					{element}
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Index;
