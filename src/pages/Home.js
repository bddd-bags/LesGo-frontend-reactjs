import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import styles from "./index.module.css";
import image from "../assets/images/imageHome.png";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	getAllCourseActive,
	getCourseActive,
} from "../reducers/actions/courseSlice";

const Home = () => {
	const dispacth = useDispatch();
	const [filterData, setFilterData] = useState([]);
	const courses = useSelector(getAllCourseActive);
	const BASE_URL_IMAGE = "http://localhost:3000/images/course";

	useEffect(() => {
		dispacth(getCourseActive());
	}, [dispacth]);

	useEffect(() => {
		if (!courses.loading) {
			const result = [];
			for (let i = 0; i < 3; i++) {
				result.push(courses.data.data[i]);
			}
			setFilterData(result);
		}
	}, [courses]);

	return (
		<>
			<Navbar />
			<div className={`container ${styles.headerHome} my-3`}>
				<div className="row align-items-center py-3 py-md-5 flex-column-reverse flex-md-row">
					<div className="col-md-5">
						<h2>Come Join Us and Build Your Career From Now!</h2>
						<p>let's go on a new journey</p>
						<Link to={"/dashboard/companies"}>
							<button className={`${styles.registerButton}`}>Register</button>
						</Link>
					</div>
					<div className="col-md-7">
						<img src={image} alt="home-logo" style={{ maxWidth: "100%" }} />
					</div>
				</div>
			</div>
			<section className={`py-4 mt-2 ${styles.course}`}>
				<div className="container">
					<div className={` ${styles.sectionTitle}`}>
						<Link to="/courses" style={{ textDecoration: "none" }}>
							<h2>Course</h2>
						</Link>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Suspendisse egestas risus ut odio molestie, sed ornare lacus
							lobortis. Cras sollicitudin nisl a est tincidunt tristique. Proin
							in congue odio. Curabitur non elementum sapien.
						</p>
					</div>
					<div className="d-flex flex-wrap justify-content-center my-3">
						{!filterData.length ? (
							<>loading</>
						) : (
							filterData.map((e, i) => {
								if (!e) return "";
								return (
									<>
										<div
											className="card mx-3"
											style={{ width: "18rem", border: "none" }}
										>
											<div style={{ minHeight: "180px", maxHeight: "180px" }}>
												<Card.Img
													className={styles.featuredImageHome}
													variant="top"
													src={`${BASE_URL_IMAGE}/${e.img}`}
												/>
											</div>
											<Card.Body>
												<div>
													<Card.Title>
														{" "}
														{e.name.length > 45
															? e.name.substr(0, 45) + "...."
															: e.name}
													</Card.Title>
													<p className="text-muted">{e.company.name}</p>
												</div>
												<Card.Text>
													{e.description.length > 70
														? e.description.substr(0, 70) + "...."
														: e.description}
												</Card.Text>
												<Link to={`/courses/detail/${e.id}`}>
													<Button variant="primary">See More</Button>
												</Link>
											</Card.Body>
										</div>
									</>
								);
							})
						)}
						{/* <div
							className="card mx-2"
							style={{ width: "18rem", border: "none" }}
						>
							<div style={{ minHeight: "180px", maxHeight: "180px" }}>
								<Card.Img
									variant="top"
									src="https://via.placeholder.com/100x62"
								/>
							</div>
							<Card.Body>
								<div>
									<Card.Title>Flutter Bootcamp</Card.Title>
									<p className="text-muted">Codecademy</p>
								</div>
								<Card.Text>
									Some quick example text to build on the card title and make up
									the bulk of the card's content.
								</Card.Text>
								<Link to={"/courses/detail"}>
									<Button variant="primary">See More</Button>
								</Link>
							</Card.Body>
						</div>
						<div
							className="card mx-2"
							style={{ width: "18rem", border: "none" }}
						>
							<div style={{ minHeight: "180px", maxHeight: "180px" }}>
								<Card.Img
									variant="top"
									src="https://via.placeholder.com/100x62"
								/>
							</div>
							<Card.Body>
								<div>
									<Card.Title>Flutter Bootcamp</Card.Title>
									<p className="text-muted">Codecademy</p>
								</div>
								<Card.Text>
									Some quick example text to build on the card title and make up
									the bulk of the card's content.
								</Card.Text>
								<Link to={"/courses/detail"}>
									<Button variant="primary">See More</Button>
								</Link>
							</Card.Body>
						</div> */}
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Home;
