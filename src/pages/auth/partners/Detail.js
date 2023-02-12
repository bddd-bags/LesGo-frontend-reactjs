import React, { useState } from "react";
import styles from "./index.module.css";
import { AiOutlineLeftCircle } from "react-icons/ai";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Detail = (link) => {
	const [article] = useState({
		title: "RoboCup 2014, Turnamen Olahraga Para Robot",
		user: { username: "bagas" },
		category: { name: "Sepak Bola" },
		description:
			"RoboCup 2014 merupakan event tahunan yang menghadirkan robot humanoid, menyerupai manusia. Tahun ini, kompetisi robot ini digelar di Brasil dan menampilkan pertandingan sepakbola. Dilansir Mashable, Rabu (23/7/2014), RoboCup diluncurkan sejak 1997, menghadirkan tim sepakbola robot. Pertandingan sepakbola robot ini digelar mulai 21 sampai 25 Juli 2014. RoboCup 2014 diselenggarkan di João Pessoa, Brazil. Tim dari 45 negara hadir pada kompetisi tahunan tersebut. Konon, robot ini akan terus dikembangkan dan nantinya akan bertanding melawan tim yang menang Piala Dunia 2050. Liga robot humanoid ini memamerkan kemampuan robot yang dapat berdiri seimbang, dan menggerakan anggota tubuhnya untuk berinteraksi dengan bola. Pertandingan sepakbola robot ini dibatasi dengan waktu 10 menit. Tim robot akan tampil dengan kategori yang berbeda-beda. Robot bisa dibagi ke dalam ukuran robot anak-anak, remaja dan seukuran dewasa.",
	});
	return (
		<>
			<div className={`${styles.detailRoot} container`}>
				<div
					className={`mt-4 ${styles.sectionArticle}`}
					style={{ minHeight: "80vh" }}
				>
					<div className={`py-3`}>
						<h1>{article.title}</h1>
						<div className="text-muted d-flex justify-content-between py-2">
							<p className="text-lowercase">
								{!article.user ? "" : article.user.username}
								<span className="fw-bold mx-2">&#183;</span>
								created
							</p>
							<p>{!article.category ? "" : article.category.name}</p>
						</div>
						<img
							src={`https://via.placeholder.com/1000x800`}
							alt="img"
							style={{
								maxHeight: "480px",
								objectFit: "cover",
								objectPosition: "center",
							}}
							className="w-100 mb-3"
						/>
						<div
							className={`py-3 ${styles.textJustify}`}
							style={{ textIndent: "50px" }}
						>
							<p style={{ letterSpacing: "0.7px" }}>{article.description}</p>
						</div>
						<div className={`mb-3 pb-4`}>
							<h6>Courses</h6>
							<Table responsive hover size="sm">
								<tbody>
									<tr className={styles.tbody}>
										<td>UI/UX Designer</td>
										<td>Flutter Bootcamp</td>
									</tr>
									<tr className={styles.tbody}>
										<td>Backend Developer</td>
										<td>Frontend Developer</td>
									</tr>
								</tbody>
							</Table>
						</div>
						<div className="d-flex">
							<Link to={link} style={{ textDecoration: "none" }}>
								<p className="d-flex align-items-center">
									<span className="me-2">
										<AiOutlineLeftCircle size={25} />
									</span>
									<span style={{ borderBottom: "1px solid blue" }}>Back</span>
								</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Detail;
