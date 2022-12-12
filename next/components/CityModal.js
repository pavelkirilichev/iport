import { useRef, useEffect, useState } from "react";
import { city } from "../data/CityJSON";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function CityModal({ modal, setModal, setCity }) {
	const cityRef = useRef();
	return (
		<div className='modal_form'>
			<div className='city__main'>
				<span className='city__title'>Выберите город</span>
				<input className='city__input' list='city' ref={cityRef} />
				<datalist id='city'>
					{city.map((item) => {
						return <option value={item.name} />;
					})}
				</datalist>
				<button
					className='reg__form__btn reg__btn-white city__btn'
					onClick={() => {
						if (cityRef.current.value.length > 0) {
							setCity(cityRef.current.value);
							cookies.set("city", cityRef.current.value);
						}
						setModal();
					}}
				>
					Выбрать
				</button>
			</div>
		</div>
	);
}

export default CityModal;
