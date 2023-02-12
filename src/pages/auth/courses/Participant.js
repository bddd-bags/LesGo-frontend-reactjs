import React, {useState} from 'react'
import { Table, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.css"
import Index from '../../../components/auth/shared/Index';

const Participant = () => {
  const [e, setE] = useState({});
  const navigate = useNavigate()

  const element = () => {
		return (
			<>
				<div className="row justify-content-center">
					<div className={`col-11 col-md-12 ${styles.sectionRoot}`}>
						<h5 className="mb-3">Participant Courses</h5>
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
                <tr key={e.id} className={styles.tbody}>
															<td>{}</td>
															<td>{e.name}</td>
															<td>{e.address}</td>
															<td>{e.user_id}</td>
															<td>
																{e.is_approved ? <Badge
																	className={`${styles.badgeSuccess} rounded-0`}
																	onClick={() => {}}
																	bg=""
																>
																	Approved
																</Badge> : <Badge
																	className={`${styles.badgeWarning} rounded-0`}
																	onClick={() => {}}
																	bg="secondary"
																>
																	Waiting Approved
																</Badge>}
																
															</td>
															<td>
																<Badge
																	className={`${styles.badgeView} rounded-0`}
																	onClick={() =>
																		navigate("/dashboard/companies/" + e.id)
																	}
																	bg=""
																>
																	Delete
																</Badge>
															</td>
														</tr>
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
			<Index element={element()} name={'Participants'} />
		</>
  )
}

export default Participant