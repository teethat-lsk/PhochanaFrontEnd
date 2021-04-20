import react, { useState } from 'react';
import './fooddisplay.css';

const FoodDisplay = () => {
	const [menuItem, setMenuItem] = useState([
		['test1'],
		['test2'],
		['test3'],
		['test5'],
		['test6'],
		['test7'],
		['test8'],
	]);

	return (
		<div className='food_display_container'>
			<div className='menu_container'>
				{menuItem.map((item, key) => {
					return (
						<div className='menu_button noselect' key={key}>
							<div>{item[0]}</div>
						</div>
					);
				})}
			</div>
			<div className='menu_display'>Menu display here</div>
		</div>
	);
};

export default FoodDisplay;
