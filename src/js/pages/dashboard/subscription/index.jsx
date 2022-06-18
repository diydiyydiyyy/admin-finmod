import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Loading from '../../../components/loading';
import ListSubscription from '../../../components/listSubscription';

function Subscription() {
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

	if (!isValid) {
		return <Loading />;
	}

	return (
		<Container className="mt-5 mb-7 d-flex justify-content-center align-items-center">
			<div className="col-7">
				<ListSubscription />
			</div>
		</Container>
	);
}

export default Subscription;
