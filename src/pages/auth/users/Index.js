import React, { useEffect } from "react";
import Index from "../../../components/auth/shared/Index";
import { AiOutlineUser } from "react-icons/ai";
import styles from "./index.module.css";
import { Table } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUsers } from "../../../reducers/actions/userSlice";
import accountLogo from "../../../assets/images/account.png";

const User = () => {
	const BASE_URL_IMAGE = "http://localhost:3000/images/profile";
	const dispatch = useDispatch();
	const users = useSelector(getAllUsers);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	console.log(users);

	const element = () => {
		return (
			<>
				<div className="row justify-content-center">
					<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
						<h5 className="mb-3">Data Table</h5>
						<div className="py-3">
							<Table responsive hover size="sm">
								<thead>
									<tr className={styles.thead}>
										<th>Picture</th>
										<th>Email</th>
										<th>Username</th>
										<th>Gender</th>
									</tr>
								</thead>
								<tbody>
									{users.loading
										? "loading"
										: users.data.map((e, i) => {
												return (
													<>
														<tr key={i} className={styles.tbody}>
															<td>
																<Image
																	style={{ maxWidth: "38px" }}
																	roundedCircle
																	src={
																		!e.profile.img
																			? accountLogo
																			: `${BASE_URL_IMAGE}/${e.profile.img}`
																	}
																/>
															</td>
															<td>{e.email}</td>
															<td>{e.username}</td>
															<td>
																{!e.profile.gender ? "-" : e.profile.gender}
															</td>
														</tr>
													</>
												);
										  })}
								</tbody>
							</Table>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<Index
				element={element()}
				icon={<AiOutlineUser color="white" />}
				name={"Users"}
			/>
		</>
	);
};

export default User;
