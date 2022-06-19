import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Navbar,
	NavDropdown,
	Container,
	Offcanvas,
	Modal,
	Button,
} from 'react-bootstrap';
import '../../css/navcom.css';

function NavCom() {
	const username = localStorage.getItem('username');

	// Offcanvas
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Modal
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const navigate = useNavigate();
	const doLogout = () => {
		localStorage.clear();
		navigate('/');
		setShowModal(!showModal);
	};

	function returnNavbar() {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) {
				return <></>;
			} else if (localStorage.getItem('token')) {
				return (
					<>
						<Navbar>
							<Container>
								<div onClick={handleShow} className="me-4">
									<i className="bi bi-list" style={{ fontSize: '40px' }}></i>
								</div>
								<Link to="/dashboard">
									<Navbar.Brand>Finmod.id</Navbar.Brand>
								</Link>
								<Navbar.Collapse className="justify-content-end">
									<NavDropdown title={`${username}`}>
										<NavDropdown.Item onClick={handleShowModal}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</Navbar.Collapse>
							</Container>
						</Navbar>

						<Modal show={showModal} onHide={handleCloseModal}>
							<Modal.Header closeButton></Modal.Header>
							<Modal.Body>Are you sure want to logout?</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" onClick={handleCloseModal}>
									Close
								</Button>
								<Button variant="primary" onClick={doLogout}>
									Logout
								</Button>
							</Modal.Footer>
						</Modal>

						<Offcanvas placement="start" show={show} onHide={handleClose}>
							<Offcanvas.Header closeButton>
								<Link to="/dashboard">
									<Offcanvas.Title className="h2" onClick={handleClose}>
										Finmod.id
									</Offcanvas.Title>
								</Link>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Link to="/dashboard/whyus">
									<div className="menu-side" onClick={handleClose}>
										<div className="menus">
											<i
												className="bi bi-question-circle me-2"
												style={{ fontSize: '20px' }}></i>
											Why Us?
										</div>
									</div>
								</Link>
								<Link to="/dashboard/partner">
									<div className="menu-side" onClick={handleClose}>
										<div className="menus">
											<i
												className="bi bi-hand-thumbs-up-fill me-2"
												style={{ fontSize: '20px' }}></i>
											Partner
										</div>
									</div>
								</Link>
								<Link to="/dashboard/subscription">
									<div className="menu-side" onClick={handleClose}>
										<div className="menus">
											<i
												className="bi bi-envelope-fill me-2"
												style={{ fontSize: '20px' }}></i>
											Subscription
										</div>
									</div>
								</Link>
								<a
									href="https://finmod-app.vercel.app/"
									target="_blank"
									rel="noopener noreferrer">
									<div className="menu-side" onClick={handleClose}>
										<div className="menus">
											<i
												className="bi bi-link-45deg me-2"
												style={{ fontSize: '20px' }}></i>
											Landing Page
										</div>
									</div>
								</a>
							</Offcanvas.Body>
						</Offcanvas>
					</>
				);
			}
		}
	}

	return <>{returnNavbar()}</>;
}

export default NavCom;
