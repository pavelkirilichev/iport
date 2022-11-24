import { useRef, useEffect, useState } from "react";

function RegForm({ modal, setModal }) {
  const [error, setError] = useState("");
  const inputMail = useRef();
  const inputPhone = useRef();
  const inputPass = useRef();
  const inputValidPass = useRef();

  function sendRegForm() {
    const mail = inputMail.current.value;
    const phone = inputPhone.current.value;
    const pass = inputPass.current.value;
    const validPass = inputValidPass.current.value;

    if (mail.length > 0 && pass.length > 0 && validPass.length > 0) {
      if (pass == validPass) {
        const regData = {
          mail: mail,
          phone: phone != null ? phone : "",
          pass: pass,
        };
        fetch("/registration", {
          method: "POST",
          body: JSON.stringify(regData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.text())
          .then((data) => {
            if (data == "ok") {
              setModal();
              window.location.reload();
            } else {
              setError(data);
            }
          });
      } else {
        setError("Пароли не совпадают!");
      }
    } else {
      setError("Заполнены не все поля!");
    }
  }

  return (
    <div className="modal_form">
      <div className="reg">
        <img src="../images/auth/logo.svg" className="reg__logo" />
        <span className="reg__title">Регистрация</span>
        <form className="reg__form">
          <div className="reg__input__list">
            <div className="reg__input__item">
              <span className="reg__input__title">Почта</span>
              <input className="reg__input" ref={inputMail} />
            </div>
            <div className="reg__input__item">
              <span className="reg__input__title">
                Номер телефона (если есть)
              </span>
              <input className="reg__input" ref={inputPhone} />
            </div>
            <div className="reg__input__item">
              <span className="reg__input__title">Пароль</span>
              <input className="reg__input" ref={inputPass} type="password" />
            </div>
            <div className="reg__input__item">
              <span className="reg__input__title">Подтвердите пароль</span>
              <input
                className="reg__input"
                ref={inputValidPass}
                type="password"
              />
            </div>
          </div>
          <span className="modal__error">
            {typeof error == "undefined" ? "" : error}
          </span>
          <div className="reg__form__buttons">
            <button
              className="reg__form__btn reg__btn-orange"
              type="button"
              onClick={() => {
                setModal("login");
              }}
            >
              Войти
            </button>
            <button
              className="reg__form__btn reg__btn-white"
              type="button"
              onClick={() => {
                setModal();
              }}
            >
              Назад
            </button>
          </div>
          <div className="reg__form__buttons reg__btn__center">
            <button
              className="reg__form__btn"
              onClick={(e) => {
                e.preventDefault();
                sendRegForm();
              }}
            >
              Регистрация
            </button>
          </div>
        </form>
        <div className="reg__footer">
          <span className="reg__footer__content">
            © 2010-2018 <br />
            Торговая марка «Свит»
          </span>
          <span className="reg__footer__content">
            Пользовательское <br />
            соглашение
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegForm;
