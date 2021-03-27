import react from 'react';
import { MainHeaderContainer, MainFooterBox } from '../Main';
import '../../styles/Friends/FriendsView.css';

function FriendsView() {
	return (
		<div>
			<MainHeaderContainer title={'Friends'} right='friend' />

			<MainFooterBox />
		</div>
	);
}

export default FriendsView;
