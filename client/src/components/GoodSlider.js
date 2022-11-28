import { useState } from "react";

function GoodSlider({
	goodSlider,
	setGoodSlider,
	image_arr,
	img,
	setImg,
	backData,
}) {
	if (typeof backData != "undefined") {
		return (
			<div className={"goodSlider" + goodSlider}>
				<div className='good__main__image__sidebar goodSlider__sidebar'>
					<img
						src='../images/good/slider_up.svg'
						onClick={() => {
							if (img == 0) {
								setImg(image_arr.length - 1);
							} else {
								setImg(img - 1);
							}
						}}
					/>
					<div className='good__main__image__sidebar__slider'>
						{image_arr.map((item, key) => {
							return (
								<div className='good__main__image__sidebar__slider__item'>
									{key == img ? (
										<div className='good__main__slider__img-active GoodSlider__item-active'></div>
									) : (
										""
									)}
									<div
										className='good__main__slider__img size_120'
										style={{
											backgroundImage: `url(../images/good/goods_image/${backData.images_name})`,
										}}
									></div>
								</div>
							);
						})}
					</div>
					<img
						src='../images/good/slider_down.svg'
						onClick={() => {
							if (img == image_arr.length - 1) {
								setImg(0);
							} else {
								setImg(img + 1);
							}
						}}
					/>
				</div>
				<div
					className='goodSlider__image'
					style={{
						backgroundImage: `url(../images/good/goods_image/${backData.images_name})`,
					}}
				>
					<img
						src='../images/cart/close_icon.png'
						className='md__main__close-icon'
						onClick={() => {
							setGoodSlider("");
						}}
					/>
				</div>
			</div>
		);
	}
}

export default GoodSlider;
