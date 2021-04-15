import react, { useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';
import '../../styles/FoodPhoto/FoodPhoto.css';

// TODO ref here https://www.npmjs.com/package/react-camera-pro

const FoodPhoto = () => {
	const camera = useRef(null);
	const [image, setImage] = useState(null);

	return (
		<div>
			<Camera ref={camera} />
			<button onClick={() => setImage(camera.current.takePhoto())}>
				Take photo
			</button>
			<img src={image} alt='Taken photo' />
		</div>
	);
};

export default FoodPhoto;
