import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { AiOutlineLeftCircle } from "react-icons/ai";
import { Form, Table, Badge } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { findOneCourses, findCourses } from "../reducers/actions/courseSlice";
import {
	getUserCourses,
	createUserCourses,
} from "../reducers/actions/userCourseSlice";
import Swal from "sweetalert2";
import { deleteUserCourses } from "../reducers/actions/userCourseSlice";

const Detail = () => {
	const [token] = useState(localStorage.getItem("access_token"));
	const [trigger, setTrigger] = useState(false);
	const [paymentId, setPaymentId] = useState(0);
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const course = useSelector(findOneCourses);
	const filterUserCourse = useSelector((state) => {
		if (!!state.userCourse.data.length) {
			return state.userCourse.data.filter((e) => +e.course_id === +courseId);
		}
		return [];
	});
	const BASE_URL_IMAGE = "http://localhost:3000/images/course";

	useEffect(() => {
		dispatch(findCourses(courseId));
	}, [dispatch, courseId]);

	useEffect(() => {
		if (trigger) {
			setTrigger(false);
		}
		dispatch(getUserCourses());
	}, [dispatch, trigger]);

	const handleSubmit = async (courseId, companyId) => {
		if (!paymentId) {
			return Swal.fire({
				icon: "warning",
				text: "Please select payment method!",
			});
		}

		const result = await dispatch(
			createUserCourses({
				company_id: companyId,
				course_id: courseId,
				payment_id: paymentId,
			}),
		);

		if (result.meta.requestStatus === "fulfilled") {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Joined the course!",
				showConfirmButton: false,
				timer: 1500,
			});
			setTrigger(true);
		} else {
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
		}
	};

	const handleCancel = async (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			// showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, cancel course!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await dispatch(deleteUserCourses(id));
				Swal.fire("Canceled!", "Course has been canceled.", "success");
				return setTrigger(true);
			}
		});
	};

	return (
		<>
			<Navbar text={"text-black"} navbarPartner={true} />

			<div className={`${styles.backgroundDetail}`}>
				<div
					className={`${styles.detailRoot} d-flex align-items-center container`}
				>
					{course.loading ? (
						"loading"
					) : (
						<>
							<div className="row justify-content-around w-100">
								<div className="col-md-9">
									<div className="d-flex">
										<div className={`${styles.detailImage}`}>
											<img
												src={`${BASE_URL_IMAGE}/${course.data.img}`}
												className="w-100 rounded"
												alt=""
											/>
										</div>
										<div className="ps-3 w-100">
											<h3>{course.data.name}</h3>
											<p>
												Duration : {course.data.start_date} to{" "}
												{course.data.end_date}
											</p>
											<p>Quota : {course.data.quota}</p>
											<p>Participant : {course.data.participant}</p>
											<p>Price : Rp. {course.data.price}</p>
											<p className={`${styles.textJustify}`}>
												{course.data.description}
											</p>
											<div className="w-100 mt-5">
												<h6>Payment Method :</h6>
												<Table responsive hover size="sm">
													<thead className={`${styles.thead}`}>
														<tr>
															<th>A/N</th>
															<th>Account Number</th>
														</tr>
													</thead>
													<tbody className={`${styles.tbody}`}>
														{!course.data.company
															? "loading..."
															: course.data.company.payments.map((e, i) => {
																	return (
																		<tr key={i}>
																			<td>
																				{e.name} - {e.provider_service}
																			</td>
																			<td>{e.account_number}</td>
																		</tr>
																	);
															  })}
													</tbody>
												</Table>
											</div>
											<div className="d-flex py-3">
												<Link
													to={"/courses"}
													style={{ textDecoration: "none" }}
												>
													<p className="d-flex align-items-center">
														<span className="me-2">
															<AiOutlineLeftCircle size={25} />
														</span>
														<span style={{ borderBottom: "1px solid blue" }}>
															Back
														</span>
													</p>
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3">
									<div className={`card ${styles.cardStyle}`}>
										<div className="m-4">
											{!filterUserCourse.length ? (
												!token ? (
													<>
														<Link to={"/auth/login"}>
															<button
																className={`btn w-100 btn-secondary ${styles.btnDetail}`}
															>
																Join
															</button>
														</Link>
													</>
												) : (
													<>
														<div className="mb-3">
															<label className="mb-1">Payment Method</label>
															<Form.Select
																aria-label="Default select example"
																onChange={(e) => setPaymentId(e.target.value)}
															>
																<option>Select payment</option>
																{!course.data.company
																	? "loading"
																	: course.data.company.payments.map((e, i) => {
																			return (
																				<>
																					<option key={i} value={e.id}>
																						{e.provider_service} - {e.name}
																					</option>
																				</>
																			);
																	  })}
															</Form.Select>
														</div>
														<button
															className={`btn w-100 btn-secondary ${styles.btnDetail}`}
															onClick={() =>
																handleSubmit(courseId, course.data.company.id)
															}
														>
															JOIN COURSE
														</button>
													</>
												)
											) : filterUserCourse[0].is_approved ? (
												<>
													<p className="mb-0">
														Congrats! You are already enrolled in this course.
													</p>
												</>
											) : (
												<>
													<p>
														You are already enrolled in this course. Please make
														a payment and confirm with the admin!
													</p>
													<p>Cancel This Course?</p>
													<Badge
														className={`${styles.badgeDanger} rounded-0`}
														onClick={() => handleCancel(filterUserCourse[0].id)}
														bg=""
													>
														Cancel
													</Badge>
												</>
											)}
										</div>

										{/* <div className="m-4">
									<button
										className={`btn w-100 btn-secondary ${styles.btnDetail}`}
									>
										REGISTER
									</button>
								</div> */}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Detail;
