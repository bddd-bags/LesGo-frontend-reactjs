import React, { useEffect } from "react";
import Index from "../../../../components/auth/shared/Index";
import { SiReactivex } from "react-icons/si";
import IndexUser from "./Index";
import empty from "../../../../assets/images/empty.svg";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourses } from "../../../../reducers/actions/userCourseSlice";
import { Badge } from "react-bootstrap";

const History = () => {
	const BASE_URL_IMAGE = "http://localhost:3000/images/course";
	const dispatch = useDispatch();
	const userCourseActive = useSelector((state) => {
		if (Boolean(state.userCourse.data.length)) {
			return state.userCourse.data.filter((e) => e.course.is_active !== true);
		}
		return [];
	});

	useEffect(() => {
		dispatch(getUserCourses());
	}, [dispatch]);

	const element = () => {
		return (
			<>
				<IndexUser active={"active"} />
				<div
					className={`pt-3 mt-3 ${styles.QuickSand} d-flex justify-content-center flex-wrap`}
				>
					{!userCourseActive.length ? (
						<div
							className="d-flex align-items-center"
							style={{ minHeight: "75vh" }}
						>
							<div className="text-center w-100">
								<img src={empty} style={{ maxWidth: "400px" }} alt="" />
								<div className="pt-3">
									<h5>There is no course history yet</h5>
									<p>Course history can be seen here</p>
								</div>
							</div>
						</div>
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
																{e.is_approved ? (
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
																		{" "}
																		<Badge
																			className={`${styles.badgePending} rounded-0`}
																			bg="secondary"
																		>
																			Pending
																		</Badge>
																	</>
																)}
															</small>
														</p>
													</div>
													<p class="card-text">
														{" "}
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
													{e.course.is_active ? (
														<Badge
															className={`${styles.badgeDanger} rounded-0`}
															bg=""
														>
															Cancel
														</Badge>
													) : (
														<Badge
															className={`${styles.badgePending} rounded-0`}
															bg="secondary"
														>
															Course No Active
														</Badge>
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
				name={"Courses History"}
				icon={<SiReactivex color={"white"} />}
			/>
		</>
	);
};

export default History;
