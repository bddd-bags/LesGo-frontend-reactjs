import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Auth from "../../components/auth/Auth";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginElement = () => {
	const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  });
	const navigate = useNavigate()
	const [token] = useState(localStorage.getItem('access_token'))

	useEffect(() => {
		if(!!token) {
			navigate('/')
		}
	}, [token, navigate])

  const login = async(data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', data)
      localStorage.setItem('access_token', response.data.data.access_token);
      localStorage.setItem('username', response.data.data.user);
      localStorage.setItem('role', response.data.data.role_id);
      const getRole = response.data.data.role_id
			// await Swal.fire({
			// 	position: 'center',
			// 	icon: 'success',
			// 	showConfirmButton: false,
			// 	title: 'Success to login',
			// 	timer: 1500
			// })
			Number(getRole) !== 1 ? navigate('/') : navigate('/dashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message.toUpperCase(),
      })
    }
  }

	const handleLogin = (e) => {
    login(formLogin)
		e.preventDefault();
	};

	return (
		<>
			<div className={`${styles.loginBox} my-auto`}>
				<h5>Login</h5>

				<form onSubmit={handleLogin}>
					<div className={`${styles.loginRow} mb-3 row m-0`}>
						<label>
							<i className="fas fa-envelope"></i> Email Address
						</label>
						<input type="email" required className="form-control form-control-sm" value={formLogin.email} onChange={(e) => setFormLogin({...formLogin, email: e.target.value})} />
					</div>

					<div className={`${styles.loginRow} mb-3 row m-0`}>
						<label>
							<i className="fas fa-unlock-alt"></i> Password
						</label>
						<input type="password" required className="form-control form-control-sm "  value={formLogin.password} onChange={(e) => setFormLogin({...formLogin, password: e.target.value})}/>
					</div>

					<div className={`${styles.loginRow} ${styles.btnroo} row m-0`}>
						<button className="btn btn-primary btn-sm mb-3"> Sign In</button>
					</div>
				</form>
				<div className={`${styles.loginRow} ${styles.donroo} row m-0`}>
					<p>
						Don't have an Account ? <Link to={"/auth/register"}>Sign Up</Link>
					</p>
				</div>
			</div>
		</>
	);
};

const Login = () => {
	return (
		<>
			<Auth element={LoginElement()} />
		</>
	);
};

export default Login;
