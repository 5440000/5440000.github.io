const shop = document.getElementById("shop")
const banner = document.createElement("div")
banner.classList.add("banner")
const theFirstChild = shop.firstChild
console.log(theFirstChild)
shop.insertBefore(banner, theFirstChild);
// __________________________________________________________банер












// ________________________________________________________________Noda модальное окно и листенер на корзину
function _createModal({img, name, price, currancy, madein,}) {
  const modal = document.createElement("div");
  const DEFAULT_WIDTH = "600px"
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="modal-overlay" data-close = "true">
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


  const buttonCart = document.getElementById("btn-to-cart");      //кнопка добавить в корзину
  buttonCart.addEventListener("click",((chooseElement) => {    //повесить прослушку 
    $.modal.close()
    const modal = $.modalCart(arrItems[goodId]);      //задаю переменной modal значение айди на который кликнули и передаю его в метод modal обекта доллар
    modal.openCssCart();
    
      
  }))

  return modal                                                   // функция возвращает modal как html 
}










  
// const modal = $.modal(arrItems[chooseElement.target.dataset.id]); атрибут датаайди равен 1


const $ = {
  modal: function(options) {                                 //обьявляю метод modal для обьекта доллар и передаю ему options

    const $modal = _createModal(options);
  const modal = {
    open() {
      $modal.classList.add("open");
    },
    close() {
      $modal.classList.remove("open");
    },
    // destroy() {},
  };
  $modal.addEventListener('click', event =>{
      if(event.target.dataset.close) {
          modal.close()
      }
  })
  
  return modal
  
},
modalCart: function (options) {
  const $modalCart = openCart(options);
  const modalCart = {
    openCssCart() {$modalCart.classList.add("open")},
    closeCssCart() {$modalCart.classList.remove("close")},
    }
$modalCart.addEventListener("click", event =>{
if(event.target.database.close) {
  modalCart.closeCssCart()
}})


return modalCart
  }
}














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
const openCart = ({img, name, price, currancy, madein,}) => {
  const modalCart = document.createElement("div");
  modalCart.classList.add("modal-cart");
  modalCart.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal-cart__overlay" data-close="true">
        <div class="modal-cart__window">
            <div class="modal-cart__header">
                <div class="modal-cart__title">Корзина покупок</div>
                <div class="modal-cart__close">&times;</div>
            </div>
            <div class="modal-cart__content">
                <div class="modal-cart__img" data-close="true">${img}</div>
                <div class="modal-cart__good-info">
                    <div class="modal-cart__good-name">Марка ${name }</div>
                    <div class="modal-cart__price">Стоимость товара ${price } ${currancy}</div>
                    <div class="modal-cart__made-in">Производитель ${madein}</div>
                </div>
            </div>
            <div class="footer">
                <button class="modal-cart__buttion" data-close="true">Вернуться к товарам</button>
                <button class="modal-cart__buttion-buy">Оформить покупку</button>
            </div>
            
        </div>
    </div>
    `
    
  );

  document.body.appendChild(modalCart);
  console.log(modalCart);


  return modalCart
};
// _________________________________________________________________________________________________________

parsArr(arrItems);

const arrButtons = document.querySelectorAll(".item__buttion");     //список всех кнопок с классом buttion

arrButtons.forEach((iButton) => {                           //для каждой кнопки из списка
  iButton.addEventListener("click", (chooseElement) => {    //повесить прослушку 
    goodId = chooseElement.target.dataset.id;         //определяю айди у кнопки
    const modal = $.modal(arrItems[goodId]);      //задаю переменной modal значение айди на который кликнули и передаю его в метод modal обекта доллар
    modal.open();

  });
});





