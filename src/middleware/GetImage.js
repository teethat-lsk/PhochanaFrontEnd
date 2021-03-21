import apiClient from './ApiClient';
import defaultProfile from '../images/default_profile-01.jpg';

const GetImage = async (imageName) => {
	try {
		var config = {
			method: 'get',
			url: `/images/${imageName}`,
		};
		const res = await apiClient(config);
		if (res.data.status === 'success') return res.data.message;
		else return defaultProfile;
	} catch (error) {
		// console.log(error);
		return defaultProfile;
	}
};

export default GetImage;
