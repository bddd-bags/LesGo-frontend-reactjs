import React, { useState, useEffect } from "react";
import Index from "../../../components/auth/shared/Index";
import { FaEdit } from "react-icons/fa";
import { Button, Row, Form, Col } from "react-bootstrap";
import styles from "./index.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	findOneCompanies,
	findOne,
  updateCompany
} from "../../../reducers/actions/companySlice";
import Swal from "sweetalert2";

const UpdateCompany = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate()
  const {companyId} = useParams()
	const company = useSelector(findOne);
	const [form, setForm] = useState({});
  
	useEffect(() => {
		dispatch(findOneCompanies(companyId));
	}, [dispatch, companyId]);
  
  useEffect(() => {
    if(!company.loading) {
      setForm({
        id: company.data.id,
        name: company.data.name,
        description: company.data.description,
        address: company.data.address,
        phone: company.data.phone,
        img: {}
      })
    }
  }, [company]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		const result = await dispatch(updateCompany({form, companyId}))
    if (result.meta.requestStatus === "fulfilled") {
			navigate("/dashboard/companies");
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Company has been updated!",
				showConfirmButton: false,
				timer: 1500,
			});
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
							{!form.id ? 'loading' : <>
              <Form onSubmit={handleUpdate}>
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
										/>
										<div id="name" className="form-text">
											Input company name.
										</div>
									</Form.Group>

									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Phone</Form.Label>
										<Form.Control
											type="number"
											size="sm"
											value={form.phone}
											onChange={(e) =>
												setForm({ ...form, phone: e.target.value })
											}
										/>
										<div id="name" className="form-text">
											Input company phone.
										</div>
									</Form.Group>
								</Row>

								<Form.Group className="mb-3" controlId="formGridAddress">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										style={{ height: "100px" }}
										value={form.description}
										onChange={(e) =>
											setForm({ ...form, description: e.target.value })
										}
									/>
								</Form.Group>

								<Row className="mb-3">
									<Form.Group as={Col} xs={8}>
										<Form.Label>City</Form.Label>
										<Form.Control
											size="sm"
											type="text"
											value={form.address}
											onChange={(e) =>
												setForm({ ...form, address: e.target.value })
											}
										/>
										<div id="name" className="form-text">
											Input company address.
										</div>
									</Form.Group>

									<Form.Group as={Col} controlId="formGridZip">
										<Form.Label>Small file input example</Form.Label>
										<Form.Control
											type="file"
											size="sm"
											onChange={(e) =>
												setForm({ ...form, img: e.target.files[0] })
											}
										/>
										<div id="name" className="form-text">
											<i>format : jpg, png, img, jpeg.</i>
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
              </>}
						</div>
					</div>
				</div>
			</>
		);
	};
	return (
		<>
			<Index
				name={"Update Company"}
				element={element()}
				icon={<FaEdit color="white" />}
			/>
		</>
	);
};

export default UpdateCompany;
