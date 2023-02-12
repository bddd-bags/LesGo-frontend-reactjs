import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const Index = ({active}) => {
	return (
		<>
			<div className="row justify-content-center">
				<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
          <div className="mb-3">
            <h3>Courses</h3>
          </div>  
          <hr/>
          <div className="mb-0 d-flex justify-content-around align-items-center">
            <Link className={`w-100 text-center text-black text-decoration-none pb-3`} to={'/dashboard/courses/activity'}>Activity</Link>
            <Link className={`w-100 text-center text-black text-decoration-none pb-3`} to={'/dashboard/courses/history'}>History</Link>
          </div>
          {/* {element} */}
        </div>
			</div>
		</>
	);
};

export default Index;
