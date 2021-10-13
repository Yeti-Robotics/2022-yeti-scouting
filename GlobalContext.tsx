import React, { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext({
	windowDimensions: {
		width: 0,
		height: 0,
	},
});

const GlobalContextProvider: React.FC = ({ children }) => {
	const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

	const handleResize = () => {
		setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
	};

	useEffect(() => {
		setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return <GlobalContext.Provider value={{ windowDimensions }}>{children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
