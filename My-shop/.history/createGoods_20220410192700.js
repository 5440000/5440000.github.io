const createGood = ({ id, img, name, price, currancy }) => {
  //описываю функцию передающую в див данные из обьекта массива
  const listGoods = document.getElementById("list_goods");
  listGoods.insertAdjacentHTML(
    "afterbegin",
    `<div class="item" >
        <div class="item__image" style="background-image:url(${img})"></div>
          <div class="item__discription-container">
            <div class="item__name item-size">${name}</div>
              <div class="item__raiting item-size">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            <div class="item__price item-size">${currancy}${price}</div>
          <div class="item__button item-size">
            <button class="item__buttion" data-id="${id}">
              <i class="far fa-plus-square"></i>Add to card
            </button>
          </div>
        </div>
    </div>`
  );
};

const parsArr = (arr) => {
  arr.forEach((item) => {
    createGood(item);
  });
};

const arrButtons = document.querySelectorAll(".item__buttion"); //список всех кнопок с классом buttion

arrButtons.forEach((iButton) => {
  //для каждой кнопки из списка
  iButton.addEventListener("click", (chooseElement) => {
    //повесить прослушку
    const goodId = chooseElement.target.dataset.id; //определяю айди у кнопки
    _createModal(arrItems[goodId]); //задаю переменной modal значение айди на который кликнули и передаю его в метод modal обекта доллар
  });
});

parsArr(arrItems);
