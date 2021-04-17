import React from 'react';

function ScrollText({ children, h, w }) {
	// console.log(children);
	return (
		<div
			style={{
				overflow: 'scroll',
				height: h,
				width: w,
				backgroundColor: '#fff',
				color: 'black',
				padding: '10px 20px',
			}}
		>
			<pre style={{ fontSize: '16px' }}>{children}</pre>
		</div>
	);
}

export default ScrollText;
