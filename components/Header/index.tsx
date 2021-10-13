import React from 'react';
import ContextProvider from './Context';
import HeaderComponent from './Header';

const Header = () => (
	<ContextProvider>
		<HeaderComponent />
	</ContextProvider>
);

export default Header;
