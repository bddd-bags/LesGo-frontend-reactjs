import { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./index.module.css";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { TiFlowSwitch } from "react-icons/ti";
import { SiCoursera } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import SpinnerComponent from "./Spinner";

const NavbarMenu = ({ role }) => {
	const navigate = useNavigate();

	if (Number(role) !== 1) {
		return (
			<>
				<Navbar
					className={`${styles.backgroundNavbarMenu} py-0 d-none d-lg-block`}
					variant="dark"
				>
					<Container>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse
							className={`${styles.navSection} d-flex justify-content-around`}
							id="basic-navbar-nav"
						>
							<>
								<div>
									<Nav.Link
										className={`${styles.navLink}`}
										onClick={() => navigate("/dashboard/courses/activity")}
									>
										<SiCoursera className="mb-1 me-1" size={18} /> Courses
									</Nav.Link>
								</div>
								<div>
									<Nav.Link
										className={`${styles.navLink}`}
										onClick={() => navigate("/dashboard/companies")}
									>
										<AiFillHome className="mb-1 me-1" size={18} /> Companies
									</Nav.Link>
								</div>
							</>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</>
		);
	} else {
		return (
			<>
				<Navbar
					className={`${styles.backgroundNavbarMenu} py-0 d-none d-lg-block`}
					variant="dark"
				>
					<Container>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse
							className={`${styles.navSection} d-flex justify-content-around`}
							id="basic-navbar-nav"
						>
							<>
								<div>
									<Nav.Link
										className={`${styles.navLink}`}
										onClick={() => navigate("/dashboard")}
									>
										<AiFillHome className="mb-1 me-1" size={18} /> Dashboard
									</Nav.Link>
								</div>
								<div>
									<Nav.Link
										className={`${styles.navLink}`}
										onClick={() => navigate("/dashboard/users")}
									>
										<AiOutlineUser className="mb-1 me-1" size={18} /> Users
									</Nav.Link>
								</div>
								<div>
									<Nav.Link
										className={`${styles.navLink}`}
										onClick={() => navigate("/dashboard/partners")}
									>
										<TiFlowSwitch className="mb-1 me-1" size={18} />
										Partners
									</Nav.Link>
								</div>
							</>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</>
		);
	}
};

const NavbarComponent = () => {
	const [token] = useState(localStorage.getItem("access_token"));
	const [username] = useState(localStorage.getItem("username"));
	const [role] = useState(localStorage.getItem("role"));
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			return navigate("/auth/login");
		}
	}, [token, navigate]);

	const handleLogout = (e) => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("username");
		localStorage.removeItem("role");
		navigate("/");
		e.preventDefault();
	};

	if (!!username) {
		return (
			<>
				<Navbar className={styles.navSection} bg="white" expand="lg">
					<Container>
						<Navbar.Brand href="#home">
							<h2 className="mb-0" style={{ color: "#6d8fff" }}>
								LESGO
							</h2>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="ms-auto">
								<NavDropdown
									title={
										<>
											<div className="d-inline">
												<img
													src={"https://via.placeholder.com/150"}
													alt=""
													className="me-1 rounded-circle"
													style={{ maxWidth: "28px" }}
												/>
												<p
													className={`${styles.fontUserStyle} mb-0 d-inline ms-2 me-1`}
												>
													{!username ? "" : username}
												</p>
											</div>
										</>
									}
									id="basic-nav-dropdown"
								>
									{Number(role) !== 1 ? (
										<>
											{" "}
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
											<NavDropdown.Item onClick={() => navigate("/dashboard")}>
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
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
				{!token ? " " : <NavbarMenu role={role} />}
			</>
		);
	} else {
		return <SpinnerComponent size={120} />;
	}
};

export default NavbarComponent;
