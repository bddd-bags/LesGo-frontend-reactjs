import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./index.module.css";
import { getCompanies } from "../reducers/actions/companySlice";

const Partner = () => {
	const dispatch = useDispatch();
	const BASE_URL_IMAGE = "http://localhost:3000/images/company";
	const companiesApproved = useSelector((state) => {
		if (!!state.company.data.length) {
			return state.company.data.filter((e) => e.is_approved === true);
		}
		return [];
	});

	useEffect(() => {
		dispatch(getCompanies());
	}, [dispatch]);

	return (
		<>
			<Navbar text={"text-black"} navbarPartner={true} />
			<section
				className={`py-5 ${styles.backgroundCourse}`}
				style={{ minHeight: "60vh" }}
			>
				<div className="container">
					<div className={` ${styles.sectionTitle}`}>
						<h2>Partners</h2>
					</div>
				</div>
				<div className="container">
					<div className="w-100 flex-wrap d-flex justify-content-around">
						{!companiesApproved.length
							? ""
							: companiesApproved.map((e, i) => {
									return (
										<>
											<div key={i} className="text-center m-2">
												<div className={`${styles.Image}`}>
													<img
														src={`${BASE_URL_IMAGE}/${e.img}`}
														alt=""
														className="w-100"
													/>
												</div>
												<p>{e.name}</p>
											</div>
										</>
									);
							  })}
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Partner;
