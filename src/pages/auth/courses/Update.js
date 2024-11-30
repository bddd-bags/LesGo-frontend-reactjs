import React, { useState, useEffect } from "react";
import Index from "../../../components/auth/shared/Index";
import { MdAddBox } from "react-icons/md";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { findCourses, findOneCourses, updateCourses } from "../../../reducers/actions/courseSlice";
import Swal from "sweetalert2";

const Update = () => {
	const dispacth = useDispatch();
	const navigate = useNavigate();
	const {courseId} = useParams();
	const [form, setForm] = useState({});
	const course = useSelector(findOneCourses)

	useEffect(() => {
		dispacth(findCourses(courseId))
	}, [dispacth, courseId]);

	useEffect(() => {
		if(!course.loading) {
			setForm({
				name: course.data.name,
				description: course.data.description,
				price: course.data.price,
				quota: course.data.quota,
				start_date: course.data.start_date,
				end_date: course.data.end_date,
				img: {},
			})
		}
	}, [course]);
	
	
	const handleSubmit = async(e) => {
		e.preventDefault();
    const result = await dispacth(updateCourses({data: {...form}, courseId}))
		if (result.meta.requestStatus === "fulfilled") {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Course has been updated!",
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
											Input course name.
										</div>
									</Form.Group>

									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Price</Form.Label>
										<Form.Control
											type="number"
											size="sm"
											value={form.price}
											onChange={(e) =>
												setForm({ ...form, price: e.target.value })
											}
											required
										/>
										<div id="name" className="form-text">
											Input course price.
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
										required
									/>
								</Form.Group>

								<Row className="mb-3">
									<Form.Group as={Col} xs={3}>
										<Form.Label>Quota</Form.Label>
										<Form.Control
											size="sm"
											type="text"
											value={form.quota}
											onChange={(e) =>
												setForm({ ...form, quota: e.target.value })
											}
											required
										/>
										<div id="name" className="form-text">
											Input Qouta participant.
										</div>
									</Form.Group>

									<Form.Group as={Col} xs={3}>
										<Form.Label>Start Date</Form.Label>
										<Form.Control
											size="sm"
											type="date"
											value={form.start_date}
											onChange={(e) =>
												setForm({ ...form, start_date: e.target.value })
											}
											required
										/>
										<div id="name" className="form-text">
											Input Start Date.
										</div>
									</Form.Group>

									<Form.Group as={Col} xs={3}>
										<Form.Label>End Date</Form.Label>
										<Form.Control
											size="sm"
											type="date"
											value={form.end_date}
											onChange={(e) =>
												setForm({ ...form, end_date: e.target.value })
											}
											required
										/>
										<div id="name" className="form-text">
											Input End Date.
										</div>
									</Form.Group>

									<Form.Group as={Col} controlId="formGridZip">
										<Form.Label>Image</Form.Label>
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
				name={"Add Course"}
				icon={<MdAddBox color="white" />}
			/>
		</>
	);
};

export default Update;
