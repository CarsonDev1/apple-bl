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
			<Image src='/apple/banner-apple.webp' alt='banner' width={1820} height={1400} />
			<div className='container'>
				<div className='banner-content'>
					<div className='banner-content-item'>
						<Image src='/apple/banner-item-01.webp' alt='banner-item-01' width={500} height={400} />
					</div>
					<div className='banner-content-item'>
						<Image src='/apple/banner-item-02.webp' alt='banner-item-02' width={500} height={400} />
					</div>
					<div className='banner-content-item'>
						<Image src='/apple/banner-item-03.webp' alt='banner-item-03' width={500} height={400} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
