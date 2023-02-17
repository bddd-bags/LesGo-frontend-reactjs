import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	getAllCourseActive,
	getCourseActive,
} from "../reducers/actions/courseSlice";
import { Pagination } from "react-bootstrap";
import emptyBox from "../assets/images/emptyBox.png";

const Course = () => {
	const [token, setToken] = useState(false);
	const [counter, setCounter] = useState(1);
	const [search, setSearch] = useState("");
	const dispacth = useDispatch();
	const courses = useSelector(getAllCourseActive);
	const BASE_URL_IMAGE = "http://localhost:3000/images/course";

	useEffect(() => {
		setToken(Boolean(localStorage.getItem("access_token")));
	}, []);

	useEffect(() => {
		if (Boolean(search)) {
			setCounter(1);
		}
		dispacth(getCourseActive({ page: counter, search }));
	}, [dispacth, counter, search]);

	const handleNext = () => {
		counter >= Math.ceil(courses.data.count_data / courses.data.per_page)
			? Math.ceil(courses.data.count_data / courses.data.per_page)
			: setCounter(counter + 1);
	};

	const handlePrevious = () => {
		counter <= 1 ? setCounter(1) : setCounter(counter - 1);
	};

	const handleSearch = (e) => {
		e.preventDefault();
	};

	const rupiah = (number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(number);
	};

	return (
		<>
			<Navbar text={"text-black"} navbarPartner={true} />
			<section
				className={`py-5 ${styles.backgroundCourse}`}
				style={{ minHeight: "100vh" }}
			>
				<div className="container">
					<div className={` ${styles.sectionTitle}`}>
						<h2>Courses</h2>
					</div>
				</div>
				<div className="container">
					<div className="w-100 row justify-content-around">
						<div className="col-md-8 px-0">
							<div className="" style={{ minHeight: "60vh" }}>
								{courses.loading ? (
									"loading"
								) : !courses.data.data ? (
									"loading"
								) : !courses.data.data.length ? (
									<>
										<div
											className={`d-flex align-items-center flex-wrap justify-content-center ${styles.QuickSand}`}
											style={{ minHeight: "40vh" }}
										>
											<img
												src={emptyBox}
												style={{ maxWidth: "200px" }}
												alt=""
											/>
											<h4 className="text-uppercase w-100 text-center">
												Courses not found!
											</h4>
										</div>
									</>
								) : (
									courses.data.data.map((e, i) => {
										return (
											<>
												<div key={i} className="card">
													<div className="row g-0">
														<div className="col-md-4 my-auto">
															<img
																className={`p-2 card-img-top ${styles.featuredImage}`}
																src={`${BASE_URL_IMAGE}/${e.img}`}
																alt="courses"
																style={{ objectFit: "cover" }}
															/>
														</div>
														<div className="col-md-8">
															<div className={`card-body ${styles.QuickSand}`}>
																<Link
																	className="text-black text-decoration-none"
																	to={`/courses/detail/${e.id}`}
																>
																	<h5
																		className={`card-title ${styles.fontPoppins}`}
																	>
																		{e.name.length > 38
																			? e.name.substr(0, 38) + "..."
																			: e.name}
																	</h5>
																</Link>
																<div className="d-flex justify-content-between">
																	<p className="card-text">
																		<small className="text-muted">
																			{e.company.name}
																		</small>
																	</p>
																	<p className="card-text">
																		<small className="text-muted">
																			{e.is_active ? "Active" : "No Active"}
																		</small>
																	</p>
																</div>
																<p className="card-text">
																	{e.description.length > 80
																		? e.description.substr(0, 80) + "...."
																		: e.description}
																</p>
																<p className="card-text my-2">
																	{" "}
																	<small className="text-danger">
																		Price : Rp. {rupiah(e.price)}
																	</small>
																</p>
																{!token ? (
																	<>
																		<Link to={`/auth/login`}>
																			<button className="btn btn-primary btn-sm">
																				Join
																			</button>
																		</Link>
																	</>
																) : (
																	<Link to={`/courses/detail/${e.id}`}>
																		<button className="btn btn-primary btn-sm">
																			More
																		</button>
																	</Link>
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

							<div className="mt-3 d-flex justify-content-end pt-2">
								<Pagination className={`${styles.pagination} mb-0`}>
									<Pagination.Prev onClick={handlePrevious} />
									<Pagination.Item active>
										{courses.data.page}/
										{Math.ceil(courses.data.count_data / courses.data.per_page)}
									</Pagination.Item>
									<Pagination.Next onClick={handleNext} />
								</Pagination>
							</div>
						</div>
						<div className="col-md-4 px-0">
							<div>
								<div className="mb-3">
									<div className={`${styles.cardHeader} px-3 py-3`}>
										<h6 className={`mb-0 ${styles.fontPoppins} text-uppercase`}>
											Search Course
										</h6>
									</div>
								</div>
								<div className="mb-3">
									<form
										onSubmit={handleSearch}
										className="d-flex"
										action=""
										method="get"
									>
										<input
											type="text"
											className="form-control ms-4 me-1"
											id=""
											placeholder="Search...."
											value={search}
											onChange={(e) => setSearch(e.target.value)}
										/>
										<button className="btn btn-primary btn-sm px-4 me-4 ms-1">
											Search
										</button>
									</form>
								</div>
								<hr className="d-block" />
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Course;
