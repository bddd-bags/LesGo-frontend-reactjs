import React, { useState } from "react";
import Index from "../../../components/auth/shared/Index";
import { MdAddBox } from "react-icons/md";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { createPayments } from "../../../reducers/actions/paymentSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Add = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const {companyId} = useParams();
	const [form, setForm] = useState({
    provider_service: '',
    name: '',
    account_number: ''
  });

	const handleSubmit = async (e) => {
		e.preventDefault();
    const result = await dispacth(createPayments({...form, companyId}))
    if (result.meta.requestStatus === "fulfilled") {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Payment has been add!",
				showConfirmButton: false,
				timer: 1500,
			});
			navigate("/dashboard/companies");
		} else {
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
		}
	};

	const element = () => {
		return (
			<>
				<div className={styles.addCompanyRoot}>
					<div className="row justify-content-center">
						<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
							<Form onSubmit={handleSubmit}>

								<Form.Group className="mb-3" controlId="formGridAddress">
									<Form.Label>Provider</Form.Label>
									<Form.Select onChange={(e) => setForm({...form, provider_service: e.target.value})} size="sm" aria-label="Default select example">
										<option>Open this select menu</option>
										<option value="BANK RAKYAT INDONESIA (BRI)">BANK RAKYAT INDONESIA (BRI)</option>
										<option value="BANK NEGARA INDONESIA (BNI)">BANK NEGARA INDONESIA (BNI)</option>
										<option value="BANK CENTRAL ASIA (BCA)">BANK CENTRAL ASIA (BCA)</option>
										<option value="BANK MANDIRI">BANK MANDIRI</option>
										<option value="BANK PERMATA">BANK PERMATA</option>
										<option value="BANK CIMB NIAGA">BANK CIMB NIAGA</option>
										<option value="DANA">DANA</option>
										<option value="OVO">OVO</option>
									</Form.Select>
								</Form.Group>

								<Row className="mb-3">
									<Form.Group as={Col} controlId="formGridEmail">
										<Form.Label>Name</Form.Label>
										<Form.Control
											type="text"
											size="sm"
											value={form.name}
											onChange={(e) =>
												setForm({ ...form, name: e.target.value })
											}
											required
										/>
										<div id="name" className="form-text">
											Input account name.
										</div>
									</Form.Group>

									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Account Number</Form.Label>
										<Form.Control
											type="number"
											size="sm"
											value={form.account_number}
											onChange={(e) =>
												setForm({ ...form, account_number: e.target.value })
											}
											required
										/>
										<div id="name" className="form-text">
											Input account number.
										</div>
									</Form.Group>
								</Row>

								<div className="pt-3 d-flex justify-content-end px-2">
									<Link to={"/dashboard/companies"}>
										<div
											className={`${styles.backButton} mx-2 btn btn-secondary btn-sm`}
										>
											Back
										</div>
									</Link>
									<Button
										variant=""
										className={`${styles.addButton} mx-2`}
										type="submit"
                    size="sm"
									>
										Save
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</>
		);
	};
  
	return (
		<>
			<Index
				element={element()}
				name={"Add Payment"}
				icon={<MdAddBox color="white" />}
			/>
		</>
	);
};

export default Add;
