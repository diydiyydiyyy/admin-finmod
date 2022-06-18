import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavCom from '../components/navcom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import WhyUs from '../pages/dashboard/whyus/index';
import CreateWhyUs from '../pages/dashboard/whyus/createWhyUs';
import EditWhyUs from '../pages/dashboard/whyus/editWhyUs';
import Partner from '../pages/dashboard/partner/index';
import CreatePartner from '../pages/dashboard/partner/createPartner';
import EditPartner from '../pages/dashboard/partner/editPartner';
import Subscription from '../pages/dashboard/subscription/index';

function App() {
	return (
		<>
			<BrowserRouter>
				<NavCom />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/whyus" element={<WhyUs />} />
					<Route path="/whyus/create-new" element={<CreateWhyUs />} />
					<Route path="/whyus/edit/:id" element={<EditWhyUs />} />
					<Route path="/partner/create-new" element={<CreatePartner />} />
					<Route path="/partner/edit/:id" element={<EditPartner />} />
					<Route path="/dashboard/partner" element={<Partner />} />
					<Route path="/dashboard/subscription" element={<Subscription />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
