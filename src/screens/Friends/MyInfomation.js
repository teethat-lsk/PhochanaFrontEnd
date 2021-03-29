import react, { useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useHistory } from 'react-router-dom';
import apiClient from '../../middleware/ApiClient';
import HomeLogoImage from '../../images/logo_home.png';

import '../../styles/Friends/MyInfomation.css';

const MyInformation = () => {
	const [username, setUsername] = useState('Anonymous');
	const history = useHistory();

	useEffect(async () => {
		try {
			const config = {
				method: 'get',
				url: `/users/profile?username=me`,
			};
			const res = await apiClient(config);
			// console.log(res.data);
			if (res.data.status === 'success') {
				setUsername(res.data.message.user.username);
			}
		} catch (err) {}
	}, []);

	const downloadQR = () => {
		const canvas = document.getElementById('react-qrcode-logo');
		console.log(canvas);
		const pngUrl = canvas
			.toDataURL('image/png')
			.replace('image/png', 'image/octet-stream');
		let downloadLink = document.createElement('a');
		downloadLink.href = pngUrl;
		downloadLink.download = `${username}.png`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	return (
		<div className='my_info_container'>
			<QRCode
				value={`path/to/add/${username}`}
				logoImage={HomeLogoImage}
				size='200'
			/>
			<div className='my_info_username'>{username}</div>
			<div className='my_info_save' onClick={downloadQR}>
				บันทึก QRcode
			</div>
			<div className='my_info_close' onClick={() => history.goBack()}>
				ปิด
			</div>
		</div>
	);
};

export { MyInformation };
