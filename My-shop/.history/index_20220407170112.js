const arrItems = [                               //создаю массив
  {
    id: 0,
    img: "./img/01.png",
    name: "MONTBLANC",
    price: 1900,
    currancy: "$",
    madeIn: "Belaurs",
  },
  {
    id: 1,
    img: "./img/03.png",
    name: "SEIKO",
    price: 1200,
    currancy: "$",
    madeIn: "Belaurs",

  },
];

const createGood = ({ id, img, name, price, currancy,  }) => {        //описываю функцию передающую в див данные из обьекта массива
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

// при клике на кнопку запустить функцию
const arrButtons = document.querySelectorAll(".item__buttion");

arrButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const goodId = e.target.dataset.id;
    // console.log(e.target.dataset.id)
    const modal = $.modal(arrItems[goodId]);
    modal.open()
  });
});

// modal-body
