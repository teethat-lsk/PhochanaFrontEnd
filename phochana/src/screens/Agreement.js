import React from 'react';
import '../styles/Agreement.css';
import ScrollText from '../components/ScrollText';
import ButtonLink from '../components/ButtonLink';
import agreementText from '../config/agreement';

function Agreement() {
	return (
		<div className='agreement fade_effect'>
			<ScrollText h='calc(78% - 30px)' w='100%' className='agreement_text'>
				{agreementText}
			</ScrollText>
			<div className='agreement_button_zone'>
				<ButtonLink to='/register' height='70px'>
					ยอมรับ
				</ButtonLink>
				<ButtonLink
					to='/'
					height='70px'
					backgroundColor='transparent'
					fontSize='18px'
				>
					ปฏิเสธ
				</ButtonLink>
			</div>
		</div>
	);
}

export default Agreement;
