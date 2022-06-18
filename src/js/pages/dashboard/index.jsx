import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import admin from '../../../assets/Startup life-pana 2.png';

function Dashboard() {
	const [isValid, setIsValid] = useState(false);
	const [username, setUsername] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) {
				navigate('/');
			} else {
				setUsername(localStorage.getItem('username'));
				setIsValid(true);
			}
		}
	}, []);

	if (!isValid) {
		return <Loading />;
	}

	return (
		<div className="d-flex justify-content-around align-items-center">
			<div>
				<h1>Welcome back {username}!</h1>
				<h3>Have a happy working day..</h3>
			</div>

			<img src={admin} alt="admin" />
		</div>
	);
}

export default Dashboard;
