import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DropdownWrapper, DropdownMenu, DropdownButtonWrapper } from './ClickableDropdownStyles';
import Item from './Item';
import { useClickedOutside } from '../../hooks/useClickedOutside';
import { HeaderContext } from '../Header/Context';

interface ClickableDropdownProps {
	items: {
		title: string;
		href: string;
		children: {
			title: string;
			href: string;
		}[];
	}[];
}

const ClickableDropdown: React.FC<ClickableDropdownProps> = ({ items }) => {
	const { clickableDropdownShown, showClickableDropdown, hideClickableDropdown } =
		useContext(HeaderContext);
	const [visibleId, setVisibleId] = useState(-1);
	const prevScroll = useRef(0);
	const buttonRef = useRef<HTMLDivElement>(null);
	const clickedOut = useCallback(
		(e) => {
			if (buttonRef.current && buttonRef.current.contains(e.target)) return;
			if (!menuRef.current) return;
			// scrolling to where they currentlly are without the menu
			window.scrollTo({ top: window.scrollY - menuRef.current.offsetHeight - 287 });
			hideClickableDropdown();
		},
		[clickableDropdownShown],
	);
	const menuRef = useClickedOutside<HTMLMenuElement>(undefined, clickedOut);

	const menuClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (clickableDropdownShown) {
			window.scrollTo({ top: prevScroll.current });
			hideClickableDropdown();
		} else {
			prevScroll.current = window.scrollY;
			window.scrollTo({ top: 0 });
			showClickableDropdown();
		}
	};

	// hides menu if it unrenders
	useEffect(() => hideClickableDropdown, []);

	return (
		<>
			<div ref={buttonRef} onClick={menuClick} style={DropdownButtonWrapper}>
				<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
					<path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
				</svg>
			</div>
			{clickableDropdownShown && (
				<DropdownWrapper ref={menuRef} onClick={menuClick}>
					<menu style={DropdownMenu}>
						{items.map((item, index) => {
							return (
								<div key={index}>
									<Item
										item={item}
										currId={[visibleId, setVisibleId]}
										id={index}
									/>
								</div>
							);
						})}
					</menu>
				</DropdownWrapper>
			)}
		</>
	);
};

export default ClickableDropdown;
