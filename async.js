const urlJson = "https://5440000.github.io/items.json";
const ITEMS_ON_PAGE = 5;

const createItem = (obj) => {
  const content = document.querySelector("#content");
  const div = document.createElement("div");
  div.addEventListener("click", () => {
    window.location.href = `${obj.url}`;
  });

  div.classList.add("item", "no-padding", "row");
  div.insertAdjacentHTML(
    "afterbegin",
    `        
      <div class="item-overlay no-padding col-xl-3 col-lg-4 col-md-5 col-sm  item__wrapper align-self-center ">
          <img
          class="item__image ${obj.year}"
          src="${obj.image}"
          alt=""
          />
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7 col-sm description flex-column justify-content-center">
          <h2 class="col no-padding description__article-title">${obj.articleTitle}</h2>
          <div class="col no-padding description__text">${obj.text}
          </div>
          <div class="col no-padding description__writer-name">${obj.writerName}</div>
          <div class="col no-padding description__company">${obj.company}</div>
      </div>`
  );
  content.append(div);
};

const loadingContent = async function getData() {
  const json = await fetch(urlJson);
  const data = await json.json();
  const firstItems = data.filter((e, index) => index < ITEMS_ON_PAGE);
  firstItems.map(createItem);
  createPagination(data, ITEMS_ON_PAGE);
};
loadingContent();

const createPagination = (data, ITEMS_ON_PAGE) => {
  const div = document.getElementById("for-buttons");
  const howMatchButtons = Math.ceil(data.length / ITEMS_ON_PAGE);
  let numberForRender = 0;
  while (numberForRender < howMatchButtons) {
    numberForRender++;
    const createPagButtons = function () {
      const btn = document.createElement("div");
      btn.innerHTML = numberForRender;
      numberForRender === 1
        ? btn.classList.add("pagination-button", "active-pagination")
        : btn.classList.add("pagination-button");
      div.append(btn);
      btn.addEventListener("click", function showItems(e) {
        const buttons =document.querySelectorAll(".pagination-button")
        buttons.forEach(e => {e.classList.remove("active-pagination")});
        e.target.classList.add("active-pagination")
        const content = document.querySelector("#content");
        content.innerHTML = " ";
        const firstIndex = e.target.innerHTML;
        const items = data.filter(
          (e, index) =>
            index >= firstIndex * ITEMS_ON_PAGE - 5 &&
            index <= firstIndex * ITEMS_ON_PAGE - 1
        );
        items.map(createItem);
      });
    };
    createPagButtons();
  }
};

// const activeButtonStyle = (params) => {
//   const buttons = document.querySelectorAll("pagination-button")
//   buttons.find((e) => {e.

//   })

// }

// const createPaginationButton = (i) => {
//   const content = document.getElementById("for-buttons");
//   const btn = document.createElement("div");
//   btn.innerHTML = i;

//   btn.classList.add("col-1", "pagination-button");
//   if (i === 1) {
//     btn.classList.add("active-pagination");
//   }
//   content.append(btn);
//   btn.addEventListener("click", () => {
//     const pagButtons = content.querySelectorAll(".pagination-button");
//     pagButtons.forEach((element) => {
//       const divWithPaginationButtons = document.getElementById("pag-buttons");
//       const allActiveButton = [
//         ...divWithPaginationButtons.querySelectorAll(".active-pagination"),
//       ];

//       allActiveButton.forEach((element) => {
//         element.classList.remove("active-pagination");
//       });
//       element.classList.remove("active-pagination");
//     });
//     btn.classList.add("active-pagination");

//     const showPagination = (i) => {
//       const startIndex = i * numberOfItemOnPage - numberOfItemOnPage;
//       const lastIndex = i * numberOfItemOnPage - 1;
//       const renderedItems = arrAllItemsInHtml.slice(startIndex, lastIndex);
//       renderedItems.forEach((element) => {
//         element.classList.remove("hide");
//       });
//     };

//     showPagination(i);
//   });
// };
