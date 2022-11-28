const express = require("express");
const app = express();
const sql = require("./get_data");
const cookieParser = require("cookie-parser");
const connectPool = require("./connecting_db");
const getSearchData = sql.getSearchData;
const getSearchDataTwoAnd = sql.getSearchDataTwoAnd;
const getSearchDataTwoOr = sql.getSearchDataTwoOr;
const getDataID = sql.getDataID;
const updateDataID = sql.updateDataID;

app.use(express.json({}));
app.use(cookieParser());
app.get("/goods", (req, res) => {
	connectPool.query(`SELECT * FROM goods ORDER BY price`).then((goods) => {
		res.json(goods[0]);
	});
});
app.get("/goodsLimit", (req, res) => {
	connectPool
		.query(`SELECT * FROM goods ORDER BY price LIMIT 30`)
		.then((goods) => {
			res.json(goods[0]);
		});
});
app.post("/goodsSearch", (req, res) => {
	search = req.body.search;
	console.log(req.body);
	connectPool
		.query(
			`SELECT * FROM goods WHERE full_name LIKE '%${search}%' ORDER BY price`,
		)
		.then((goods) => {
			res.json(goods[0]);
		});
});
app.post("/goodsCategory", (req, res) => {
	category = req.body.category;
	connectPool
		.query(`SELECT * FROM goods WHERE category = '${category}' ORDER BY price`)
		.then((goods) => {
			res.json(goods[0]);
		});
});
app.post("/goodsCategoryDesc", (req, res) => {
	category = req.body.category;
	connectPool
		.query(
			`SELECT * FROM goods WHERE category = '${category}' ORDER BY price DESC`,
		)
		.then((goods) => {
			res.json(goods[0]);
		});
});
app.post("/goodID", (req, res) => {
	id = req.body.id;
	connectPool.query(`SELECT * FROM goods WHERE ID = ${id}`).then((goods) => {
		res.json(goods[0][0]);
	});
});
app.post("/updateCart", (req, res) => {
	req_data = req.body;
	if (req_data.type == "delete") {
		console.log("delete");
		if (req.cookies.id) {
			connectPool
				.query(`SELECT * FROM users WHERE ID = ${req.cookies.id}`)
				.then((user_data) => {
					user_data = user_data[0][0];
					console.log(user_data);

					cart = user_data.cart.split(", ");
					//console.log(cart);
					for (i = 0; i < cart.length - 1; i++) {
						cart_item = JSON.parse(cart[i]);
						if (cart_item.id == req_data.id) {
							cart.splice(i, 1);
						}
					}
					cart_str = cart.join(", ");
					console.log(cart_str);
					updateDataID("users", "cart", cart_str, req.cookies.id);
					res.send("ok");
				});
		} else {
			cart = req.cookies.cart.split("_");
			for (i = 0; i < cart.length - 1; i++) {
				cart_item = cart[i];
				cart_item_id = Number(cart_item.split("-")[0]);
				if (cart_item_id == req_data.id) {
					cart.splice(i, 1);
				}
			}
			cart_str = cart.join("_");
			res.cookie("cart", cart_str);
			res.send("ok");
		}
	} else if (req_data.type == "deleteAll") {
		if (req.cookies.id) {
			connectPool;
			updateDataID("users", "cart", "", req.cookies.id);
			res.send("ok");
		} else {
			res.cookie("cart", "");
			res.send("ok");
		}
	} else if (req_data.type == "count") {
		if (req.cookies.id) {
			connectPool
				.query(`SELECT * FROM users WHERE ID = ${req.cookies.id}`)
				.then((user_data) => {
					user_data = user_data[0][0];
					console.log(user_data);

					cart = user_data.cart.split(", ");
					console.log(cart);
					for (i = 0; i < cart.length - 1; i++) {
						cart_item = JSON.parse(cart[i]);
						if (cart_item.id == req_data.id) {
							cart[i] = `{"id":${cart_item.id},"count":${req_data.count}}`;
						}
					}
					cart_str = cart.join(", ");
					updateDataID("users", "cart", cart_str, req.cookies.id);
					res.send("ok");
				});
		} else {
			cart = req.cookies.cart.split("_");
			for (i = 0; i < cart.length - 1; i++) {
				cart_item = cart[i];
				cart_item_id = Number(cart_item.split("-")[0]);
				if (cart_item_id == req_data.id) {
					cart[i] = `${cart_item_id}-${req_data.count}`;
				}
			}
			cart_str = cart.join("_");
			res.cookie("cart", cart_str);
			res.send("ok");
		}
	}
});
app.get("/cart", (req, res) => {
	if (req.cookies.id) {
		getDataID("users", "*", req.cookies.id).then((result) => {
			result = result[0];

			cart = result.cart.split(", ");
			if (result.cart.length > 1) {
				cart_array_id = [];
				cart_array_count = [];
				for (i = 0; i < cart.length - 1; i++) {
					cart_item = JSON.parse(cart[i]);
					cart_array_id.push(cart_item.id);
					cart_array_count.push(cart_item.count);
				}
				cart_str_id = cart_array_id.join(", ");
				connectPool
					.query(`SELECT * FROM goods WHERE ID IN (${cart_str_id})`)
					.then((goods) => {
						goods = goods[0];
						goods.map((good, key) => {
							let key_count = cart_array_id.indexOf(good.ID);
							goods[key]["count"] = cart_array_count[key_count];
						});
						console.log(goods);
						res.json(goods);
					});
			} else {
				res.json([]);
			}
		});
	} else {
		if (req.cookies.cart) {
			cart = req.cookies.cart.split("_");
			if (req.cookies.cart.length > 1) {
				cart_array_id = [];
				cart_array_count = [];
				for (i = 0; i < cart.length - 1; i++) {
					cart_item = cart[i];
					[cart_item_id, cart_item_count] = cart_item.split("-");
					cart_array_id.push(Number(cart_item_id));
					cart_array_count.push(Number(cart_item_count));
				}
				cart_str_id = cart_array_id.join(", ");
				console.log(cart_array_count);
				connectPool
					.query(`SELECT * FROM goods WHERE ID IN (${cart_str_id})`)
					.then((goods) => {
						goods = goods[0];
						goods.map((good, key) => {
							let key_count = cart_array_id.indexOf(good.ID);
							goods[key]["count"] = Number(cart_array_count[key_count]);
						});
						console.log(goods);
						res.json(goods);
					});
			} else {
				res.json([]);
			}
		} else {
			res.json([]);
		}
	}
});
app.get("/getUserByID", (req, res) => {
	const id = req.cookies.id;
	getDataID("users", "*", id).then((result) => {
		result = result[0];
		res.json(result);
	});
});

app.post("/registration", (req, res) => {
	const regForm = req.body;
	let cartStr = "";
	if (req.cookies.cart) {
		cookiesCart = req.cookies.cart.split("_");
		for (i = 0; i < cookiesCart.length - 1; i++) {
			let [id, count] = cookiesCart[i].split("-");
			cartStr += `{"id":${id},"count":${count}}, `;
		}
	}

	console.log(regForm.mail);
	getSearchDataTwoOr(
		"users",
		"*",
		"mail",
		regForm.mail,
		"phone",
		regForm.phone,
	).then((result) => {
		console.log(result);
		if (result.length == 0) {
			connectPool
				.query(
					`INSERT INTO users (mail, phone, password, cart) VALUES ('${regForm.mail}', '${regForm.phone}', '${regForm.pass}', '${cartStr}')`,
				)
				.then(() => {
					getSearchData("users", "*", "mail", regForm.mail).then(
						(result_two) => {
							result_two = result_two[0];
							console.log(result_two);
							res.cookie("id", result_two.ID);
							res.cookie("pass", result_two.password);
							res.send("ok");
						},
					);
				});
		} else {
			console.log("error");
		}
	});
});

app.post("/login", (req, res) => {
	const loginForm = req.body;
	console.log(loginForm);

	getSearchDataTwoAnd(
		"users",
		"*",
		"mail",
		loginForm.login,
		"password",
		loginForm.pass,
	).then((result) => {
		if (result.length > 0) {
			result = result[0];
			let cartStr = "";
			if (req.cookies.cart) {
				cookiesCart = req.cookies.cart.split("_");
				for (i = 0; i < cookiesCart.length - 1; i++) {
					let [id, count] = cookiesCart[i].split("-");
					cartStr += `{"id":${id},"count":${count}}, `;
				}
			}
			updateDataID("users", "cart", cartStr, result.ID).then((result_two) => {
				console.log("ok");
			});

			res.cookie("id", result.ID);
			res.cookie("pass", result.password);
			res.send("ok");
		} else {
			res.send("error");
		}
	});
});

app.post("/addToCart", (req, res) => {
	const goodData = req.body;
	const goodDataJSON = JSON.stringify(goodData) + ", ";
	console.log(goodDataJSON);

	const goodID = goodData.id;
	const goodCount = goodData.count;
	const userID = req.cookies.id;
	if (typeof userID == "undefined") {
		const Cookie = req.cookies.cart;
		const CookieCart = `${goodID}-${goodCount}_`;
		console.log(CookieCart);
		if (typeof Cookie == "undefined") {
			res.cookie("cart", CookieCart);
			res.send("1");
		} else {
			cartCookie = Cookie + CookieCart;
			console.log(cartCookie);
			let cart_array = cartCookie.split("_");
			for (i = 0; i < cart_array.length - 1; i++) {
				elem = cart_array[i];
				console.log(elem);
				[elem_id, elem_count] = elem.split("-");
				elem_id = Number(elem_id);
				elem_count = Number(elem_count);
				for (j = 0; j < cart_array.length - 1; j++) {
					elem_j = cart_array[j];
					[elem_j_id, elem_j_count] = elem_j.split("-");
					elem_j_id = Number(elem_j_id);
					elem_j_count = Number(elem_j_count);
					if (elem_id == elem_j_id && i != j) {
						elem_count += elem_j_count;
						cart_array[i] = `${elem_id}-${elem_count}`;
						cart_array.splice(j, 1);
					}
				}
			}
			cartCookie = cart_array.join("_");
			res.cookie("cart", cartCookie);
			res.send(cart_array);
		}
	} else {
		getDataID("users", "*", userID).then((result) => {
			result = result[0];
			cart = result.cart + goodDataJSON;
			let cart_array = cart.split(", ");
			for (i = 0; i < cart_array.length - 1; i++) {
				elem = JSON.parse(cart_array[i]);
				for (j = 0; j < cart_array.length - 1; j++) {
					elem_j = JSON.parse(cart_array[j]);
					if (elem.id == elem_j.id && i != j) {
						elem.count += elem_j.count;
						cart_array[i] = JSON.stringify(elem);
						cart_array.splice(j, 1);
					}
				}
			}
			cart = cart_array.join(", ");
			updateDataID("users", "cart", cart, userID).then((result_two) => {
				console.log("ok");
			});
			res.send(cart_array);
		});
	}
});

app.listen(6000, () => {
	console.log("server start on 6000");
});
