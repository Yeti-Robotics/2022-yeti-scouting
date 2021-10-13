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
								title: 'About',
								href: '/about',
								children: [],
							},
							{
								title: 'Join Us',
								href: '/join-us',
								children: [],
							},
							{
								title: 'Outreach',
								href: '/outreach',
								children: [],
							},
							{
								title: 'Robots',
								href: '/robots',
								children: [
									{ title: 'Polaris 2019', href: '/robots/2019' },
									{ title: 'Avalanche 2018', href: '/robots/2018' },
									{ title: 'Permafrost 2017', href: '/robots/2017' },
									{ title: 'Black Ice 2016', href: '/robots/2016' },
									{ title: 'Frostbyte 2015', href: '/robots/2015' },
									{ title: 'Fluffy 2014', href: '/robots/2014' },
									{ title: 'Momo 2013', href: '/robots/2013' },
									{ title: 'Chompa 2012', href: '/robots/2012' },
									{ title: 'Wampa 2011', href: '/robots/2011' },
								],
							},
							{
								title: 'Mentors',
								href: '/mentors',
								children: [
									{
										title: 'Technical Mentors',
										href: '/mentors/tech-mentors',
									},
									{
										title: 'Business Mentors',
										href: '/mentors/business-mentors',
									},
								],
							},
							{
								title: 'Sponsors',
								href: '/sponsors',
								children: [],
							},
							{
								title: 'Contact',
								href: '/contact',
								children: [],
							},
							{
								title: 'Donate',
								href: 'https://paypal.com',
								children: [],
							},
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
