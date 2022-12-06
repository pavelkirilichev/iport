function SidabarFilter() {
  return (
    <div className="tkani__main__sidebar__filter">
      <span className="tkani__filter__title">Фильтры</span>
      <div className="tkani__filter__list">
        <div className="tkani__filter__item">
          <span className="tkani__filter__item__title">Основной цвет</span>
          <div className="tkani__filter__item__inner">
            <div className="tkani__filter__item__inner-flex">
              <div className="tkani__filter__item__inner-left">
                <label className="tkani__filter__item__inner__label">
                  <input
                    type="checkbox"
                    className="tkani__filter__item__inner__check__input"
                  />
                  <div className="tkani__filter__item__inner__check__box"></div>
                  <span className="tkani__filter__item__inner__label__text">
                    белое
                  </span>
                </label>
                <label className="tkani__filter__item__inner__label">
                  <input
                    type="checkbox"
                    className="tkani__filter__item__inner__check__input"
                  />
                  <div className="tkani__filter__item__inner__check__box"></div>
                  <span className="tkani__filter__item__inner__label__text">
                    красное
                  </span>
                </label>
              </div>
              <div className="tkani__filter__item__inner-right">
                <label className="tkani__filter__item__inner__label">
                  <input
                    type="checkbox"
                    className="tkani__filter__item__inner__check__input"
                  />
                  <div className="tkani__filter__item__inner__check__box"></div>
                  <span className="tkani__filter__item__inner__label__text">
                    чёрное
                  </span>
                </label>
                <label className="tkani__filter__item__inner__label">
                  <input
                    type="checkbox"
                    className="tkani__filter__item__inner__check__input"
                  />
                  <div className="tkani__filter__item__inner__check__box"></div>
                  <span className="tkani__filter__item__inner__label__text">
                    синее
                  </span>
                </label>
              </div>
            </div>
            <img
              src="/images/tkani/down_icon.png"
              className="tkani__filter__item__down"
            />
          </div>
        </div>
        <div className="tkani__filter__item">
          <span className="tkani__filter__item__title">Цвет</span>
          <div className="tkani__filter__item__inner">
            <div className="tkani__filter__item__inner-flex">
              <div className="tkani__filter__item__inner-left">
                <label className="tkani__filter__item__inner__label">
                  <input
                    type="checkbox"
                    className="tkani__filter__item__inner__check__input"
                  />
                  <div className="tkani__filter__item__inner__check__box"></div>
                  <span className="tkani__filter__item__inner__label__text">
                    белое
                  </span>
                </label>
                <label className="tkani__filter__item__inner__label">
                  <input
                    type="checkbox"
                    className="tkani__filter__item__inner__check__input"
                  />
                  <div className="tkani__filter__item__inner__check__box"></div>
                  <span className="tkani__filter__item__inner__label__text">
                    красное
                  </span>
                </label>
              </div>
              <div className="tkani__filter__item__inner-right">
                <label className="tkani__filter__item__inner__label">
                  <input
                    type="checkbox"
                    className="tkani__filter__item__inner__check__input"
                  />
                  <div className="tkani__filter__item__inner__check__box"></div>
                  <span className="tkani__filter__item__inner__label__text">
                    чёрное
                  </span>
                </label>
                <label className="tkani__filter__item__inner__label">
                  <input
                    type="checkbox"
                    className="tkani__filter__item__inner__check__input"
                  />
                  <div className="tkani__filter__item__inner__check__box"></div>
                  <span className="tkani__filter__item__inner__label__text">
                    синее
                  </span>
                </label>
              </div>
            </div>
            <img
              src="/images/tkani/down_icon.png"
              className="tkani__filter__item__down"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidabarFilter;
