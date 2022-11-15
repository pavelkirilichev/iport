import { useState } from "react";
import { Link } from "react-router-dom";

function GoodMobile() {
  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");
  return (
    <div className="good_mobile__container">
      <div className="good_mobile__back-btn">Назад</div>
      <div className="good_mobile__content">
        <span className="good_mobile__content__artikul">
          артикул: 121231311231{" "}
        </span>
        <div
          className="good_mobile__content__image"
          style={{ backgroundImage: "url(images/good/good_image_1.png)" }}
        ></div>
      </div>
    </div>
  );
}

export default GoodMobile;
