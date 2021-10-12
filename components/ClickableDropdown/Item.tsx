import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
	TitleWrapper,
	Title,
	ExpandButton,
	InteractiveWrapper,
	ChildrenMenu,
	Child,
} from './ClickableDropdownStyles';
import { colors } from '@/styles/colors';

interface ClickableDropDownItemProps {
	item: {
		title: string;
		href: string;
		children: {
			title: string;
			href: string;
		}[];
	};
	currId: [number, React.Dispatch<React.SetStateAction<number>>];
	id: number;
}

const ClickableDropdownItem: React.FC<ClickableDropDownItemProps> = ({ item, currId, id }) => {
	const [thisOpen, setThisOpen] = useState(false);
	const [opened, setOpened] = currId;
	const parentButtonRef = useRef<HTMLDivElement>(null);
	const isDonate = item.title === 'Donate';

	useEffect(() => {
		if (opened === id) setThisOpen(true);
		if (opened !== id) setThisOpen(false);
	}, [id, opened]);

	const handleOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
		if (!thisOpen) {
			setOpened(id);
			setThisOpen(true);
		} else if (thisOpen) {
			setThisOpen(false);
			setOpened(-1);
		}
	};

	//This adds the border over a dropdown when it's pages are active
	useLayoutEffect(() => {
		if (isDonate) return;
		if (!parentButtonRef.current) return;
		if (location.pathname === '/') return;
		const pathname = location.pathname.substring(1);
		const formattedPathname = '/' + pathname.slice(0, pathname.lastIndexOf('/'));
		if (item.href.includes(formattedPathname)) {
			parentButtonRef.current.style.backgroundColor = colors.primary;
			parentButtonRef.current.style.color = colors.secondary;
		} else {
			parentButtonRef.current.style.backgroundColor = colors.secondary;
			parentButtonRef.current.style.color = '#000000';
		}
	}, [item]);

	return (
		<>
			<TitleWrapper onClick={(e) => e.stopPropagation()}>
				<InteractiveWrapper
					ref={parentButtonRef}
					style={{
						backgroundColor: isDonate ? colors.primary : colors.secondary,
						color: isDonate ? colors.secondary : colors.primary,
					}}
				>
					<Link href={item.href} passHref>
						<Title>{item.title}</Title>
					</Link>
					{item.children.length ? (
						<ExpandButton onClick={handleOpen}>{thisOpen ? '-' : '+'}</ExpandButton>
					) : (
						<div style={{ height: 47 }} />
					)}
				</InteractiveWrapper>
				{thisOpen && (
					<ChildrenMenu>
						<div>
							{item.children.map((child, index) => (
								<div key={index}>
									<Link href={child.href} passHref>
										<Child onClick={(e) => e.stopPropagation()}>
											{child.title}
										</Child>
									</Link>
								</div>
							))}
						</div>
					</ChildrenMenu>
				)}
			</TitleWrapper>
		</>
	);
};

export default ClickableDropdownItem;
