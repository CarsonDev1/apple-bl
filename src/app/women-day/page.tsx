'use client';
import React, { useEffect, useRef, useState } from 'react';
import BgWomen from '../../../public/women-day/bg-women.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import './women-day.scss';
import 'swiper/css';
import Banner from '@/components/WomenDay/banner';
import ProductList from '@/components/WomenDay/product';
import AppleList from '@/components/WomenDay/apple';

const categories = [
	{ id: 'item-iphone', name: 'iPhone' },
	{ id: 'item-ipad', name: 'iPad' },
	{ id: 'item-airpods', name: 'Samsung' },
	{ id: 'item-mac', name: 'Mac' },
	{ id: 'item-watch', name: 'Watch' },
];

const WomenDay = () => {
	const categoryRef = useRef(null);
	const [isStickyVisible, setIsStickyVisible] = useState(false);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const scrollThreshold = 500;

	const handleClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			setActiveCategory(id);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			setIsStickyVisible(window.scrollY > scrollThreshold);
		};

		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveCategory(entry.target.id);
					}
				});
			},
			{ root: null, threshold: 0.1 }
		);

		const observeSections = () => {
			categories.forEach((category) => {
				const element = document.getElementById(category.id);
				if (element) {
					sectionObserver.observe(element);
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		const timeoutId = setTimeout(observeSections, 0);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(timeoutId);
			categories.forEach((category) => {
				const element = document.getElementById(category.id);
				if (element) {
					sectionObserver.unobserve(element);
				}
			});
		};
	}, []);
	return (
		<div className='women-day'>
			<Image src={BgWomen} alt='bg-women' className='bg-women' />
			<Banner />
			<div id='item-iphone'>
				<ProductList />
			</div>
			<div id='item-ipad'>
				<AppleList />
			</div>

			<div className='rose' />
			<div className='rose' />
			<div className='rose' />
			<div className='rose' />
			<div className='rose' />
			<div className='rose' />
			<div className='rose' />
			<div className='rose' />
			<div className='rose' />
			<div className='rose' />

			<div className={`sticky-category ${isStickyVisible ? 'visible' : 'hidden'}`}>
				<div className='category-desktop'>
					{categories.map((category, index) => (
						<div
							key={index}
							className={`category-item ${activeCategory === category.id ? 'active' : 'default'}`}
							onClick={() => handleClick(category.id)}
						>
							<span className='category-name'>{category.name}</span>
						</div>
					))}
				</div>
				<div className='category-mobile'>
					<Swiper
						spaceBetween={10}
						breakpoints={{
							300: {
								slidesPerView: 4,
							},
							1400: {
								slidesPerView: 5,
							},
						}}
						slidesPerView='auto'
					>
						{categories.map((category, index) => (
							<SwiperSlide key={index}>
								<div
									className={`swiper-slide ${activeCategory === category.id ? 'active' : 'default'}`}
									onClick={() => handleClick(category.id)}
								>
									{category.name}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default WomenDay;
