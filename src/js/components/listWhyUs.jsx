import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListWhyUs() {
	const [whyus, setWhyUs] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getAllWhyUs();
	}, []);

	const getAllWhyUs = async () => {
		setLoading(true);
		const urlApi = 'https://finmod-server-api.herokuapp.com/whyus';
		try {
			const response = await axios.get(urlApi);
			setWhyUs(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const deleteWhyUs = async (id) => {
		const urlApi = `https://finmod-server-api.herokuapp.com/whyus/${id}`;
		try {
			await axios.delete(urlApi);
			getAllWhyUs();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="d-flex flex-column">
			<div className="d-flex justify-content-between align-items-center mb-2">
				<h3>List of Why Us</h3>
				<Link to="/whyus/create-new">
					<Button>
						<i className="bi bi-plus-lg"></i> New
					</Button>
				</Link>
			</div>

			<Table striped bordered hover responsive className="overflow-visible">
				<thead>
					<tr>
						<th>Logo</th>
						<th>Title</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{!whyus[0] ? (
						<tr>
							<td colSpan={4} className="text-center py-5">
								{loading ? (
									<Spinner animation="border" variant="primary" />
								) : (
									<>Nothing record to display</>
								)}
							</td>
						</tr>
					) : (
						whyus.map((el, i) => (
							<tr key={i}>
								<td>
									<img src={el.url} alt="preview" width="50" height="50" />
								</td>
								<td>{el.title}</td>
								<td>{el.description}</td>
								<td>
									<div className="d-flex">
										<Link to={`/whyus/edit/${el.id}`}>
											<Button className="me-1">
												<i className="bi bi-pencil-square"></i>
											</Button>
										</Link>

										<Button onClick={() => deleteWhyUs(el.id)}>
											<i className="bi bi-trash"></i>
										</Button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</div>
	);
}

export default ListWhyUs;
