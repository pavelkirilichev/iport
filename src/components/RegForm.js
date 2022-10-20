function RegForm() {
  return (
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
          <button className="reg__form__btn reg__btn-orange">Войти</button>
          <button className="reg__form__btn reg__btn-white">Назад</button>
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
  );
}

export default RegForm;
