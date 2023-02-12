import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Auth from "../../components/auth/Auth";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterElement = () => {
	const [registerForm, setRegisterForm] = useState({
		username: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [token] = useState(localStorage.getItem('access_token'))

	useEffect(() => {
		if(!!token) {
			navigate('/')
		}
	}, [token, navigate])

	const registerData = async (data) => {
		try {
			await axios.post('http://localhost:3000/api/register', data) 
			await Swal.fire({
				position: 'center',
				icon: 'success',
				showConfirmButton: false,
				title: 'Success to register',
				timer: 1500
			})

			navigate('/auth/login')
		} catch (e) {
			Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.response.data.message.toUpperCase(),
      })
		}
	}

	const handleRegister = (e) => {
		registerData(registerForm)
		e.preventDefault();
	};

	return (
		<>
			<div className={`${styles.loginBox} my-auto`}>
				<h5>Register</h5>

				<form onSubmit={handleRegister}>
					<div className={`${styles.loginRow} mb-3 row m-0`}>
						<label>
							<i className="fas fa-envelope"></i> Username
						</label>
						<input
							type="text"
							required
							className="form-control form-control-sm"
							value={registerForm.username}
							onChange={(e) =>
								setRegisterForm({ ...registerForm, username: e.target.value })
							}
						/>
					</div>

					<div className={`${styles.loginRow} mb-3 row m-0`}>
						<label>
							<i className="fas fa-envelope"></i> Email Address
						</label>
						<input
							type="email"
							required
							className="form-control form-control-sm"
							value={registerForm.email}
							onChange={(e) =>
								setRegisterForm({ ...registerForm, email: e.target.value })
							}
						/>
					</div>

					<div className={`${styles.loginRow} mb-3 row m-0`}>
						<label>
							<i className="fas fa-unlock-alt"></i> Password
						</label>
						<input
							type="password"
							required
							className="form-control form-control-sm "
							value={registerForm.password}
							onChange={(e) =>
								setRegisterForm({ ...registerForm, password: e.target.value })
							}
						/>
					</div>

					<div className={`${styles.loginRow} ${styles.btnroo} row m-0`}>
						<button className="btn btn-primary btn-sm mb-3"> Register </button>
					</div>
				</form>

				<div className={`${styles.loginRow} ${styles.donroo} row m-0`}>
					<p>
						Have an Account ? <Link to={"/auth/login"}>Login</Link>
					</p>
				</div>
			</div>
		</>
	);
};

const Register = () => {
	return (
		<>
			<Auth element={RegisterElement()} />
		</>
	);
};

export default Register;
