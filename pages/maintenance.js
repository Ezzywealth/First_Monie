import Image from 'next/image';
import React from 'react';

const MaintenancePage = () => {
	return (
		<div className='flex px-4 flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold mb-4 text-center'>Site Under Maintenance</h1>
			<Image
				src='/user_maintenance.svg' // Path to your image in the public directory
				alt='Maintenance Image'
				width={300}
				height={300}
				className='mb-4'
			/>
			<p className='text-lg mb-2  text-center'>We apologize for the inconvenience, but the site is currently undergoing maintenance.</p>
			<p className='text-lg  text-center'>Please check back later. Thank you for your patience!</p>
		</div>
	);
};

export default MaintenancePage;
