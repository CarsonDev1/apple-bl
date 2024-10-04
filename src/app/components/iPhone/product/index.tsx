import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Spin } from 'antd';
import './product.scss';

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
			eq: 'Mjgx',
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

const ProductList: React.FC = () => {
	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ['productListData'],
		queryFn: fetchProductListData,
		staleTime: 300000,
	});

	const [activeTab, setActiveTab] = useState<string>('iPhone 16');
	const [filteredData, setFilteredData] = useState<Product[]>([]);
	const [visibleCount, setVisibleCount] = useState<number>(10);

	const tabs = ['iPhone 16', 'iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone 11'];

	useEffect(() => {
		// Filter products based on the active tab
		const filtered = data?.filter((product) => product.name.includes(activeTab));
		setFilteredData(filtered || []);

		// Adjust visible count based on window size
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setVisibleCount(4); // Show 4 items if screen width < 768px
			} else {
				setVisibleCount(10); // Show 10 items if screen width >= 768px
			}
		};

		handleResize(); // Initial check
		window.addEventListener('resize', handleResize); // Update count on resize

		return () => {
			window.removeEventListener('resize', handleResize); // Clean up the event listener
		};
	}, [data, activeTab]);

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

	// Show only the products up to the visibleCount
	const visibleProducts = filteredData.slice(0, visibleCount);

	const loadMore = () => {
		setVisibleCount((prevCount) => prevCount + 5); // Show 5 more items on click
	};

	return (
		<div className='product-list'>
			<div className='upgrade-list'>
				<div className='container'>
					<Image
						src='/apple/product-banner-01.png'
						width={1820}
						height={1200}
						alt='product-banner-01'
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
						{visibleProducts.map((product, index) => (
							<Link
								key={index}
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
					{visibleCount < filteredData.length && (
						<div
							style={{
								textAlign: 'center',
								marginTop: '20px',
							}}
						>
							<button
								onClick={loadMore}
								style={{
									backgroundColor: '#ef373e',
									color: 'white',
									border: 'none',
									padding: '10px 20px',
									borderRadius: '5px',
									cursor: 'pointer',
								}}
							>
								Xem thêm
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
