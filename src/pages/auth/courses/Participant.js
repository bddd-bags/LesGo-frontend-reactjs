import React, { useState, useEffect } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Index from "../../../components/auth/shared/Index";
import { useDispatch, useSelector } from "react-redux";
import {
	findCoursePartners,
	findOneCoursePartners,
} from "../../../reducers/actions/courseSlice";
import { HiUsers } from "react-icons/hi";
import { updateUserCourses } from "../../../reducers/actions/userCourseSlice";
import Swal from "sweetalert2";
import { deleteUserCourses } from "../../../reducers/actions/userCourseSlice";

const Participant = () => {
	const [trigger, setTrigger] = useState(false);
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const course = useSelector(findOneCoursePartners);

	useEffect(() => {
		if (trigger) {
			setTrigger(false);
		}
		dispatch(findCoursePartners(courseId));
	}, [dispatch, courseId, trigger]);

	const handleDecisions = async (id, approved) => {
		await dispatch(updateUserCourses({ id, approved }));

		Swal.fire({
			position: "center",
			icon: "success",
			text: `User has been ${
				approved
					? "success to join the courses"
					: "success change the status to not approved"
			}`,
			timer: 1500,
		});
		setTrigger(true);
	};

	const handleDelete = async (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await dispatch(deleteUserCourses(id));
				Swal.fire("Deleted!", "Participant has been deleted.", "success");
				return setTrigger(true);
			}
		});
	};

	const element = () => {
		return (
			<>
				<div className="row justify-content-center">
					<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
						<h5 className="mb-3">Participant {course.data.name}</h5>
						<div className="py-3">
							<Table responsive hover size="sm">
								<thead>
									<tr className={styles.thead}>
										<th>#</th>
										<th>Name</th>
										<th>Email</th>
										<th>Payment Method</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{course.loading ? (
										<tr>
											<td colSpan={6} className="py-3 text-center">
												Loading
											</td>
										</tr>
									) : !course.data.user_courses.length ? (
										<>
											<tr>
												<td colSpan={6} className="py-3 text-center">
													No Data
												</td>
											</tr>
										</>
									) : (
										course.data.user_courses.map((e, i) => {
											return (
												<>
													<tr key={e.id} className={styles.tbody}>
														<td>{++i}</td>
														<td>{e.User.username}</td>
														<td>{e.User.email}</td>
														<td>{e.payment.provider_service}</td>
														<td>
															{e.is_approved === 0 ? (
																<Badge
																	className={`${styles.badgeWarning} rounded-0`}
																	// onClick={() =>
																	// 	handleApproved(e.id, !e.is_approved)
																	// }
																	bg="secondary"
																>
																	Waiting for payment
																</Badge>
															) : e.is_approved === 1 ? (
																<>
																	<Badge
																		className={`${styles.badgeWarning} rounded-0`}
																		bg="warning"
																	>
																		Waiting to Approved
																	</Badge>
																</>
															) : e.is_approved === 2 ? (
																<Badge
																	className={`${styles.badgeSuccess} rounded-0`}
																	bg=""
																>
																	Approved
																</Badge>
															) : (
																<Badge
																	className={`rounded-0 ${styles.badgeWarning}`}
																	bg="danger"
																	disabled
																>
																	Payment declined
																</Badge>
															)}
														</td>
														<td>
															{e.is_approved === 1 ? (
																<>
																	<Button
																		className={`rounded-0 mx-2`}
																		size="sm"
																		variant="outline-primary"
																		onClick={() => handleDecisions(e.id, 2)}
																	>
																		Approved
																	</Button>
																	<Button
																		className={`rounded-0 mx-2`}
																		variant="outline-danger"
																		size="sm"
																		onClick={() => handleDecisions(e.id, 3)}
																	>
																		Reject
																	</Button>
																</>
															) : (
																<Badge
																	className={`${styles.badgeView} rounded-0`}
																	onClick={() => handleDelete(e.id)}
																	bg=""
																>
																	Delete
																</Badge>
															)}
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
			<Index
				element={element()}
				name={"Participants"}
				icon={<HiUsers color="white" />}
			/>
		</>
	);
};

export default Participant;
