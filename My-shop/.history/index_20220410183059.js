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

const shop = document.getElementById("shop");
const banner = document.createElement("div");
banner.classList.add("banner");
const theFirstChild = shop.firstChild;
console.log(theFirstChild);
shop.insertBefore(banner, theFirstChild);
// __________________________________________________________банер

// ________________________________________________________________Noda модальное окно и листенер на корзину
const _createModal = ({ img, name, price, currancy, madein }) => {
  const modal = document.getElementById("vmodal");
  modal.classList.add("open");

  const goodImage = document.getElementById("good_image");
  goodImage.style = `background-image: url(${img})`;

  document.body.appendChild(modal);
  const modalClose = document.getElementById("modal_close");
  modalClose.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  const buttonCart = document.getElementById("btn-to-cart"); //кнопка добавить в корзину
  buttonCart.addEventListener("click", () => {
    savedGoodToLocalStorage({ img, name, price, currancy, madein });
  });
};

const savedGoodToLocalStorage = (good) => {
  const savedGoods = window.localStorage.getItem("goods"); //получаем по ключу goods значение из localStorage
  if (savedGoods === null) {
    window.localStorage.setItem("goods", JSON.stringify([good])); //сохраняем массив из одного обьекта Good
  }
  if (savedGoods) {
    const goods = JSON.parse(savedGoods);
    window.localStorage.setItem("goods", JSON.stringify([...goods, good]));
  }
};

const showCartModal = () => {
  const savedGoods = window.localStorage.getItem("goods"); //строка в виде массива обьектов (JSON - тип данных)
  const goods = JSON.parse(savedGoods); // массив сохраненных товаров в виде
};


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

parsArr(arrItems);

const arrButtons = document.querySelectorAll(".item__buttion"); //список всех кнопок с классом buttion

arrButtons.forEach((iButton) => {
  //для каждой кнопки из списка
  iButton.addEventListener("click", (chooseElement) => {
    //повесить прослушку
    const goodId = chooseElement.target.dataset.id; //определяю айди у кнопки
    _createModal(arrItems[goodId]); //задаю переменной modal значение айди на который кликнули и передаю его в метод modal обекта доллар
  });
});
