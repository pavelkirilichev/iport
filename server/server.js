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

const goods = [
	{
		id: 0,
		title: 'Apple iPhone 13 (6.1", 128GB, темная ночь)',
		price: 2120,
		old_price: 2430,
		type: "Подушка",
		src: "good_1.jpg",
	},
	{
		id: 1,
		title:
			"2020 Apple MacBook Air 13.3″ серый космос (Apple M1, 8Gb, SSD 256Gb, M1 (7 GPU))",
		price: 2120,
		old_price: 2430,
		type: "Подушка",
		src: "good_2.jpg",
	},
	{
		id: 2,
		title: "2022 Apple iPad Air 10.9″ (64GB, Wi-Fi, фиолетовый)",
		price: 2120,
		old_price: 2430,
		type: "Подушка",
		src: "good_3.jpg",
	},
	{
		id: 3,
		title:
			"Apple Watch Series 7 GPS 45mm (корпус - зеленый, спортивный ремешок цвета зеленый клевер, IP67/WR50)",
		price: 2120,
		old_price: 2430,
		type: "Подушка",
		src: "good_4.jpg",
	},
];

app.use(express.json({}));
app.use(cookieParser());
app.get("/goods", (req, res) => {
	res.json(goods);
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
		} else {
			cartCookie = Cookie.cart;
			res.cookie("cart", Cookie + CookieCart);
		}
	} else {
		getDataID("users", "*", userID).then((result) => {
			result = result[0];
			cart = result.cart + goodDataJSON;
			updateDataID("users", "cart", cart, userID).then((result_two) => {
				console.log("ok");
			});
		});
	}
	res.send("ok");
});

app.listen(6000, () => {
	console.log("server start on 6000");
});
