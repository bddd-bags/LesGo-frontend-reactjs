import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NavbarComponent = () => {
	const [token, setToken] = useState(localStorage.getItem("access_token"));
	const [role, setRole] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		if (Boolean(token)) {
			const getRole = jwtDecode(token).role_id;
			setRole(getRole);
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
							<Link to={"/"} style={{ textDecoration: "none" }}>
								<Nav className={`px-3 ${styles.navbarLink} nav-link`}>Home</Nav>
							</Link>
							<Link to={"/partners"} style={{ textDecoration: "none" }}>
								<Nav className={`px-3 ${styles.navbarLink} nav-link`}>
									Course
								</Nav>
							</Link>
							<Link to={"/partners"} style={{ textDecoration: "none" }}>
								<Nav className={`px-3 ${styles.navbarLink} nav-link`}>
									Partner
								</Nav>
							</Link>
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
												src={"https://via.placeholder.com/150"}
												alt=""
												className="me-1 rounded-circle"
												style={{ maxWidth: "28px" }}
											/>
										}
									>
										{Number(role) !== 1 ? (
											<>
												<NavDropdown.Item
													onClick={() => navigate("/users/profiles")}
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
													onClick={() => navigate("/users/profiles")}
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
												<Nav.Link onClick={() => navigate("/users/profiles")}>
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
												<Nav.Link onClick={() => navigate("/users/profiles")}>
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
