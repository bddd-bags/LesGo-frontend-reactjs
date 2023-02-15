import React from "react";
import styles from "./index.module.css";
import { NavLink } from "react-router-dom";

const Index = ({ active }) => {
	let activeStyle = {
		borderBottom: "2px solid #6d6d6d",
	};
	return (
		<>
			<div className="row justify-content-center">
				<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
					<div className="mb-3">
						<h3>Courses</h3>
					</div>
					<hr />
					<div className="mb-0 d-flex justify-content-around align-items-center">
						<NavLink
							className={`w-100 text-center text-black text-decoration-none pb-3`}
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
							to={"/dashboard/courses/activity"}
						>
							Activity
						</NavLink>
						<NavLink
							className={`w-100 text-center text-black text-decoration-none pb-3`}
							to={"/dashboard/courses/history"}
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							History
						</NavLink>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
