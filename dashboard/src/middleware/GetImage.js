import apiClient from './ApiClient';
import defaultProfile from './images/ข้าวมันไก่.jpg';

const GetImage = async (imageName) => {
	if (typeof imageName === 'undefined') {
		return defaultProfile;
	}
	try {
		var config = {
			method: 'get',
			url: `/images/${imageName}`,
		};
		const res = await apiClient(config);
		// console.log(res.data);
		if (res.data.status === 'success') return res.data.message;
		else return defaultProfile;
	} catch (error) {
		// console.log(error.message);
		return defaultProfile;
	}
};

export default GetImage;
