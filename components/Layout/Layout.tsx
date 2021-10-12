import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import PageContainer from '../PageContainer';
import { MainContainer } from './LayoutStyles';

interface LayoutProps {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	title: string;
	description?: string;
	image?: string;
	article?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, style, title, description, image, article }) => {
	return (
		<>
			<PageContainer>
				<Header />
				<MainContainer style={style}>{children}</MainContainer>
				<Footer />
			</PageContainer>
		</>
	);
};

Layout.defaultProps = {
	title: '',
	description: '',
	image: '',
};

export default Layout;
