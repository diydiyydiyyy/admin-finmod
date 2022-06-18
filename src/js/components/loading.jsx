import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
	return (
		<Spinner
			animation="border"
			variant="primary"
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
			}}></Spinner>
	);
}

export default Loading;
