import Image from 'next/image';
import React from 'react';
import './promotion.scss';
import Link from 'next/link';

const Promotion = () => {
	return (
		<div className='promotion'>
			<div className='container'>
				<div className='promotion-header'>4 đặc quyền mua hàng tại Bạch Long Mobile</div>
				<div className='promotion-list'>
					<div className='promotion-list-item promotion-list-item-1'>
						<Image src='/apple/privilege-icon-01.png' alt='privilege-icon-01' width={270} height={117} />
						<p className='promotion-text'>
							Vòng quay may mắn <br /> Lì xì Tết Apple
						</p>
					</div>
					<div className='promotion-list-item promotion-list-item-2'>
						<Image src='/apple/privilege-icon-02.png' alt='privilege-icon-02' width={270} height={117} />
						<p className='promotion-text'>
							Trả góp <br /> lãi suất 0%
						</p>
					</div>
					<div className='promotion-list-item promotion-list-item-3'>
						<Image src='/apple/privilege-icon-03.png' alt='privilege-icon-03' width={270} height={117} />
						<p className='promotion-text'>
							Thu cũ <br /> đổi mới
						</p>
					</div>
					<div className='promotion-list-item promotion-list-item-4'>
						<Image src='/apple/privilege-icon-04.png' alt='privilege-icon-04' width={270} height={117} />
						<p className='promotion-text'>
							Ngày đổi trả <br /> miễn phí
						</p>
					</div>
				</div>
				<div className='promotion-wrap'>
					<video width='612' height='240' controls preload='none'>
						<source src='/apple/video-apple-01.mp4' type='video/mp4' />
					</video>
					<video width='612' height='240' controls preload='none'>
						<source src='/apple/video-apple-02.mp4' type='video/mp4' />
					</video>
				</div>

				<div className='promotion-header'>Ưu đãi trả góp siêu hời</div>
				<div className='promotion-list'>
					<Link href='https://bachlongmobile.com/news/tin-cong-nghe/cung-mpos-x-bach-long-mobile-so-huu-iphone-16-series-gia-tot-qua-tang-khung/'>
						<Image src='/apple/promotion-01.webp' alt='promotion-01' width={270} height={117} />
					</Link>
					<Link href='https://bachlongmobile.com/promotion/home-pay-later/'>
						<Image src='/apple/promotion-02.webp' alt='promotion-02' width={270} height={117} />
					</Link>
					<Link href='https://bachlongmobile.com/promotion/tra-gop-kredivo/'>
						<Image src='/apple/promotion-03.webp' alt='promotion-03' width={270} height={117} />
					</Link>
					<Link href='https://bachlongmobile.com/tra-gop-muadee/'>
						<Image src='/apple/promotion-04.webp' alt='promotion-04' width={270} height={117} />
					</Link>
					<Link href='https://bachlongmobile.com/promotion/tra-gop-tai-chinh/'>
						<Image src='/apple/promotion-05.webp' alt='promotion-05' width={270} height={117} />
					</Link>
					<Link href='https://bachlongmobile.com/promotion/tra-gop-tai-chinh/'>
						<Image src='/apple/promotion-06.webp' alt='promotion-06' width={270} height={117} />
					</Link>
					<Link href='https://bachlongmobile.com/promotion/tra-gop-tai-chinh/'>
						<Image src='/apple/promotion-07.webp' alt='promotion-07' width={270} height={117} />
					</Link>
					<Link href='https://bachlongmobile.com/promotion/tra-gop-tai-chinh/'>
						<Image src='/apple/promotion-08.webp' alt='promotion-08' width={270} height={117} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Promotion;
