import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import accountLogo from "../assets/images/account.png";

const NavbarComponent = () => {
	const [token, setToken] = useState(localStorage.getItem("access_token"));
	const [userId, setUserId] = useState();
	const [role, setRole] = useState();
	const navigate = useNavigate();

	// const userId = jwtDecode(token).id;

	// const activeClass = {
	// 	fontWeight: "bold !important",
	// };

	useEffect(() => {
		if (Boolean(token)) {
			const getPayload = jwtDecode(token);
			setRole(getPayload.role_id);
			setUserId(getPayload.id);
		}
	}, [token, navigate]);

	const handleLogout = (e) => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("username");
		localStorage.removeItem("role");
		setToken(null);
		e.preventDefault();
	};

	return (
		<>
			<Navbar bg="white" expand="md" className={`${styles.navbar}`}>
				<Container>
					<Navbar.Brand className="me-0" href="#">
						<h2 className="mb-0" style={{ fontWeight: "700" }}>
							LesGo
						</h2>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav className="mx-auto my-2 my-lg-0 ">
							{/* <NavLink
								to={"/"}
								// style={{ textDecoration: "none" }}
								style={({ isActive }) => (isActive ? activeClass : undefined)}
							> */}
							<NavLink
								to={"/"}
								className={`px-3 ${styles.navbarLink} nav-link`}
							>
								Home
							</NavLink>
							{/* </NavLink> */}
							<NavLink
								to={"/courses"}
								className={`px-3 ${styles.navbarLink} nav-link`}
							>
								Course
							</NavLink>
							<NavLink
								to={"/partners"}
								className={`px-3 ${styles.navbarLink} nav-link`}
							>
								Partner
							</NavLink>
						</Nav>
						<Nav>
							{!token ? (
								<Link to={"/auth/login"}>
									<Button
										variant="outline"
										className={`ms-3 ${styles.loginButton}`}
									>
										Sign in
									</Button>
								</Link>
							) : (
								<>
									<NavDropdown
										className="ms-3 d-none d-md-block"
										title={
											<img
												src={accountLogo}
												alt=""
												className="me-1 rounded-circle"
												style={{ maxWidth: "28px" }}
											/>
										}
									>
										{Number(role) !== 1 ? (
											<>
												<NavDropdown.Item
													onClick={() =>
														navigate("/dashboard/courses/activity")
													}
												>
													My Courses
												</NavDropdown.Item>
												<NavDropdown.Item
													onClick={() => navigate(`/users/profiles/${userId}`)}
												>
													Profile
												</NavDropdown.Item>
												<NavDropdown.Item onClick={handleLogout}>
													Logout
												</NavDropdown.Item>
											</>
										) : (
											<>
												<NavDropdown.Item
													onClick={() => navigate("/dashboard")}
												>
													Dashboard
												</NavDropdown.Item>
												<NavDropdown.Item
													onClick={() => navigate(`/users/profiles/${userId}`)}
												>
													Profile
												</NavDropdown.Item>
												<NavDropdown.Item onClick={handleLogout}>
													Logout
												</NavDropdown.Item>
											</>
										)}
									</NavDropdown>

									{Number(role) !== 1 ? (
										<>
											{" "}
											<div className="d-block px-3 px-md-0 d-md-none">
												<hr className="my-0" />
												<Nav.Link
													onClick={() =>
														navigate("/dashboard/courses/activity")
													}
												>
													My Courses
												</Nav.Link>
												<Nav.Link
													onClick={() => navigate(`/users/profiles/${userId}`)}
												>
													Profile
												</Nav.Link>
												<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
											</div>
										</>
									) : (
										<>
											{" "}
											<div className="d-block px-3 px-md-0 d-md-none">
												<hr className="my-0" />
												<Nav.Link onClick={() => navigate("/dashboard")}>
													Dashboard
												</Nav.Link>
												<Nav.Link
													onClick={() => navigate(`/users/profiles/${userId}`)}
												>
													Profile
												</Nav.Link>
												<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
											</div>
										</>
									)}
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavbarComponent;
