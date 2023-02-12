import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { VscGithubInverted, VscTwitter } from "react-icons/vsc";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillSlackCircle } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";

const Footer = () => {
	return (
		<>
			<footer id={`${styles.footer}`}>
				{/* <div className={`${styles.footerNewsLetter}`}>
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-6">
								<h4 className={`${styles.footerNewsLetterH4}`}>
									Join Our Newsletter
								</h4>
								<p>
									Tamen quem nulla quae legam multos aute sint culpa legam
									noster magna
								</p>
								<form
									className={styles.footerNewsLetterForm}
									action=""
									method="post"
								>
									<input type="email" name="email" />
									<input type="submit" value="Subscribe" />
								</form>
							</div>
						</div>
					</div>
				</div> */}

				<div className={`${styles.footerTop}`}>
					<div className="container">
						<div className="row">
							<div className={`col-lg-3 col-md-6 ${styles.footerContact}`}>
								<h3>LesGo</h3>
								<p>
									APL Tower 26th floor <br />
									Daerah Khusus Ibukota Jakarta 11470
									<br />
									Indonesia <br />
									<br />
									<strong>Phone:</strong> +62 81 2356 7891
									<br />
									<strong>Email:</strong> cs@lesgo.com
									<br />
								</p>
							</div>

							<div className={`col-lg-3 col-md-6 ${styles.footerLinks}`}>
								<h4>Useful Links</h4>
								<ul>
									<li>
										<i>
											<BsChevronRight size={13} className="mb-1 me-2" />
										</i>{" "}
										<Link to="#">Home</Link>
									</li>
									<li>
										<i>
											<BsChevronRight size={13} className="mb-1 me-2" />
										</i>{" "}
										<Link to="#">About us</Link>
									</li>
									<li>
										<i>
											<BsChevronRight size={13} className="mb-1 me-2" />
										</i>{" "}
										<Link to="#">Services</Link>
									</li>
									<li>
										<i>
											<BsChevronRight size={13} className="mb-1 me-2" />
										</i>{" "}
										<Link to="#">Terms of service</Link>
									</li>
									<li>
										<i>
											<BsChevronRight size={13} className="mb-1 me-2" />
										</i>{" "}
										<Link to="#">Privacy policy</Link>
									</li>
								</ul>
							</div>

							<div className={`col-lg-3 col-md-6 ${styles.footerLinks}`}>
								<h4>Our Services</h4>
								<ul>
									<li>
										<i>
											<BsChevronRight size={13} className="mb-1 me-2" />
										</i>{" "}
										<Link to="#">Courses</Link>
									</li>
									<li>
										<i>
											<BsChevronRight size={13} className="mb-1 me-2" />
										</i>{" "}
										<Link to="#">Partners</Link>
									</li>
								</ul>
							</div>

							<div className={`col-lg-3 col-md-6 ${styles.footerLinks}`}>
								<h4>Our Social Networks</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse egestas risus ut odio molestie, sed ornare lacus
									lobortis.
								</p>
								<div className={`${styles.socialLinks} mt-3`}>
									<Link to="#">
										<VscGithubInverted size={30} />
									</Link>
									<Link to="#">
										<VscTwitter size={30} />
									</Link>
									<Link to="#">
										<MdFacebook size={30} />
									</Link>
									<Link to="#">
										<AiFillInstagram size={30} />
									</Link>
									<Link to="#">
										<AiFillSlackCircle size={30} />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={`container ${styles.footerBottom} clearfix`}>
					<div className={styles.copyright}>
						&copy; Copyright{" "}
						<strong>
							<span>Final Project</span>
						</strong>
						. All Rights Reserved
					</div>
					<div className={styles.credits}>
						Development by <Link to="https://github.com/">Arsya</Link>{" "}
						<span>&</span> <Link to="https://github.com/">Bagas</Link>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
