import React from 'react';
import Image from 'next/image';

interface LoadingProps {
	width?: number;
	height?: number;
}

const Loading: React.FC<LoadingProps> = ({ width, height }) => {
	return <Image src='/spinner.svg' alt='loading spinner' width={width} height={height} />;
};

Loading.defaultProps = {
	width: 200,
	height: 200,
};

export default Loading;
