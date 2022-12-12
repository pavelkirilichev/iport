import { useRef, useEffect, useState } from "react";

function UpdateCart(id, count, isDelete) {
	if (isDelete == 1) {
		const request = {
			id: id,
			type: "delete",
		};
		fetch("/api/updateCart", {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return;
	}
	if (isDelete == 2) {
		const request = {
			type: "deleteAll",
		};
		fetch("/api/updateCart", {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return;
	} else {
		const request = {
			id: id,
			type: "count",
			count: count,
		};
		fetch("/api/updateCart", {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return;
	}
}

export default UpdateCart;
