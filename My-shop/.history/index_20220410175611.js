const shop = document.getElementById("shop");
const banner = document.createElement("div");
banner.classList.add("banner");
const theFirstChild = shop.firstChild;
console.log(theFirstChild);
shop.insertBefore(banner, theFirstChild);
// __________________________________________________________банер

// ________________________________________________________________Noda модальное окно и листенер на корзину
const _createModal = ({ img, name, price, currancy, madein }) => {
  const modal = document.createElement("div");
  console.log("🚀 ~ file: index.js ~ line 12 ~ modal", modal)
  const DEFAULT_WIDTH = "600px";
  modal.classList.add("vmodal open");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="modal-overlay" data-close="true">
        <div class="modal-window style="width ${DEFAULT_WIDTH}">
          <div class="modal-header">
            <span class="modal-title">Наручные часы  ${name}</span>
            <span class="modal-close"  data-close="true">&times;</span>
          </div>
          <div class="modal-body">
            <div class="modal-body-img" style="background-image:url(${img})" ></div>
            <div class="modal-good-info">

              <div class="price"> 
              Марка    
              <b>${name}</b> <br><br><br><br><br>
              Стоимость  <b>${price} ${currancy}</b> 
              <br><br><br><br><br>
              Производитель  <b>${madein}</b>
              </div>
            </div>
          </div>
          
          
          <div class="modal-footer">
              <button id="btn-to-cart" class="modal-btn modal-btn-add-in-cart">В корзину</button>
              <button class="modal-btn modal-btn-close" data-close = "true" >Закрыть окно</button>
          </div>
        </div>
      </div>
    `
  );
  document.body.appendChild(modal);

  const buttonCart = document.getElementById("btn-to-cart"); //кнопка добавить в корзину

  buttonCart.addEventListener("click", () => {
    savedGoodToLocalStorage({ img, name, price, currancy, madein });
  });

  return modal
};

// const modal = $.modal(arrItems[chooseElement.target.dataset.id]); атрибут датаайди равен 1

const modal = (good) => {
  const $modal = _createModal(good);
  return {
    open() {
      $modal.classList.add("open");
    },
    close() {
      $modal.classList.remove("open");
    },
  };
};
const showModalCart = () => {
  const savedGoods = window.localStorage.getItem("goods"); //строка в виде массива обьектов (JSON - тип данных)
  const goods = JSON.parse(savedGoods); // массив сохраненных товаров в виде
};

const savedGoodToLocalStorage = (good) => {
  const savedGoods = window.localStorage.getItem("goods");
  console.log(savedGoods);
};
// ______________________________________________________начало действий

const arrItems = [
  {
    id: 0,
    img: "./img/01.png",
    name: "MONTBLANC",
    price: 1900,
    currancy: "$",
    madein: "Belaurs",
  },
  {
    id: 1,
    img: "./img/02.png",
    name: "SEIKO",
    price: 1200,
    currancy: "$",
    madein: "Belarus",
  },
  {
    id: 2,
    img: "./img/03.png",
    name: "ORIENT",
    price: 1000,
    currancy: "$",
    madein: "Belarus",
  },
  {
    id: 3,
    img: "./img/04.png",
    name: "SWAROVSKI",
    price: 1900,
    currancy: "$",
    madein: "Belarus",
  },
  {
    id: 4,
    img: "./img/05.png",
    name: "ROLEX",
    price: 1900,
    currancy: "$",
    madein: "Belarus",
  },
];

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
// console.log(createGood)
// ________________________________________________________________________ Корзина
const openCart = ({ img, name, price, currancy, madein }) => {
  const modalCart = document.createElement("div");
  modalCart.classList.add("modal-cart");
  modalCart.insertAdjacentHTML(
    "afterbegin",
    `

    `
  );

  document.body.appendChild(modalCart);
  console.log(modalCart);

  return modalCart;
};
// _________________________________________________________________________________________________________

parsArr(arrItems);

const arrButtons = document.querySelectorAll(".item__buttion"); //список всех кнопок с классом buttion

arrButtons.forEach((iButton) => {
  //для каждой кнопки из списка
  iButton.addEventListener("click", (chooseElement) => {
    //повесить прослушку
    const goodId = chooseElement.target.dataset.id; //определяю айди у кнопки
    modal(arrItems[goodId]); //задаю переменной modal значение айди на который кликнули и передаю его в метод modal обекта доллар
  });
});


