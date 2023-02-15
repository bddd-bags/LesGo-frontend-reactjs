import React, { useEffect, useState } from "react";
import Index from "../../../components/auth/shared/Index";
import { TiFlowSwitch } from "react-icons/ti";
import styles from "./index.module.css";
import accountLogo from "../../../assets/images/account.png";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { findOneUsers, findUsers } from "../../../reducers/actions/userSlice";

const Profile = () => {
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const { userId } = useParams();

	const getUser = useSelector(findOneUsers);

	useEffect(() => {
		dispatch(findUsers(userId));
	}, [userId, dispatch]);

	useEffect(() => {
		if (!getUser.loading) {
			setUser(getUser.data);
		}
	}, [getUser]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(user);
	};

	const element = () => {
		return (
			<>
				<div className="row justify-content-center">
					<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
						{!user.id ? (
							"loading"
						) : (
							<>
								<Form className={`${styles.form}`} onSubmit={handleSubmit}>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Email address</Form.Label>
										<Form.Control
											size="sm"
											type="email"
											placeholder="Enter email"
											value={user.email}
											disabled
										/>
										{/* <Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text> */}
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Username</Form.Label>
										<Form.Control
											size="sm"
											type="text"
											value={user.username}
											onChange={(e) =>
												setUser({ ...user, username: e.target.value })
											}
										/>
										{/* <Form.Text className="text-muted">Username</Form.Text> */}
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Address</Form.Label>
										<Form.Control
											size="sm"
											type="text"
											value={!user.profile.address ? "" : user.profile.address}
											onChange={(e) =>
												setUser({ ...user, address: e.target.value })
											}
										/>
										{/* <Form.Text className="text-muted">Username</Form.Text> */}
									</Form.Group>

									<Row className="mb-3">
										<Form.Group
											as={Col}
											className="mb-3"
											controlId="formBasicEmail"
										>
											<Form.Label>Age</Form.Label>
											<Form.Control
												size="sm"
												type="number"
												value={!user.profile.age ? "" : user.profile.age}
												onChange={(e) =>
													setUser({ ...user, age: e.target.value })
												}
											/>
											{/* <Form.Text className="text-muted">Username</Form.Text> */}
										</Form.Group>
										<Form.Group
											as={Col}
											className="mb-3"
											controlId="formBasicEmail"
										>
											<Form.Label>Gender</Form.Label>
											{!user.gender ? (
												<>
													<Form.Select
														aria-label="Default select example"
														size="sm"
													>
														<option>Open this select gender</option>
														<option value="MALE">Male</option>
														<option value="FEMALE">Female</option>
													</Form.Select>
												</>
											) : (
												<Form.Select
													aria-label="Default select example"
													size="sm"
													value={user.gender}
												>
													{/* <option>Open this select gender</option> */}
													<option value="MALE">Male</option>
													<option value="FEMALE">Female</option>
												</Form.Select>
											)}
											{/* <Form.Text className="text-muted">Username</Form.Text> */}
										</Form.Group>
									</Row>
									<div className="mb-3">
										<div className="d-flex">
											<div className={`${styles.featuredImage}`}>
												<img
													src="https://via.placeholder.com/1000"
													style={{ maxWidth: "200px", objectFit: "cover" }}
													alt=""
												/>
											</div>
											<div className="d-flex align-items-center">
												<Form.Group
													controlId="formFileSm"
													className="mb-3 ms-3 ps-3"
												>
													<Form.Label>Image</Form.Label>
													<Form.Control
														type="file"
														size="sm"
														onChange={(e) =>
															setUser({ ...user, img: e.target.value })
														}
													/>
													<div id="name" className="form-text">
														<i>format : jpg, png, img, jpeg.</i>
													</div>
												</Form.Group>
											</div>
										</div>
									</div>
									<div className="d-flex justify-content-end mx-3 pt-3">
										<Button variant="success" type="submit" size="sm">
											Update
										</Button>
									</div>
								</Form>
							</>
						)}
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
