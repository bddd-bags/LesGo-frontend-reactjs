import React, {useEffect} from "react";
import DetailCompany from "../../../components/auth/utils/DetailCompany";
import Index from "../../../components/auth/shared/Index";
import { TbListDetails } from "react-icons/tb";
import styles from "./index.module.css";
import Payment from "../payments/Index";
import Course from "../courses/Index";
import { Button } from "react-bootstrap";
import { findOneCompanies, findOne } from "../../../reducers/actions/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/auth/shared/Spinner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const {companyId} = useParams();
	const navigate = useNavigate();
  const dispacth = useDispatch();
  const company = useSelector(findOne);
  useEffect(() => {
    dispacth(findOneCompanies(companyId))
  }, [dispacth, companyId]);

  return (
		<>
			{company.loading ? (
				<Index
					element={
						<Spinner
							size={80}
							icon={<TbListDetails color="white" />}
							name={"Detail Company"}
						/>
					}
				/>
			) : !company.data.id ? (
				"please wait"
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
																	`/dashboard/update-company/${companyId}`,
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
								paymentPage={<Payment paymentData={company.data.payments} />}
								coursePage={<Course courseData={company.data.courses} />}
								data={company.data}
								link={"/dashboard/partners"}
							/>
						}
						icon={<TbListDetails color="white" />}
						name="Detail Company"
					/>
				</>
			)}
		</>
	);
	// return (<>hai</>)
};

export default Profile;
