import Link from "next/link";

function FooterMob({ cartPrice }) {
	return (
		<div className='footer_mob'>
			<div className='nav-bottom__row-right__icon footer_mob__user__icon'>
				<img
					src='../images/header/user.svg'
					className='nav-bottom__row-right__icon-img'
				/>
			</div>
			<div className='footer_mob__menu'>
				<span>меню</span>
			</div>
			<div className='footer_mob__cart'>
				<img src='../images/header/cart.svg' />
				<span className='nav-bottom__cart-price footer_mob__price'>
					{cartPrice}₽
				</span>
			</div>
		</div>
	);
}

export default FooterMob;
