import React from "react";
import course from "../../../assets/images/course.png";
import styles from "./index.module.css";
import BlankData from "../../../components/auth/utils/BlankData";
import { Badge, Button, Table, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteCourses, statusCourses } from "../../../reducers/actions/courseSlice";

const Index = ({ courseData, companyId, setCourse }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleDelete = (id) => {
		if (!setCourse) {
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "You cannot change this!",
			});
		}
		Swal.fire({
			title: "Do you want to delete the Course?",
			showCancelButton: true,
			confirmButtonText: "Delete",
			confirmButtonColor: "#d33",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const result = await dispatch(deleteCourses(id));
				if (result.meta.requestStatus === "fulfilled") {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Course has been deleted!",
						showConfirmButton: false,
						timer: 1500,
					});
					setCourse(true);
				} else {
					return Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Something went wrong!",
					});
				}
			}
		});
	};

	const handleStatus = async (id, is_active) => {
		if (!setCourse) {
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "You cannot change this!",
			});
		}
		await dispatch(statusCourses({ is_active: !is_active, id }));
		Swal.fire({
			position: "center",
			icon: "success",
			text: `company has been ${
				is_active
					? "success change the status to no active"
					: "success change the status to active"
			}`,
			timer: 1500,
		});
		setCourse(true);
	};

	return (
		<>
			{!courseData ? (
				<BlankData
					image={course}
					link={`/dashboard/add-course/${companyId}`}
					h1={`You haven't added a course`}
					h2={`Add a course right now!`}
					btn={"Add Course"}
				/>
			) : !courseData.length ? (
				<BlankData
					image={course}
					link={`/dashboard/add-course/${companyId}`}
					h1={`You haven't added a course`}
					h2={`Add a course right now!`}
					btn={"Add Course"}
				/>
			) : (
				<>
					<div className="px-5 pt-4 mt-3">
						<div className={`mb-3 pb-4`}>
							<div className="d-flex align-items-center justify-content-between px-3 mb-2">
								<h5 className="mb-0 fw-bold">Courses</h5>
								<Button
									className={`${styles.btnPrimary} fw-bold`}
									variant=""
									size="sm"
									onClick={() => navigate(`/dashboard/add-course/${companyId}`)}
								>
									Add new
								</Button>
							</div>
							<Table responsive hover size="sm">
								<thead>
									<tr className={styles.thead}>
										<th>#</th>
										<th>Name</th>
										<th>Quota</th>
										<th>Participant</th>
										<th>Price</th>
										<th>Start</th>
										<th>End</th>
										<th>Status</th>
										<th>#</th>
									</tr>
								</thead>
								<tbody>
									{courseData.map((e, i) => {
										return (
											<>
												<tr key={i} className={styles.tbody}>
													<td>{++i}</td>
													<td>
														{" "}
														{e.name.length > 38
															? e.name.substr(0, 38) + "..."
															: e.name}
													</td>
													<td>{e.quota}</td>
													<td>{e.participant}</td>
													<td>Rp. {e.price}</td>
													<td>{e.start_date}</td>
													<td>{e.end_date}</td>
													<td>
														{e.is_active ? (
															<Badge
																className={`${styles.badgeSuccess} m-2 rounded-0`}
																bg=""
																onClick={() => handleStatus(e.id, e.is_active)}
															>
																active
															</Badge>
														) : (
															<Badge
																className={`${styles.badgeDanger} m-2 rounded-0`}
																bg="danger"
																onClick={() => handleStatus(e.id, e.is_active)}
															>
																no active
															</Badge>
														)}
													</td>
													<td>
														<Dropdown>
															<Dropdown.Toggle
																variant="info"
																size="sm"
																id="dropdown-basic"
															>
																Actions
															</Dropdown.Toggle>

															{!setCourse ? (
																<Dropdown.Menu>
																	<Dropdown.Item
																		onClick={() => handleDelete(e.id)}
																	>
																		Delete
																	</Dropdown.Item>
																</Dropdown.Menu>
															) : (
																<Dropdown.Menu>
																	<Dropdown.Item
																		onClick={() =>
																			navigate(
																				`/dashboard/participants/${e.id}`,
																			)
																		}
																	>
																		List Participant
																	</Dropdown.Item>
																	<Dropdown.Item
																		onClick={() =>
																			navigate(
																				`/dashboard/update-course/${e.id}`,
																			)
																		}
																	>
																		Edit
																	</Dropdown.Item>
																	<Dropdown.Item
																		onClick={() => handleDelete(e.id)}
																	>
																		Delete
																	</Dropdown.Item>
																</Dropdown.Menu>
															)}
														</Dropdown>
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
