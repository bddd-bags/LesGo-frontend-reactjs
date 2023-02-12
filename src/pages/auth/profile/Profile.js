import React from "react";
import Index from "../../../components/auth/shared/Index";
import { TiFlowSwitch } from "react-icons/ti";
import styles from "./index.module.css";

const Profile = () => {
	const element = () => {
		return (
			<>
				<div className="row justify-content-center">
					<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
						<div className="py-3">
							<div className="d-flex justify-content-center">
								<img className="rounded-circle" src="https://via.placeholder.com/300" alt="" />
							</div>
						</div>
							<h4 className="text-center pt-3 mb-4">Admin</h4>
							<hr/>
							<p>Change Password</p>
							<hr/>
							<p>Edit Profile</p>
							<hr/>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<Index
				element={element()}
				icon={<TiFlowSwitch color="white" />}
				name={"Profiles"}
			/>
		</>
	);
};

export default Profile;
