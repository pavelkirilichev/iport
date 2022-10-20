function LoginForm() {
  return (
    <div className="reg login">
      <img src="../images/auth/logo.svg" className="reg__logo" />
      <span className="reg__title">Войти</span>
      <form className="reg__form">
        <div className="reg__input__list">
          <div className="reg__input__item">
            <span className="reg__input__title">Логин</span>
            <input className="reg__input" />
          </div>
          <div className="reg__input__item">
            <span className="reg__input__title">Пароль</span>
            <input className="reg__input" />
          </div>
        </div>
        <div className="reg__form__buttons login__form__buttons">
          <div className="reg__form__buttons__row">
            <button className="reg__form__btn reg__btn-white">Войти</button>
            <button className="reg__form__btn reg__btn-orange">
              Регистрация
            </button>
          </div>

          <button className="reg__form__btn reg__btn-white">Назад</button>
        </div>
      </form>
      <span className="login__recovery">Восстановить пароль или логин</span>
      <div className="reg__footer login__footer">
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

export default LoginForm;
