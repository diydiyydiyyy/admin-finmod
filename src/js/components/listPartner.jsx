import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListPartner() {
	const [partner, setPartner] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getAllPartner();
	}, []);

	const getAllPartner = async () => {
		setLoading(true);
		const urlApi = 'https://finmod-server-api.herokuapp.com/partner';
		try {
			const response = await axios.get(urlApi);
			setPartner(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const deletePartner = async (id) => {
		const urlApi = `https://finmod-server-api.herokuapp.com/partner/${id}`;
		try {
			await axios.delete(urlApi);
			getAllPartner();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="d-flex flex-column">
			<div className="d-flex justify-content-between align-items-center mb-2">
				<h3>List of Partner</h3>
				<Link to="/partner/create-new">
					<Button>
						<i className="bi bi-plus-lg"></i> New
					</Button>
				</Link>
			</div>

			<Table striped bordered hover responsive className="overflow-visible">
				<thead>
					<tr>
						<th>Logo</th>
						<th>Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{!partner[0] ? (
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
						partner.map((el, i) => (
							<tr key={i}>
								<td>
									<img src={el.url} alt="preview" width="70" height="auto" />
								</td>
								<td>{el.name}</td>
								<td>
									<div className="d-flex">
										<Link to={`/partner/edit/${el.id}`}>
											<Button className="me-1">
												<i className="bi bi-pencil-square"></i>
											</Button>
										</Link>

										<Button onClick={() => deletePartner(el.id)}>
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

export default ListPartner;
