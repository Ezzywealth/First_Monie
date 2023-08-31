import Image from 'next/image';
import React from 'react';

const AdminMaintenancePage = () => {
	return (
		<div className='flex px-4 flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-center text-4xl font-bold mb-4'>Admin Dashboard Maintenance</h1>
			<Image
				src='/user_maintenance.svg' // Path to your image in the public directory
				alt='Maintenance Image'
				width={300}
				height={300}
				className='mb-4'
			/>
			<p className='text-lg mb-2 text-center'>We regret to inform you that the admin dashboard is currently in need of maintenance.</p>
			<p className='text-lg mb-2 text-center'>This is due to essential updates required to improve the performance and security of the system.</p>
			<p className='text-lg mb-2 text-center'>Please contact your developer for further information and assistance.</p>
		</div>
	);
};

export default AdminMaintenancePage;
