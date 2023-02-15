import React, { useState, useEffect } from "react";
import Index from "../../../../components/auth/shared/Index";
import { SiReactivex } from "react-icons/si";
import IndexUser from "./Index";
import empty from "../../../../assets/images/empty.svg";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteUserCourses,
	getUserCourses,
} from "../../../../reducers/actions/userCourseSlice";
import Swal from "sweetalert2";
import { updateUserPayments } from "../../../../reducers/actions/paymentSlice";

const Activity = () => {
	const [trigger, setTrigger] = useState(false);
	const dispatch = useDispatch();
	const BASE_URL_IMAGE = "http://localhost:3000/images/course";
	const userCourseActive = useSelector((state) => {
		if (Boolean(state.userCourse.data.length)) {
			return state.userCourse.data.filter((e) => e.course.is_active === true);
		}
		return [];
	});

	useEffect(() => {
		if (trigger) {
			setTrigger(false);
		}
		dispatch(getUserCourses());
	}, [dispatch, trigger]);

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

		// await dispatch(deleteUserCourses(id));
		// Swal.fire({
		// 	position: "center",
		// 	icon: "success",
		// 	title: "Cancel the course!",
		// 	showConfirmButton: false,
		// 	timer: 1500,
		// });
		// return setTrigger(true);
	};

	const handlePay = async (id) => {
		Swal.fire({
			title: "Are you sure you paid?",
			text: "Select yes if you have already paid, after pressing yes please contact the admin immediately to confirm payment!",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Pay!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await dispatch(updateUserPayments(id));
				Swal.fire("Payment!", "Successful Payment.", "success");
				return setTrigger(true);
			}
		});
	};

	const element = () => {
		return (
			<>
				<IndexUser active={"active"} />
				<div
					className={`pt-3 mt-3 d-flex justify-content-center flex-wrap ${styles.QuickSand}`}
				>
					{!userCourseActive.length ? (
						<>
							<div
								className="d-flex align-items-center"
								style={{ minHeight: "75vh" }}
							>
								<div className="text-center w-100">
									<img src={empty} style={{ maxWidth: "400px" }} alt="" />
									<div className="pt-3">
										<h5>No courses taken</h5>
										<p>Course activities can be seen here</p>
										<Link to={"/courses"}>
											<button
												className={`btn btn-primary ${styles.blankBtnRegist}`}
											>
												Course List
											</button>
										</Link>
									</div>
								</div>
							</div>
						</>
					) : (
						userCourseActive.map((e, i) => {
							return (
								<>
									<div
										class="card mb-3"
										key={i}
										style={{ maxWidth: "80%", minWidth: "80%" }}
									>
										<div class="row g-0">
											<div class="col-md-4 my-auto">
												<img
													class={`p-2 card-img-top ${styles.featuredImage}`}
													src={`${BASE_URL_IMAGE}/${e.course.img}`}
													alt="courses"
													style={{ objectFit: "cover" }}
												/>
											</div>
											<div class="col-md-8 row align-items-center">
												<div class="card-body">
													<Link
														className="text-black text-decoration-none"
														to={`/courses/detail/${e.course.id}`}
													>
														<h5 class={`card-title ${styles.fontPoppins}`}>
															{e.course.name.length > 38
																? e.course.name.substr(0, 38) + "..."
																: e.course.name}
														</h5>
													</Link>
													<div class="d-flex justify-content-between">
														<p class="card-text">
															<small class="text-muted">{e.Company.name}</small>
														</p>
														<p class="card-text">
															<small class="text-muted">
																{e.is_approved === 0 ? (
																	<>
																		<Badge
																			className={`${styles.badgePending} rounded-0`}
																			bg="secondary"
																		>
																			Waiting For Payment
																		</Badge>
																	</>
																) : e.is_approved === 1 ? (
																	<>
																		<Badge
																			className={`${styles.badgeWarning} rounded-0`}
																			bg="warning"
																		>
																			Pending
																		</Badge>
																	</>
																) : e.is_approved === 2 ? (
																	<>
																		<Badge
																			className={`${styles.badgeSuccess} rounded-0`}
																			bg=""
																		>
																			Approved
																		</Badge>
																	</>
																) : (
																	<>
																		<Badge
																			className={`${styles.badgeWarning} rounded-0`}
																			bg="danger"
																		>
																			Reject
																		</Badge>
																	</>
																)}
															</small>
														</p>
													</div>
													<p class="card-text">
														{e.course.description.length > 80
															? e.course.description.substr(0, 80) + "...."
															: e.course.description}
													</p>
													<p class="card-text my-2">
														{" "}
														<p class="fw-bold">
															Start Date : {e.course.start_date} to{" "}
															{e.course.end_date}
														</p>
													</p>
													{!e.is_approved ? (
														<>
															<Badge
																className={`${styles.badgeDanger} mx-2 rounded-0`}
																onClick={() => handleCancel(e.id)}
																bg=""
															>
																Cancel
															</Badge>
															<Badge
																className={`${styles.badgePay} mx-2 rounded-0`}
																onClick={() => handlePay(e.id)}
																bg="primary"
															>
																Pay
															</Badge>
														</>
													) : (
														<div className="d-none"></div>
													)}
												</div>
											</div>
										</div>
									</div>
								</>
							);
						})
					)}
				</div>
			</>
		);
	};
	return (
		<>
			<Index
				element={element()}
				name={"Courses Active"}
				icon={<SiReactivex color={"white"} />}
			/>
		</>
	);
};

export default Activity;
