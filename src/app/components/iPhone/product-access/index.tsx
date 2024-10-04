'use client';
import React, { MutableRefObject, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Spin } from 'antd';
import './product-access.scss';

export interface Product {
	id: number;
	name: string;
	url_key: string;
	image: {
		url: string;
	};
	price_range: {
		minimum_price: {
			final_price: {
				value: number;
				currency: string;
			};
		};
	};
}

const query = `
 query getProducts(
  $search: String
  $filter: ProductAttributeFilterInput
  $sort: ProductAttributeSortInput
  $pageSize: Int
  $currentPage: Int
) {
  products(
    search: $search
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      ...ProductInterfaceField
    }
  }
}
fragment ProductInterfaceField on ProductInterface {
  id
  name
  url_key
  image {
    url
  }
  price_range {
    minimum_price {
      final_price {
        value
        currency
      }
    }
  }
}
`;

const variables = {
	filter: {
		category_uid: {
			eq: 'MTQ3',
		},
	},
	pageSize: 200,
	currentPage: 1,
};

async function fetchProductListData() {
	const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const data = await response.json();

	return data.data.products.items as Product[];
}

const ProductAccess: React.FC = () => {
	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ['productAccessData'],
		queryFn: fetchProductListData,
		staleTime: 300000,
	});

	const [activeTab, setActiveTab] = useState<string>('All');
	const [filteredData, setFilteredData] = useState<Product[]>([]);

	const tabs = ['All', 'Cường lực', 'Ốp lưng', 'AirPods', 'Magic Keyboard', 'Magic Mouse', 'Cáp sạc', 'Apple Pencil'];

	useEffect(() => {
		if (activeTab === 'All') {
			setFilteredData(data || []);
		} else {
			const filtered = data?.filter((product) => product.name.toLowerCase().includes(activeTab.toLowerCase()));
			setFilteredData(filtered || []);
		}
	}, [activeTab, data]);

	if (isLoading) {
		return (
			<div className='loading container-spin'>
				<Spin />
			</div>
		);
	}

	if (error) {
		return <div>Error loading data</div>;
	}

	const groupedProducts = [];
	for (let i = 0; i < filteredData.length; i += 2) {
		groupedProducts.push(filteredData.slice(i, i + 2));
	}

	return (
		<div className='product-list'>
			<div className='upgrade-list'>
				<div className='container'>
					<Image
						src='/apple/product-banner-06.png'
						width={1820}
						height={1200}
						alt='product-banner-06'
						className=''
					/>
					<div className='tabs'>
						{tabs.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={activeTab === tab ? 'tab active' : 'tab'}
								style={{
									color: activeTab === tab ? 'white' : '#000',
									backgroundColor: activeTab === tab ? '#ef373e' : '#f1f1f1',
									border: activeTab === tab ? '1px solid #ef373e' : '1px solid #ccc',
									padding: '10px 20px',
									margin: '5px',
									borderRadius: '5px',
									cursor: 'pointer',
								}}
							>
								{tab}
							</button>
						))}
					</div>
					<div className='upgrade'>
						<Swiper
							modules={[Navigation]}
							spaceBetween={20}
							slidesPerView={5}
							speed={1000}
							navigation
							breakpoints={{
								300: {
									slidesPerView: 1,
								},
								310: {
									slidesPerView: 2,
									spaceBetween: 10,
								},
								768: {
									slidesPerView: 3,
								},
								850: {
									slidesPerView: 4,
								},
								1200: {
									slidesPerView: 5,
								},
							}}
						>
							{groupedProducts.map((group, index) => (
								<SwiperSlide key={index}>
									<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
										{group.map((product, productIndex) => (
											<Link
												key={productIndex}
												href={`https://bachlongmobile.com/products/${product.url_key}`}
												passHref
												target='_blank'
												rel='noopener noreferrer'
												style={{ textDecoration: 'none', color: 'black' }}
											>
												<div className='upgrade-item'>
													<div className='upgrade-item-img'>
														<Image
															src={product.image.url}
															width={1400}
															height={1200}
															quality={100}
															alt={`product-${index}`}
														/>
													</div>
													<div className='upgrade-item-content'>
														<h4 className='upgrade-item-content-tt'>{product.name}</h4>
														<div className='upgrade-item-content-body'>
															<span className='upgrade-item-content-body-tt'>Giá: </span>
															<div className='upgrade-item-content-body-price'>
																{product.price_range.minimum_price.final_price.value.toLocaleString(
																	'vi-VN'
																)}{' '}
																{product.price_range.minimum_price.final_price.currency}
															</div>
														</div>
													</div>
												</div>
											</Link>
										))}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductAccess;
