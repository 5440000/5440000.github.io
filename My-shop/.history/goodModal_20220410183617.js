

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


