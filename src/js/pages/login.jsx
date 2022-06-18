import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, FloatingLabel, Spinner } from 'react-bootstrap';
import axios from 'axios';
import '../../css/login.css';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [msg, setMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const doLogin = (e) => {
		e.preventDefault();
		setLoading(true);
		const urlApi = 'https://finmod-server-api.herokuapp.com/admin/login';
		const body = {
			email,
			password,
		};

		axios
			.post(urlApi, body)
			.then((response) => {
				if ({ response }) {
					console.log(response);
					localStorage.setItem('token', response.data.accessToken);
					localStorage.setItem('username', response.data.username);
					navigate('/dashboard');
				}
			})
			.catch((error) => {
				if (error.response) {
					setMsg(error.response.data.msg);
				}
			})
			.finally(() => setLoading(false));
	};

	function returnLogin() {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) {
				return (
					<form className="form-login col-5 centered" onSubmit={doLogin}>
						<h1>Admin Panel</h1>
						<h3 className="mb-5">Finmod.id</h3>
						<FloatingLabel
							controlId="floatingInput"
							label="Email address"
							className="mb-4 col-10">
							<Form.Control
								type="email"
								placeholder="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FloatingLabel>

						<FloatingLabel
							controlId="floatingPassword"
							label="Password"
							className="mb-4 col-10 text-center">
							<Form.Control
								type="password"
								placeholder="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FloatingLabel>

						{msg ? (
							<p className="mb-4" style={{ color: 'red' }}>
								<strong>{msg}</strong>
							</p>
						) : (
							<></>
						)}

						<Button
							type="submit"
							variant="primary"
							className="col-3 mb-3 text-center">
							{loading ? (
								<Spinner animation="border" variant="light" size="sm" />
							) : (
								<>Login</>
							)}
						</Button>
					</form>
				);
			} else if (localStorage.getItem('token')) {
				return (
					<form className="form-login col-5 centered h-50">
						<h1>You are logged in!</h1>
						<Link to="/dashboard">
							<Button type="submit" variant="primary">
								Return to dashboard
							</Button>
						</Link>
					</form>
				);
			}
		}
	}

	return (
		<div
			className="d-flex justify-content-center align-items-center container-login"
			style={{ backgroundColor: '#E5F6FD' }}>
			{returnLogin()}
		</div>
	);
}

export default Login;
