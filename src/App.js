import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Partner from "./pages/Partner";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/auth/dashboard/Dashboard";
import DashboardPartner from "./pages/auth/partners/Partner"
import Profile from "./pages/auth/profile/Profile";
import Company from './pages/auth/partners/Company'
// import Detail from "./pages/auth/partners/Detail";
// import {DetailDashboard} from "./pages/auth/partners/Detail"
import AddCompany from "./pages/auth/partners/AddCompany";
import ProfileCompany from "./pages/auth/partners/Profile";
import User from './pages/auth/users/Index'
import UpdateCompany from "./pages/auth/partners/UpdateCompany";
import AddPayment from './pages/auth/payments/Add'
import Participant from "./pages/auth/courses/Participant";
import AddCourse from "./pages/auth/courses/Add";
import UpdatePayment from "./pages/auth/payments/Update";
import UpdateCourse from "./pages/auth/courses/Update";
import Activity from "./pages/auth/courses/users/Activity";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route exact path="/partners" element={<Partner />} />
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dashboard/partners" element={<DashboardPartner />} />
				<Route path="/users/profiles" element={<Profile />} />
				<Route path="/dashboard/users" element={<User />} />
				<Route path="/dashboard/companies" element={<Company />} />
				<Route path="/dashboard/companies/:companyId" element={<ProfileCompany />} />
				<Route path="/dashboard/add-company" element={<AddCompany />} />
				<Route path="/dashboard/update-company/:companyId" element={<UpdateCompany />} />
				<Route path="/dashboard/add-payment/:companyId" element={<AddPayment />} />
				<Route path="/dashboard/update-payment/:paymentId" element={<UpdatePayment />} />
				<Route path="/dashboard/add-course/:companyId" element={<AddCourse />} />
				<Route path="/dashboard/update-course/:courseId" element={<UpdateCourse />} />
				<Route path="/dashboard/courses/activity" element={<Activity />} />
				<Route path="/dashboard/participants" element={<Participant />} />
				{/* <Route  path="/companies/detail" element={<Detail />} /> */}
				
			</Routes>
		</>
		// <div className="App">
		//   <header className="App-header">
		//     <img src={logo} className="App-logo" alt="logo" />
		//     <p>
		//       Edit <code>src/App.js</code> and save to reload.
		//     </p>
		//     <a
		//       className="App-link"
		//       href="https://reactjs.org"
		//       target="_blank"
		//       rel="noopener noreferrer"
		//     >
		//       Learn React
		//     </a>
		//   </header>
		// </div>
	);
}

export default App;
