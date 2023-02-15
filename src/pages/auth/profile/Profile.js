import React, { useEffect, useState } from "react";
import Index from "../../../components/auth/shared/Index";
import { TiFlowSwitch } from "react-icons/ti";
import styles from "./index.module.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	findOneUsers,
	findUsers,
	updateUsers,
} from "../../../reducers/actions/userSlice";
import Swal from "sweetalert2";

const Profile = () => {
	const dispatch = useDispatch();
	const [trigger, setTrigger] = useState(false);
	const [user, setUser] = useState({});
	const { userId } = useParams();
	const BASE_URL_IMAGE = "http://localhost:3000/images/profile";

	const getUser = useSelector(findOneUsers);

	useEffect(() => {
		if (trigger) {
			setTrigger(false);
		}
		dispatch(findUsers(userId));
	}, [userId, dispatch, trigger]);

	useEffect(() => {
		if (!getUser.loading) {
			setUser({ ...getUser.data, ...getUser.data.profile });
		}
	}, [getUser]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user);
		const result = await dispatch(updateUsers({ id: userId, data: user }));
		if (result.meta.requestStatus === "fulfilled") {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Profile has been updated!",
				showConfirmButton: false,
				timer: 1500,
			});
			return setTrigger(true);
		} else {
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
		}
	};

	console.log(user);

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
											value={!user.address ? "" : user.address}
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
												value={!user.age ? "" : user.age}
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
											{/* {!user.gender ? (
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
											) : ( */}
											<Form.Select
												aria-label="Default select example"
												size="sm"
												defaultValue={user.gender}
												onChange={(e) =>
													setUser({ ...user, gender: e.target.value })
												}
											>
												<option>Open this select gender</option>
												<option value="MALE">Male</option>
												<option value="FEMALE">Female</option>
											</Form.Select>
											{/* )} */}
										</Form.Group>
									</Row>
									<div className="mb-3">
										<div className="d-flex">
											<div className={`${styles.featuredImage}`}>
												<img
													src={
														!user.profile.img
															? "https://via.placeholder.com/1000"
															: `${BASE_URL_IMAGE}/${user.profile.img}`
													}
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
															setUser({ ...user, img: e.target.files[0] })
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
