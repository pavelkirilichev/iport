import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
import { useAsyncError, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { goods } from "../data/GoodsJSON";
import NewArrayByCount from "../Services/Array";
import strCut from "../Services/StrCutLimits";
import AddToCart from "../components/AddToCart";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
const cookies = new Cookies();

function Tkani(props) {
	const params = useParams();
	const [backData, setBackData] = useState();
	const location = useLocation();
	const [category, setCategory] = useState(location.state?.category);
	const [sortDirection, setSortDirection] = useState("up");
	const [cartData, setCartData] = useState("initial");
	const [cartPrice, setCartPrice] = useState(0);

	const [pullMenuMob, setPullMenuMob] = useState("");
	const [pull, setPull] = useState("");
	const [arrayCount, setArrayCount] = useState(NewArrayByCount(goods));

	const [cartCount, setCartCount] = useState(0);
	if (cookies.get("id")) {
		fetch("/getUserByID")
			.then((response) => response.json())
			.then((data) => {
				setCartCount(data.cart.split(", ").length - 1);
			});
	} else {
		if (cookies.get("cart")) {
			setTimeout(() => {
				if (cartCount == 0)
					setCartCount(cookies.get("cart").split("_").length - 1);
			}, 1);
		}
	}

	const categoryData = {
		category: params.category,
	};
	const [checkData, setCheckData] = useState(0);
	if (sortDirection == "up") {
		if (typeof backData == "undefined" && cartData == "initial") {
			fetch("/goodsCategory", {
				method: "POST",
				body: JSON.stringify(categoryData),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setBackData(data);
				});
		}
	} else {
		if (checkData == 0) {
			console.log("yes");
			fetch("/goodsCategoryDesc", {
				method: "POST",
				body: JSON.stringify(categoryData),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setBackData(data);
					setCheckData(1);
				});
		}
	}
	if (cartData == "initial" && typeof backData == "undefined") {
		console.log("test");
		fetch("/cart")
			.then((response) => response.json())
			.then((data) => {
				setCartData(data);
				let cart_summ = 0;
				data.map((good) => {
					cart_summ += good.price * good.count;
				});
				setCartPrice(cart_summ);
			});
	}

	const searchRef = useRef();
	return (
		<div className='wrapper'>
			<Header
				cartPrice={typeof cartPrice == "undefined" ? "" : cartPrice}
				pull={pull}
				setPull={setPull}
				pullMenuMob={pullMenuMob}
				setPullMenuMob={setPullMenuMob}
				route={"tkani"}
				setCategory={setCategory}
				cartCount={cartCount}
				searchRef={searchRef}
				setBackData={setBackData}
				isSearch={1}
			/>

			<div
				className={
					pull == "" && pullMenuMob == ""
						? "tkani__main_section-active"
						: "tkani__main_section"
				}
			>
				<div className='tkani__container'>
					<div className='tkani__navigation'>
						<Link to={"/"}>
							<div className='tkani__navigation__back-btn'>Назад</div>
						</Link>
						<ul className='tkani__navigation__chapter-list'>
							<li className='tkani__navigation__chapter__item'>Каталог</li>
							<li className='tkani__navigation__chapter__item'>Техника</li>
							<li className='tkani__navigation__chapter__item'>
								{params.category}
							</li>
						</ul>
					</div>
					<div className='tkani__main'>
						<div className='tkani__main__sidebar'>
							<div className='tkani__main__sidebar__filter'>
								<span className='tkani__filter__title'>Фильтры</span>
								<div className='tkani__filter__list'>
									<div className='tkani__filter__item'>
										<span className='tkani__filter__item__title'>
											Основной цвет
										</span>
										<div className='tkani__filter__item__inner'>
											<div className='tkani__filter__item__inner-flex'>
												<div className='tkani__filter__item__inner-left'>
													<label className='tkani__filter__item__inner__label'>
														<input
															type='checkbox'
															className='tkani__filter__item__inner__check__input'
														/>
														<div className='tkani__filter__item__inner__check__box'></div>
														<span className='tkani__filter__item__inner__label__text'>
															белое
														</span>
													</label>
													<label className='tkani__filter__item__inner__label'>
														<input
															type='checkbox'
															className='tkani__filter__item__inner__check__input'
														/>
														<div className='tkani__filter__item__inner__check__box'></div>
														<span className='tkani__filter__item__inner__label__text'>
															красное
														</span>
													</label>
												</div>
												<div className='tkani__filter__item__inner-right'>
													<label className='tkani__filter__item__inner__label'>
														<input
															type='checkbox'
															className='tkani__filter__item__inner__check__input'
														/>
														<div className='tkani__filter__item__inner__check__box'></div>
														<span className='tkani__filter__item__inner__label__text'>
															чёрное
														</span>
													</label>
													<label className='tkani__filter__item__inner__label'>
														<input
															type='checkbox'
															className='tkani__filter__item__inner__check__input'
														/>
														<div className='tkani__filter__item__inner__check__box'></div>
														<span className='tkani__filter__item__inner__label__text'>
															синее
														</span>
													</label>
												</div>
											</div>
											<img
												src='../images/tkani/down_icon.png'
												className='tkani__filter__item__down'
											/>
										</div>
									</div>
									<div className='tkani__filter__item'>
										<span className='tkani__filter__item__title'>Цвет</span>
										<div className='tkani__filter__item__inner'>
											<div className='tkani__filter__item__inner-flex'>
												<div className='tkani__filter__item__inner-left'>
													<label className='tkani__filter__item__inner__label'>
														<input
															type='checkbox'
															className='tkani__filter__item__inner__check__input'
														/>
														<div className='tkani__filter__item__inner__check__box'></div>
														<span className='tkani__filter__item__inner__label__text'>
															белое
														</span>
													</label>
													<label className='tkani__filter__item__inner__label'>
														<input
															type='checkbox'
															className='tkani__filter__item__inner__check__input'
														/>
														<div className='tkani__filter__item__inner__check__box'></div>
														<span className='tkani__filter__item__inner__label__text'>
															красное
														</span>
													</label>
												</div>
												<div className='tkani__filter__item__inner-right'>
													<label className='tkani__filter__item__inner__label'>
														<input
															type='checkbox'
															className='tkani__filter__item__inner__check__input'
														/>
														<div className='tkani__filter__item__inner__check__box'></div>
														<span className='tkani__filter__item__inner__label__text'>
															чёрное
														</span>
													</label>
													<label className='tkani__filter__item__inner__label'>
														<input
															type='checkbox'
															className='tkani__filter__item__inner__check__input'
														/>
														<div className='tkani__filter__item__inner__check__box'></div>
														<span className='tkani__filter__item__inner__label__text'>
															синее
														</span>
													</label>
												</div>
											</div>
											<img
												src='../images/tkani/down_icon.png'
												className='tkani__filter__item__down'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='tkani__main__content'>
							<div
								className='tkani__main__sort'
								onClick={() => {
									setSortDirection(sortDirection == "up" ? "down" : "up");
								}}
							>
								<span className='tkani__main__sort__text'>Сортировать по:</span>
								<span className='tkani__main__sort__text text-red'>
									{sortDirection == "up" ? "Цене ↑" : "Цене ↓"}
								</span>
							</div>
							{typeof backData == "undefined"
								? ""
								: backData.map((good, key) => {
										let title = strCut(good.full_name, 50);
										return (
											<div className='home__goods__item'>
												<Link to={"/good/" + good.ID}>
													<div
														className='home__goods__item__image'
														style={{
															backgroundImage: `url(../images/good/goods_image/${
																good.images_name.split(", ")[0]
															}.webp)`,
														}}
													></div>
												</Link>
												<Link to={"/good/" + good.ID}>
													<div className='home__goods__item__info'>
														<div className='home__goods__item__price'>
															<span className='home__goods__item__price__title'>
																{good.price} ₽
															</span>
															<span className='home__goods__item__price__subtitle'>
																{good.old_price != 0
																	? `${good.old_price}₽`
																	: ""}
															</span>
														</div>
														<p className='home__goods__item__info__title'>
															{title}
														</p>
													</div>
												</Link>
												<div className='home__goods__item__bottom'>
													<div className='home__goods__item__bottom__left'>
														<img
															src='../images/home/minus_icon.svg'
															onClick={() => {
																let copy = Object.assign([], arrayCount);
																let index = key;
																if (copy[index] > 0) {
																	copy[index] -= 1;
																}
																setArrayCount(copy);
															}}
														/>
														<span>{arrayCount[key]}</span>
														<img
															src='../images/home/plus_icon.svg'
															onClick={() => {
																let copy = Object.assign([], arrayCount);
																let index = key;
																copy[index] += 1;
																setArrayCount(copy);
															}}
														/>
													</div>
													<img
														src='../images/home/cart.svg'
														onClick={() => {
															if (arrayCount[key] > 0) {
																if (cartCount != 0) {
																	//setCartCount(cartCount + 1);
																}
																AddToCart(
																	good.ID,
																	arrayCount[key],
																	setCartCount,
																);
																setCartPrice(
																	cartPrice + good.price * arrayCount[key],
																);
																//window.location.reload();
															}
														}}
													/>
												</div>
											</div>
										);
								  })}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Tkani;
