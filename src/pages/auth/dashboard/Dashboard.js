import React, {useEffect} from "react";
import styles from "./index.module.css";
import { AiFillHome } from "react-icons/ai";
import logoSvgDashboard from "../../../assets/images/circle.svg";
import { FaHouseUser } from "react-icons/fa";
import { MdOutlineApartment } from "react-icons/md";
import Index from "../../../components/auth/shared/Index";
import { getCompanies, getAllCompanies } from "../../../reducers/actions/companySlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardElement = () => {
  const dispatch = useDispatch();
  const companies = useSelector(getAllCompanies);

  useEffect(() => {
    dispatch(getCompanies())
  }, [dispatch]);

	return (
		<>
			<div className="row">
				<div className={`col-md-6 ${styles.stretchCard} ${styles.gridMargin}`}>
					<div
						className={`card ${styles.bgGradientDanger} ${styles.cardImgHolder} text-white w-100`}
					>
						<div className="card-body p-5">
							<img
								src={logoSvgDashboard}
								className={styles.cardImgAbsolute}
								alt="circle"
							/>
							<h4 className={`${styles.fontWeightNormal} mb-3 d-flex justify-content-between`}>
								Users
								<FaHouseUser />
							</h4>
							<h2 className="mb-5">95,5741</h2>
							<h6 className="card-text">Total User joined</h6>
						</div>
					</div>
				</div>
				<div className={`col-md-6 ${styles.stretchCard} ${styles.gridMargin}`}>
					<div
						className={`card ${styles.bgGradientSuccess} ${styles.cardImgHolder} text-white w-100`}
					>
						<div className="card-body p-5">
							<img
								src={logoSvgDashboard}
								className={styles.cardImgAbsolute}
								alt="circle"
							/>
							<h4 className="font-weight-normal mb-3 d-flex justify-content-between">
								Partners
								<MdOutlineApartment />
							</h4>
							<h2 className="mb-5">{companies.loading ? '0' : companies.data.length}</h2>
							<h6 className="card-text">Total Company Joined</h6>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const Dashboard = () => {
	return (
		<>
			<Index
				element={DashboardElement()}
				icon={<AiFillHome color={"white"} />}
				name={"Dashboard"}
			/>
		</>
	);
};

export default Dashboard;
