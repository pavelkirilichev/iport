function RegForm({ modal, setModal }) {
  return (
    <div className="modal_form">
      <div className="reg">
        <img src="../images/auth/logo.svg" className="reg__logo" />
        <span className="reg__title">Регистрация</span>
        <form className="reg__form">
          <div className="reg__input__list">
            <div className="reg__input__item">
              <span className="reg__input__title">Почта</span>
              <input className="reg__input" />
            </div>
            <div className="reg__input__item">
              <span className="reg__input__title">Номер телефона</span>
              <input className="reg__input" />
            </div>
            <div className="reg__input__item">
              <span className="reg__input__title">Пароль</span>
              <input className="reg__input" />
            </div>
            <div className="reg__input__item">
              <span className="reg__input__title">Подтвердите пароль</span>
              <input className="reg__input" />
            </div>
          </div>
          <div className="reg__form__buttons">
            <button
              className="reg__form__btn reg__btn-orange"
              onClick={() => {
                setModal("login");
              }}
            >
              Войти
            </button>
            <button
              className="reg__form__btn reg__btn-white"
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
              onClick={() => {
                setModal("");
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
