import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListPartner from '../../../components/listPartner';
import { Container } from 'react-bootstrap';
import Loading from '../../../components/loading';

function Partner() {
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
				<ListPartner />
			</div>
		</Container>
	);
}

export default Partner;
