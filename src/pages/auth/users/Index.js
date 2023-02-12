import React from "react";
import Index from "../../../components/auth/shared/Index";
import {AiOutlineUser} from 'react-icons/ai'
import styles from "./index.module.css";
import { Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image'

const User = () => {
	const navigate = useNavigate()
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
										<th>Picture</th>
										<th>Email</th>
										<th>Username</th>
										<th>Gender</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr className={styles.tbody}>
										<td><Image style={{maxWidth: '38px'}} roundedCircle src="https://via.placeholder.com/100" /></td>
										<td>Jakarta</td>
										<td>081234567891</td>
										<td>@mdo</td>
										<td><Badge className={`${styles.badgeDanger} rounded-0`} onClick={() => navigate('/dashboard/companies/detail')} bg="">Delete</Badge></td>
									</tr>
									<tr className={styles.tbody}>
										<td><Image style={{maxWidth: '38px'}} roundedCircle src="https://via.placeholder.com/100" /></td>
										<td>Mark heheh</td>
										<td>Dicoding</td>
										<td>Bandung</td>
										<td><Badge className={`${styles.badgeDanger} rounded-0`} onClick={() => navigate('/dashboard/companies/detail')} bg="">Delete</Badge></td>
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
			<Index
				element={element()}
				icon={<AiOutlineUser color="white" />}
				name={"Users"}
			/>
		</>
	);
};

export default User;
