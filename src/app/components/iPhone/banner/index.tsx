'use client';
import React from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './banner.scss';

const Banner: React.FC = () => {
	return (
		<div className='banner'>
			<div className='container'>
				<Image src='/apple/banner-apple.png' alt='banner' width={1820} height={1400} />
				<div className='banner-content'>
					<div className='banner-content-item'>
						<Image src='/apple/banner-item-01.webp' alt='banner-item-01' width={310} height={87} />
					</div>
					<div className='banner-content-item'>
						<Image src='/apple/banner-item-02.webp' alt='banner-item-02' width={310} height={87} />
					</div>
					<div className='banner-content-item'>
						<Image src='/apple/banner-item-03.webp' alt='banner-item-03' width={310} height={87} />
					</div>
				</div>
				<div className='banner-button-list'>
					<button className='banner-button-item'>GIỜ VÀNG GIÁ SỐC</button>
					<button className='banner-button-item'>IPHONE</button>
					<button className='banner-button-item'>IPAD</button>
					<button className='banner-button-item'>MACBOOK</button>
					<button className='banner-button-item'>WATCH</button>
					<button className='banner-button-item'>AIRPODS | PK</button>
				</div>
			</div>
		</div>
	);
};

export default Banner;
