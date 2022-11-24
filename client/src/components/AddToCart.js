import { useRef, useEffect, useState } from "react";

function AddToCart(id, count) {
  console.log(id, count);
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
  });
}

export default AddToCart;
