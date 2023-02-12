import React from "react";
import styles from "./index.module.css";
import payment from "../../../assets/images/payment.png";
import BlankData from "../../../components/auth/utils/BlankData";
import { Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePayments } from "../../../reducers/actions/paymentSlice";
import Swal from "sweetalert2";

const Index = ({ paymentData, companyId, setPaymentDelete }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const handleDelete = async(id) => {
		Swal.fire({
			title: "Do you want to delete the Payment Method?",
			showCancelButton: true,
			confirmButtonText: "Delete",
			confirmButtonColor: "#d33",
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				const result = await dispatch(deletePayments(id))
				if (result.meta.requestStatus === "fulfilled") {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Payment has been deleted!",
						showConfirmButton: false,
						timer: 1500,
					});
					setPaymentDelete(true)
				} else {
					return Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Something went wrong!",
					});
				}
			}
		});
	}

	return (
		<>
			{!paymentData ? (
				"loading"
			) : !paymentData.length ? (
				<BlankData
					image={payment}
					link={`/dashboard/add-payment/${companyId}`}
					h1={`You haven't added a payment method`}
					h2={`Add a payment method right now, so you can make transactions
							easier for your company!`}
					btn={"Add Payment"}
				/>
			) : (
				<>
					<div className="px-5 pt-4 mt-3">
						<div className={`mb-3 pb-4`}>
							<div className="d-flex align-items-center justify-content-between px-3 mb-2">
								<h5 className="mb-0 fw-bold">Payments</h5>
								<Button
									className={`${styles.btnPrimary} fw-bold`}
									variant=""
									size="sm"
									onClick={() => navigate(`/dashboard/add-payment/${companyId}`)}
								>
									Add new
								</Button>
							</div>
							<Table responsive hover size="sm">
								<thead>
									<tr className={styles.thead}>
										<th>#</th>
										<th>Name</th>
										<th>Account Number</th>
										<th>Provider</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{paymentData.map((e, i) => {
										return (
											<>
												<tr key={i} className={styles.tbody}>
													<td>{++i}</td>
													<td>{e.name}</td>
													<td>{e.account_number}</td>
													<td>{e.provider_service}</td>
													<td>
														<Badge
															className={`${styles.badgeWarning} m-1 rounded-0`}
															bg="warning"
															onClick={() => navigate(`/dashboard/update-payment/${e.id}`)}
														>
															Update
														</Badge>{" "}
														|{" "}
														<Badge
															className={`${styles.badgeDanger} m-2 rounded-0`}
															bg="danger"
															onClick={() => handleDelete(e.id)}
														>
															Delete
														</Badge>
													</td>
												</tr>
											</>
										);
									})}
								</tbody>
							</Table>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Index;
