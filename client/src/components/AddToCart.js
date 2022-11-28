import { useRef, useEffect, useState } from "react";

function AddToCart(id, count, setCartCount) {
	const goodData = {
		id: id,
		count: count,
	};
	fetch("/addToCart", {
		method: "POST",
		body: JSON.stringify(goodData),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.text())
		.then((data) => {
			if (data == "1") {
				setCartCount(1);
			} else {
				setCartCount(JSON.parse(data).length - 1);
			}
		});
}

export default AddToCart;
