import React, { useEffect, useState } from "react";
import DetailCompany from "../../../components/auth/utils/DetailCompany";
import Index from "../../../components/auth/shared/Index";
import { TbListDetails } from "react-icons/tb";
import styles from "./index.module.css";
import Payment from "../payments/Index";
import Course from "../courses/Index";
import { Button } from "react-bootstrap";
import {
	companyPartners,
	getCompanyPartner,
} from "../../../reducers/actions/companySlice";
import { useDispatch, useSelector } from "react-redux";
import image from "../../../assets/images/imageAuth.png";
import BlankData from "../../../components/auth/utils/BlankData";
import { MdOutlineApartment } from "react-icons/md";
import Spinner from "../../../components/auth/shared/Spinner";
import { useNavigate } from "react-router-dom";

const Company = () => {
	const dispacth = useDispatch();
	const navigate = useNavigate();
	const [payment, setPayment] = useState(false);
	const [course, setCourse] = useState(false);
	const company = useSelector(getCompanyPartner);
	console.log(company);
	useEffect(() => {
		if (payment) {
			setPayment(false);
		} else if (course) {
			setCourse(false);
		}

		dispacth(companyPartners());
	}, [dispacth, payment, course]);

	return (
		<>
			{company.loading ? (
				<Index
					element={
						<Spinner
							size={80}
							icon={<MdOutlineApartment color="white" />}
							name={"Company"}
						/>
					}
				/>
			) : !company.data ? (
				<Index
					element={
						<BlankData
							image={image}
							link={"/dashboard/add-company"}
							h1={`You have not registered your company`}
							h2={`Come on, register your company now!`}
							btn={"Register"}
						/>
					}
					icon={<MdOutlineApartment color="white" />}
					name={"Company"}
				/>
			) : (
				<>
					<Index
						element={
							<DetailCompany
								profilePage={
									<>
										<div>
											<div className="px-5">
												<div>
													<div className="d-flex justify-content-end px-2">
														<Button
															className={`${styles.btnPrimary} text-white fw-bold`}
															variant="warning"
															size="sm"
															onClick={() =>
																navigate(
																	`/dashboard/update-company/${company.data.id}`,
																)
															}
														>
															Update
														</Button>
													</div>
													<div
														className={`py-3 ${styles.textJustify}`}
														style={{ textIndent: "50px" }}
													>
														<p style={{ letterSpacing: "0.7px" }}>
															{company.data.description}
														</p>
													</div>
												</div>
											</div>
										</div>
									</>
								}
								paymentPage={
									<Payment
										paymentData={company.data.payments}
										companyId={company.data.id}
										setPaymentDelete={setPayment}
									/>
								}
								coursePage={
									<Course
										courseData={company.data.courses}
										companyId={company.data.id}
										setCourse={setCourse}
									/>
								}
								// link={"/dashboard/companies"}
								data={company.data}
							/>
						}
						icon={<TbListDetails color="white" />}
						name="Detail Company"
					/>
				</>
			)}
		</>
	);
};

export default Company;
