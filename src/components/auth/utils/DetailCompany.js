import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import styles from "./index.module.css";
import { AiOutlineLeftCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = ({data}) => {
	const BASE_URL_IMAGES = 'http://localhost:3000/images'
	return (
		<>
			<div
				className="d-flex w-100 mb-3"
				style={{ borderBottom: "1px solid #dcdcdc" }}
			>
				<div className="col-md-5">
					<img
						src={!data.img ? 'https://via.placeholder.com/1000x800' : `${BASE_URL_IMAGES}/company/${data.img}`}
						alt="img"
						style={{
							maxHeight: "250px",
							objectFit: "cover",
							objectPosition: "center",
						}}
						className="w-100"
					/>
				</div>
				<div className="col-md-7 d-flex justify-content-center align-items-center flex-wrap">
					<div className="w-100 mx-3">
						<div className="text-center mb-3">
							<h1>{data.name}</h1>
						</div>
						<div className="text-center pt-3">
							<p className="mb-0">{data.address}, Phone : {data.phone}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const Footer = ({ link }) => {
	return (
		<>
			<div className="d-flex px-5 pb-4">
				<Link to={link} style={{ textDecoration: "none" }}>
					<p className="d-flex align-items-center">
						<span className="me-2">
							<AiOutlineLeftCircle size={25} />
						</span>
						<span style={{ borderBottom: "1px solid blue" }}>Back</span>
					</p>
				</Link>
			</div>
		</>
	);
};

const DetailCompany = ({ profilePage, paymentPage, coursePage, link, data }) => {
	return (
		<>
			<div className={`${styles.detailRoot} container`}>
				<div
					className={`mt-4`}
					style={{
						minHeight: "80vh",
						background: "white",
						borderRadius: "5px",
					}}
				>
					<Tabs
						id="uncontrolled-tab-example"
						className=""
						fill
					>
						<Tab
							eventKey="profile"
							title={
								<>
									<p className="mb-0 py-3">Profile</p>
								</>
							}
						>
							<Header data={data} />
							{profilePage}
              <Footer link={link}/>
						</Tab>
						<Tab
							eventKey="home"
							title={
								<>
									<p className="mb-0 py-3">Payment</p>
								</>
							}
						>
							<Header data={data} />
							{paymentPage}
              <Footer link={link}/>
						</Tab>
						<Tab
							eventKey="courses"
							title={
								<>
									<p className="mb-0 py-3">Courses</p>
								</>
							}
						>
							<Header data={data} />
							{coursePage}
              <Footer link={link}/>
						</Tab>
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default DetailCompany;
