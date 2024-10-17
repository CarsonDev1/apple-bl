import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './product.scss';
import DecorWomen from '../../../../public/women-day/decor-women-01.png';
import AccessWomen from '@/components/WomenDay/accessories20_10/acess-women';
import Access10k from '@/components/WomenDay/accessories20_10/acess-10k';
import Access110 from '@/components/WomenDay/accessories20_10/acess-110';
import Access210 from '@/components/WomenDay/accessories20_10/acess-210';
import Access310 from '@/components/WomenDay/accessories20_10/acess-310';
import Access20k from '@/components/WomenDay/accessories20_10/acess-20k';
import Access290 from '@/components/WomenDay/accessories20_10/acess-290';
import AccessTo210 from '@/components/WomenDay/accessories20_10/acess-to210';

const ProductList: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('iPhone 16');
	const [visibleCount, setVisibleCount] = useState<number>(10);

	const tabs = [
		{
			name: 'Phụ kiện phái nữ',
			component: <AccessWomen />,
		},
		{
			name: 'PHỤ KIỆN IPHONE TỪ 10K',
			component: <Access10k />,
		},
		{
			name: 'PHỤ KIỆN SAMSUNG GIÁ TỪ 20K',
			component: <Access20k />,
		},
		{
			name: 'PHỤ KIỆN Pin dự phòng GIÁ TỪ  210.000',
			component: <AccessTo210 />,
		},
		{
			name: 'PHỤ KIỆN IPHONE 13 series ĐỒNG GIÁ 110,000',
			component: <Access110 />,
		},
		{
			name: 'PHỤ KIỆN IPHONE 14 series ĐỒNG GIÁ 210,000',
			component: <Access210 />,
		},
		{
			name: 'PHỤ KIỆN CÓC /CÁP SẠC  ĐỒNG GIÁ 290.000',
			component: <Access290 />,
		},
		{
			name: 'PHỤ KIỆN IPHONE 15 series ĐỒNG GIÁ 310,000',
			component: <Access310 />,
		},
	];

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setVisibleCount(4);
			} else {
				setVisibleCount(10);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const loadMore = () => {
		setVisibleCount((prevCount) => prevCount + 5);
	};

	return (
		<div className='product-list' id='item-iphone'>
			<div className='upgrade-list'>
				<div className='container'>
					<div className='women-decor'>
						<Image
							src={DecorWomen}
							width={1400}
							height={1200}
							quality={100}
							priority
							alt='product-banner-01'
							sizes='(max-width: 768px) 100vw, (min-width: 768px) 50vw, (min-width: 1200px) 33vw'
						/>
					</div>
					<div className='tabs-grid'>
						{tabs.map((tab) => (
							<div key={tab.name}>
								<button
									onClick={() => {
										setActiveTab(tab.name);
									}}
									className={activeTab === tab.name ? 'tab active' : 'tab'}
									style={{
										color: activeTab === tab.name ? '#fff' : '#333',
										backgroundColor: activeTab === tab.name ? '#ff4d4f' : '#fff',
										border: activeTab === tab.name ? '2px solid #ff4d4f' : '2px solid #eee',
										margin: '8px',
										borderRadius: '8px',
										cursor: 'pointer',
										transition: 'all 0.3s ease',
										boxShadow: activeTab === tab.name ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
									}}
								>
									{tab.name}
								</button>
							</div>
						))}
					</div>

					<div>{tabs.find((tab) => tab.name === activeTab)?.component}</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
