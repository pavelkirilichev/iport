require("dotenv").config();

const path = require("path");
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

app.post("/orderAdd", (req, res) => {
  var date = new Date().toLocaleString();
  const orderData = req.body;
  const address = orderData.address;
  const phone = orderData.phone;
  const mail = orderData.mail;
  const summ = orderData.summ;
  if (req.cookies.id) {
    let user_id = req.cookies.id;
    connectPool
      .query(`SELECT * FROM users WHERE ID = ${user_id}`)
      .then((user_data) => {
        let cart = user_data[0][0].cart;
        connectPool
          .query(
            `INSERT INTO orders (goods, user_id, date, adress, status, phone, mail, summ) VALUES ('${cart}', ${user_id}, '${date}', '${address}', 'Обработка', '${phone}', '${mail}', ${summ})`
          )
          .then(() => {
            res.json("ok");
          });
      });
  } else {
    let cart = req.cookies.cart;
    cart = cart.split("_");
    for (i = 0; i < cart.length - 1; i++) {
      let [id, count] = cart[i].split("-");
      id = Number(id);
      count = Number(count);
      cart[i] = `{"id":${id},"count":${count}}`;
    }
    goods = cart.join(", ");
    connectPool
      .query(
        `INSERT INTO orders (goods, date, adress, status, phone, mail, summ) VALUES ('${goods}', '${date}', '${address}', 'Обработка', '${phone}', '${mail}', ${summ})`
      )
      .then(() => {
        res.json("ok");
      });
  }
});
app.get("/ordersAll", (req, res) => {
  connectPool
    .query(`SELECT * FROM orders WHERE user_id = '${req.cookies.id}'`)
    .then((orders) => {
      res.json(orders[[0]]);
    });
});

app.post("/goodsOther", (req, res) => {
  const otherData = req.body;
  const goodValue = otherData.goodValue;
  const model = otherData.model;
  const otherType = otherData.type;
  const othervalue = otherData.value;

  if (otherType == "color") {
    connectPool
      .query(
        `SELECT * FROM goods WHERE model = '${model}' AND color = '${othervalue}' AND memory = ${goodValue}`
      )
      .then((goods) => {
        res.json(goods[0][0]);
      });
  } else {
    connectPool
      .query(
        `SELECT * FROM goods WHERE model = '${model}' AND memory = ${othervalue} AND color = '${goodValue}'`
      )
      .then((goods) => {
        res.json(goods[0][0]);
      });
  }
});
app.get("/goods", (req, res) => {
  connectPool
    .query(`SELECT * FROM goods GROUP BY model ORDER BY price`)
    .then((goods) => {
      res.json(goods[0]);
    });
});
app.get("/goodsLimit", (req, res) => {
  connectPool
    .query(`SELECT * FROM goods GROUP BY model ORDER BY price LIMIT 20`)
    .then((goods) => {
      res.json(goods[0]);
    });
});
app.post("/goodsSearch", (req, res) => {
  search = req.body.search;
  connectPool
    .query(
      `SELECT * FROM goods WHERE full_name LIKE '%${search}%' GROUP BY model ORDER BY price`
    )
    .then((goods) => {
      res.json(goods[0]);
    });
});
app.post("/goodsCategory", (req, res) => {
  category = req.body.category;
  connectPool
    .query(
      `SELECT * FROM goods WHERE category = '${category}' GROUP BY model ORDER BY price`
    )
    .then((goods) => {
      res.json(goods[0]);
    });
});
app.post("/goodsCategoryFilter", (req, res) => {
  category = req.body.category;
  colorArr = req.body.color;
  memoryArr = req.body.memory;
  sortDirection = req.body.sort;
  price = req.body.price;
  let queryString = `SELECT * FROM goods WHERE category = ?`;
  let queryData = [category];

  if (memoryArr && memoryArr.length) {
    queryString += ` AND memory IN (?)`;
    queryData.push(memoryArr);
  }
  if (colorArr && colorArr.length) {
    queryString += ` AND color IN (?)`;
    queryData.push(colorArr);
  }
  if (price) {
    price = {
      min: Number(price.min) || 0,
      max: Number(price.max) || null,
    };
    if (price.min) {
      queryString += ` AND price >= ${price.min}`;
    }
    if (price.max) {
      queryString += ` AND price <= ${price.max}`;
    }
  }
  queryString += ` ORDER BY price`;
  if (sortDirection) {
    switch (sortDirection) {
      case "up":
        queryString += ` ASC`;
        break;
      case "down":
        queryString += ` DESC`;
    }
  }

  console.log(req.body);
  console.log(queryString, queryData);
  // if (memoryArr && colorArr && memoryArr.length > 0 && colorArr.length > 0) {
  //   connectPool
  //     .query(
  //       `SELECT * FROM goods WHERE category = '${category}' AND color IN (${colorArr.join(
  //         ", "
  //       )}) AND WHERE memory IN (${memoryArr.join(", ")}) ORDER BY price`
  //     )
  //     .then((goods) => {
  //       res.json(goods[0]);
  //     });
  // } else if (memoryArr && memoryArr.length > 0) {
  //   connectPool
  //     .query(
  //       `SELECT * FROM goods WHERE category = '${category}' AND memory IN (${memoryArr.join(
  //         ", "
  //       )}) ORDER BY price`
  //     )
  //     .then((goods) => {
  //       res.json(goods[0]);
  //     });
  // } else if (colorArr && colorArr.length > 0) {
  //   connectPool
  //     .query(
  //       `SELECT * FROM goods WHERE category = '${category}' AND color IN (?) ORDER BY price`,
  //       [colorArr]
  //     )
  //     .then((goods) => {
  //       res.json(goods[0]);
  //     });
  // }
  connectPool.query(queryString, queryData).then((goods) => {
    res.json(goods[0]);
  });
});
app.post("/goodsFilterColor", (req, res) => {
  category = req.body.category;
  connectPool
    .query(
      `SELECT color FROM goods WHERE category = '${category}' GROUP BY color ORDER BY price`
    )
    .then((goods) => {
      res.json(goods[0]);
    });
});
app.post("/goodsFilterMemory", (req, res) => {
  category = req.body.category;
  price = req.body.price;
  let queryString = `SELECT memory FROM goods WHERE category = '${category}'`;
  if (price) {
    price = {
      min: Number(price.min) || 0,
      max: Number(price.max) || null,
    };
    if (price.min) {
      queryString += ` AND price >= ${price.min}`;
    }
    if (price.max) {
      queryString += ` AND price <= ${price.max}`;
    }
  }
  queryString += ` GROUP BY memory ORDER BY price`;
  connectPool.query(queryString).then((goods) => {
    res.json(goods[0]);
  });
});
app.post("/goodsCategoryDesc", (req, res) => {
  category = req.body.category;
  connectPool
    .query(
      `SELECT * FROM goods WHERE category = '${category}' GROUP BY model ORDER BY price DESC`
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
    if (req.cookies.id) {
      connectPool
        .query(`SELECT * FROM users WHERE ID = ${req.cookies.id}`)
        .then((user_data) => {
          user_data = user_data[0][0];

          cart = user_data.cart.split(", ");
          for (i = 0; i < cart.length - 1; i++) {
            cart_item = JSON.parse(cart[i]);
            if (cart_item.id == req_data.id) {
              cart.splice(i, 1);
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

          cart = user_data.cart.split(", ");
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
        connectPool
          .query(`SELECT * FROM goods WHERE ID IN (${cart_str_id})`)
          .then((goods) => {
            goods = goods[0];
            goods.map((good, key) => {
              let key_count = cart_array_id.indexOf(good.ID);
              goods[key]["count"] = Number(cart_array_count[key_count]);
            });
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

  getSearchDataTwoOr(
    "users",
    "*",
    "mail",
    regForm.mail,
    "phone",
    regForm.phone
  ).then((result) => {
    if (result.length == 0) {
      connectPool
        .query(
          `INSERT INTO users (mail, phone, password, cart, initials) VALUES ('${regForm.mail}', '${regForm.phone}', '${regForm.pass}', '${cartStr}', '${regForm.name}')`
        )
        .then(() => {
          getSearchData("users", "*", "mail", regForm.mail).then(
            (result_two) => {
              result_two = result_two[0];
              res.cookie("id", result_two.ID);
              res.cookie("pass", result_two.password);
              res.send("ok");
            }
          );
        })
        .catch(e => {
          console.error(e)
          res.send(`[BD error]`)
        })
    } else {
      res.send("Такой пользователь уже существует!");
    }
  });
});

app.post("/login", (req, res) => {
  const loginForm = req.body;

  getSearchDataTwoAnd(
    "users",
    "*",
    "mail",
    loginForm.login,
    "password",
    loginForm.pass
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
      updateDataID("users", "cart", cartStr, result.ID).then(
        (result_two) => {}
      );

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

  const goodID = goodData.id;
  const goodCount = goodData.count;
  const userID = req.cookies.id;
  if (typeof userID == "undefined") {
    const Cookie = req.cookies.cart;
    const CookieCart = `${goodID}-${goodCount}_`;
    if (typeof Cookie == "undefined") {
      res.cookie("cart", CookieCart);
      res.send("1");
    } else {
      cartCookie = Cookie + CookieCart;
      let cart_array = cartCookie.split("_");
      for (i = 0; i < cart_array.length - 1; i++) {
        elem = cart_array[i];
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
      updateDataID("users", "cart", cart, userID).then((result_two) => {});
      res.send(cart_array);
    });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("./public")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "public/index.html"));
  });

  app.post("*", (req, res) => {
    res.sendStatus(404);
  });
}

app.listen(process.env.PORT || 6000, () => {
  console.log(`server start on ${process.env.PORT || 6000}`);
});

process.on('uncaughtException', e => {
  console.error(`process killer\n${e}`)
})