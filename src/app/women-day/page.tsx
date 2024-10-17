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
import Promotion from '@/components/WomenDay/promotion';
import Rules from '@/components/WomenDay/rules';
import ProductPercent from '@/components/WomenDay/99percent';
import AndroidList from '@/components/WomenDay/android';
import LaptopList from '@/components/WomenDay/laptop';
import ToyList from '@/components/WomenDay/toy';
import AccessoriesList from '@/components/WomenDay/accessories';

const categories = [
	{ id: 'item-iphone', name: 'Phụ kiện tặng nàng' },
	{ id: 'item-ipad', name: 'Apple' },
	{ id: 'item-airpods', name: 'Likenew 99%' },
	{ id: 'item-mac', name: 'Android' },
	{ id: 'item-watch', name: 'Laptop' },
];

const WomenDay = () => {
	const categoryRef = useRef(null);
	const [isStickyVisible, setIsStickyVisible] = useState(false);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const scrollThreshold = 500;

	const handleClick = (id: string, offset = 0) => {
		const element = document.getElementById(id);
		if (element) {
			const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
			setActiveCategory(id);
		}
	};

	const handleScrollToRules = () => {
		const customOffset = 300;
		handleClick('item-rules', customOffset);
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
			{/* <Image src={BgWomen} alt='bg-women' className='bg-women' /> */}
			<Banner onScrollToRules={handleScrollToRules} />
			<Promotion onScrollToRules={handleScrollToRules} />
			<div id='item-iphone'>
				<ProductList />
			</div>
			<div id='item-ipad'>
				<AppleList />
			</div>
			<div id='item-airpods'>
				<ProductPercent />
			</div>
			<div id='item-mac'>
				<AndroidList />
			</div>
			<div id='item-watch'>
				<LaptopList />
			</div>
			<div id='item-toy'>
				<ToyList />
			</div>
			<div id='item-accessories'>
				<AccessoriesList />
			</div>

			<div id='item-rules'>
				<Rules />
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
