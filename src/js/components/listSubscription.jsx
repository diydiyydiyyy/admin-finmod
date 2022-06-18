import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { CSVLink } from 'react-csv';

function ListSubscription() {
	const [subscription, setSubscription] = useState([]);

	useEffect(() => {
		getAllSubscription();
	}, []);

	const [headers] = useState([
		{ label: 'No.', key: 'id' },
		{ label: 'Email', key: 'email' },
		{ label: 'Message', key: 'message' },
		{ label: 'Date Create', key: 'createdAt' },
		{ label: 'Date Update', key: 'updatedAt' },
	]);

	const getAllSubscription = async () => {
		const urlApi = 'https://finmod-server-api.herokuapp.com/subscription';
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await axios.get(urlApi, config);
		setSubscription(response.data);
		console.log(subscription);
	};

	const deleteSubscription = async (id) => {
		const urlApi = `https://finmod-server-api.herokuapp.com/subscription/${id}`;
		try {
			await axios.delete(urlApi);
			getAllSubscription();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="d-flex flex-column">
			<div className="d-flex justify-content-between align-items-center mb-2">
				<h3>List of Subscription</h3>

				{!subscription[0] ? (
					<></>
				) : (
					subscription?.length && (
						<CSVLink
							filename="subscription-findmod.csv"
							data={subscription}
							headers={headers}>
							<Button>
								<i className="bi bi-file-earmark-spreadsheet"></i> Export to CSV
							</Button>
						</CSVLink>
					)
				)}
			</div>

			<Table striped bordered hover responsive className="overflow-visible">
				<thead>
					<tr>
						<th>Date</th>
						<th>Email</th>
						<th>Message</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{!subscription[0] ? (
						<tr>
							<td colSpan={4} className="text-center py-5">
								Nothing record to display
							</td>
						</tr>
					) : (
						subscription.map((el, i) => (
							<tr key={i}>
								<td>{moment(el.createdAt).format('DD-MM-YYYY HH:MM')}</td>
								<td>{el.email}</td>
								<td>{el.message}</td>
								<td>
									<Button onClick={() => deleteSubscription(el.id)}>
										<i className="bi bi-trash"></i>
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</div>
	);
}

export default ListSubscription;
