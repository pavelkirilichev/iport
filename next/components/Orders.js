import { useState } from "react";
import MoreDetails from "./MoreDetails";

function Orders() {
	const [orders, setOrders] = useState();
	if (typeof orders == "undefined") {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/ordersAll`)
			.then((response) => response.json())
			.then((data) => {
				setOrders(data);
			});
	}

	const [MD, setMD] = useState("");
	if (typeof orders != "undefined") {
		return (
			<div className='cart__main__inner'>
				<div className='cart__main__header'>
					<span className='cart__main__header__title'>Заказы</span>
				</div>
				<div className='cart__main__content order__content'>
					<ul className='cart__main__content__list'>
						{orders.map((order, key) => {
							return (
								<div className='cart__main__content__item order__item'>
									<div className='order__left__info'>
										<span className='cart__main__content__item__num'>
											{key + 1}
										</span>
										<p className='order__title'>
											Ваш заказ <br />№{key + 1}
										</p>
									</div>

									<div className='cart__main__content__item__info order__info'>
										<div className='cart__main__content__item__info__content order__info__content'>
											<p>
												Номер заказа: <span>{order.ID}</span>
											</p>
											<p>
												Дата заказа: <span>{order.date}</span>
											</p>
											<p>
												Адрес заказа: <span>{order.adress}</span>
											</p>
										</div>
									</div>
									<span className='order__status__title'>{order.status}</span>
									<div className='order__itog__info'>
										<div
											className='order__itog__info__more-detail'
											onClick={() => {
												setTimeout(() => {
													setMD(" md_dark-active md_main-active");
												}, 100);
											}}
										>
											подробнее
										</div>
										<div className='order__itog__info__price'>
											<span className='order__itog__info__price__title'>
												сумма заказа
											</span>
											<span className='order__itog__info__price__count'>
												{order.summ}₽
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</ul>
				</div>
				<MoreDetails MD={MD} setMD={setMD} />
			</div>
		);
	}
}

export default Orders;
