import React from "react";
import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	getAllCompanies,
// 	getCompanies,
// } from "../reducers/actions/companySlice";
import Footer from "../components/Footer";
import styles from "./index.module.css";
import image from "../assets/images/imageHome.png";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
	// const dispatch = useDispatch();
	// const companies = useSelector(getAllCompanies);

	// useEffect(() => {
	// 	dispatch(getCompanies());
	// }, [dispatch]);

	// console.log(companies);
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
					<div className="card" style={{ width: "18rem", border: "none" }}>
						<div style={{ minHeight: "180px", maxHeight: "180px" }}>
							<Card.Img
								variant="top"
								src="https://via.placeholder.com/100x62"
							/>
						</div>
						<Card.Body>
							<div>
								<Card.Title>
									Some quick example text to build on the card{" "}
								</Card.Title>
								<p className="text-muted">01-01-2023</p>
							</div>
							<Card.Text>
								Some quick example text to build on the card title and make up
								the bulk of the card's content.
							</Card.Text>
							<Button variant="primary">See More</Button>
						</Card.Body>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Home;
