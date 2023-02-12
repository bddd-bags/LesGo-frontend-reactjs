import React, {useState, useEffect} from 'react'
import Index from '../../../components/auth/shared/Index'
import { FaEdit } from "react-icons/fa";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css'
import { findPayments, findOnePayments, updatePayments } from '../../../reducers/actions/paymentSlice';
import Swal from 'sweetalert2';

const Update = () => {
  const { paymentId } = useParams();
	const navigate = useNavigate();
  const [form, setForm] = useState({});
  const dispacth = useDispatch();
  const payment = useSelector(findOnePayments)

  useEffect(() => {
    dispacth(findPayments({paymentId}))
  }, [dispacth, paymentId]);

	useEffect(() => {
		if(!payment.loading) {
			return setForm(payment.data)
		}
	}, [payment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
		const result = await dispacth(updatePayments({data: form, id: payment.data.id}))

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
  }

  const element = () => {
		return (
			<>
				<div className={styles.addCompanyRoot}>
					<div className="row justify-content-center">
						<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
							<Form onSubmit={handleSubmit}>

								<Form.Group className="mb-3" controlId="formGridAddress">
									<Form.Label>Provider</Form.Label>
									<Form.Select onChange={(e) => setForm({...form, provider_service: e.target.value})} size="sm" aria-label="Default select example" value={form.provider_service}>
										<option value="BANK RAKYAT INDONESIA (BRI)" >BANK RAKYAT INDONESIA (BRI)</option>
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
										Update
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
      <Index element={element()} icon={<FaEdit color='white' />} name={'Update Payments'} />
    </>
  )
}

export default Update