import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import Loading from '../../../components/loading';
import axios from 'axios';

function CreateWhyUs() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [logo, setLogo] = useState('');
	const [msg, setMsg] = useState('');
	const [preview, setPreview] = useState('');
	const [loading, setLoading] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) {
				navigate('/');
			} else {
				setIsValid(true);
			}
		}
	}, []);

	const loadImage = (e) => {
		const image = e.target.files[0];
		setLogo(image);
		setPreview(URL.createObjectURL(image));
	};

	const createWhyUs = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('logo', logo);
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		};
		const urlApi = 'https://finmod-server-api.herokuapp.com/whyus/';

		try {
			await axios.post(urlApi, formData, config);
			navigate('/dashboard/whyus');
		} catch (error) {
			setMsg(error.response.data.msg);
		} finally {
			setLoading(false);
		}
	};

	if (!isValid) {
		return <Loading />;
	}

	return (
		<div className="centered mt-5">
			<form className="col-4" onSubmit={createWhyUs}>
				<h1 className="text-center mb-4">New Why Us</h1>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="formFile" className="mb-2">
					<Form.Label>Logo</Form.Label>
					<Form.Control type="file" onChange={loadImage} />
				</Form.Group>

				{preview ? (
					<div className="mb-4">
						<Card className="col-3">
							<Card.Header>Preview</Card.Header>
							<Card.Img variant="top" src={preview} />
						</Card>
					</div>
				) : (
					<></>
				)}

				{msg ? (
					<p className="mb-4" style={{ color: 'red' }}>
						<strong>{msg}</strong>
					</p>
				) : (
					<></>
				)}

				<div className="d-flex justify-content-center align-items-center">
					<div className="col-4 text-center me-1">
						<Link to="/dashboard/whyus">
							<Button className="col-6">Back</Button>
						</Link>
					</div>
					<div className="col-4 text-center">
						<Button type="submit" className="col-6">
							{loading ? (
								<Spinner animation="border" variant="light" size="sm" />
							) : (
								<> Create </>
							)}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default CreateWhyUs;
