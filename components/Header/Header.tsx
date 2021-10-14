import React, { useCallback, useContext, useEffect } from 'react';
import { HeaderWrapper, LogoWrapper } from './HeaderStyles';
import ClickableDropdown from '../ClickableDropdown';
import { useHidingHeader } from '../../hooks/useHidingHeader';
import Icicles from '../Icicles';
import Link from 'next/link';
import { HeaderContext } from './Context';
import { colors } from '@/styles/colors';

const Header: React.FC = () => {
	const { showHeader, clickableDropdownShown } = useContext(HeaderContext);
	const showHeaderCB = useCallback(() => {
		if (!clickableDropdownShown) {
			showHeader();
			return true;
		}
		return false;
	}, [clickableDropdownShown]);
	const hideHeaderCB = useCallback(() => {
		if (!clickableDropdownShown) {
			return true;
		}
		return false;
	}, [clickableDropdownShown]);
	const { headerRef } = useHidingHeader(showHeaderCB, hideHeaderCB);

	useEffect(() => {
		if (headerRef.current === null) return;
		if (clickableDropdownShown) {
			headerRef.current.style.position = 'relative';
			headerRef.current.style.boxShadow = '0px 0px 0px 0px';
		} else {
			headerRef.current.style.position = 'fixed';
			headerRef.current.style.boxShadow = '';
		}
	}, [clickableDropdownShown, headerRef]);

	return (
		<>
			<HeaderWrapper ref={headerRef}>
				<LogoWrapper>
					<Link href='/' passHref>
						<a style={{ color: colors.secondary, margin: 0, fontSize: '3rem' }}>
							Scouting
						</a>
					</Link>
				</LogoWrapper>

				{/* Changes header based on window's width */}
				<>
					<ClickableDropdown
						items={[
							{
								title: 'Scouting',
								href: '/scouting',
								children: [],
							},
							{
								title: 'Login',
								href: '/login',
								children: []
							}
						]}
					/>
				</>
				<Icicles
					parentRef={headerRef}
					widthConstrains={{ max: 20, min: 15 }}
					heightConstrains={{ max: 100, min: 70 }}
					top='99%'
				/>
				<Icicles
					parentRef={headerRef}
					widthConstrains={{ max: 20, min: 15 }}
					heightConstrains={{ max: 100, min: 70 }}
					top='99%'
				/>
			</HeaderWrapper>
		</>
	);
};

export default Header;
