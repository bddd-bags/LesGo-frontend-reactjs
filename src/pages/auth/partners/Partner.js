import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllCompanies,
	getCompanies,
	approvedCompany,
} from "../../../reducers/actions/companySlice";
import Index from "../../../components/auth/shared/Index";
import { TiFlowSwitch } from "react-icons/ti";
import styles from "./index.module.css";
import { Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../../components/auth/shared/Spinner";

const Partner = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [approved, setApproved] = useState(false);
	// const [companies, setCompanies] = useState();
	const companies = useSelector(getAllCompanies);

	useEffect(() => {
		if (approved) {
			setApproved(false);
		}
		dispatch(getCompanies());
	}, [dispatch, approved]);

	const handleApproved = async (id, is_approved) => {
		await dispatch(approvedCompany({ id, approved: !is_approved }));

		Swal.fire({
			position: "center",
			icon: "success",
			text: `company has been ${
				is_approved
					? "success change the status to not approved"
					: "success change the status to approved"
			}`,
			timer: 1500,
		});
		setApproved(true);
	};

	const element = () => {
		return (
			<>
				<div className="row justify-content-center">
					<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
						<h5 className="mb-3">Data Table</h5>
						<div className="py-3">
							<Table responsive hover size="sm">
								<thead>
									<tr className={styles.thead}>
										<th>#</th>
										<th>Name</th>
										<th>Address</th>
										<th>Phone</th>
										<th>Manager</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{companies.loading ? (
										<tr>
											<td
												colSpan={7}
												className="text-center py-3 text-uppercase"
											>
												Loading
											</td>
										</tr>
									) : !companies.data.length ? (
										<tr>
											<td
												colSpan={7}
												className="text-center py-3 text-uppercase"
											>
												No Data
											</td>
										</tr>
									) : (
										companies.data.map((e, i) => {
											return (
												<>
													<tr key={e.id} className={styles.tbody}>
														<td>{++i}</td>
														<td>{e.name}</td>
														<td>{e.address}</td>
														<td>{e.phone}</td>
														<td>{e.user.email}</td>
														<td>
															{e.is_approved ? (
																<Badge
																	className={`${styles.badgeSuccess} rounded-0`}
																	onClick={() =>
																		handleApproved(e.id, e.is_approved)
																	}
																	bg=""
																>
																	Approved
																</Badge>
															) : (
																<Badge
																	className={`${styles.badgeWarning} rounded-0`}
																	onClick={() =>
																		handleApproved(e.id, e.is_approved)
																	}
																	bg="secondary"
																>
																	Pending
																</Badge>
															)}
														</td>
														<td>
															<Badge
																className={`${styles.badgeView} rounded-0`}
																onClick={() =>
																	navigate("/dashboard/companies/" + e.id)
																}
																bg=""
															>
																View
															</Badge>
														</td>
													</tr>
												</>
											);
										})
									)}
								</tbody>
							</Table>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			{companies.loading ? (
				<Index
					element={<Spinner size={80} />}
					icon={<TiFlowSwitch color="white" />}
					name={"Partners"}
				/>
			) : (
				<Index
					element={element()}
					icon={<TiFlowSwitch color="white" />}
					name={"Partners"}
				/>
			)}
		</>
	);
};

export default Partner;
