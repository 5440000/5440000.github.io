const URL_JSON = "https://5440000.github.io/items.json";
const ITEMS_ON_PAGE = 5;
const CONTENT = document.querySelector("#content");
let DATA = [];

const createItem = (articlePreview) => {
  const div = document.createElement("div");
  div.addEventListener("click", () => {
    window.location.href = `${articlePreview.url}`;
  });
  div.classList.add("item", "no-padding", "row");
  div.insertAdjacentHTML(
    "afterbegin",
    `        
      <div class="item-overlay no-padding col-xl-3 col-lg-4 col-md-5 col-sm  item__wrapper align-self-center ">
          <img
          class="item__image ${articlePreview.year}"
          src="${articlePreview.image}"
          alt=""
          />
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7 col-sm description flex-column justify-content-center">
          <h2 class="col no-padding description__article-title">${articlePreview.articleTitle}</h2>
          <div class="col no-padding description__text">${articlePreview.text}
          </div>
          <div class="col no-padding description__writer-name">${articlePreview.writerName}</div>
          <div class="col no-padding description__company">${articlePreview.company}</div>
      </div>`
  );
  CONTENT.append(div);
};

const loadingContent = async () => {
  const json = await fetch(URL_JSON);
  DATA = await json.json();
  const firstItems = DATA.filter((e, index) => index < ITEMS_ON_PAGE);
  firstItems.map(createItem);
  createPagination(DATA, ITEMS_ON_PAGE);
};
loadingContent();

const createPagination = (DATA, ITEMS_ON_PAGE) => {
  const buttonsWrap = document.getElementById("for-buttons");
  buttonsWrap.innerHTML = "";
  const howMatchButtonsForItemsNeed = Math.ceil(DATA.length / ITEMS_ON_PAGE);
  let buttonNumber = 0;
  while (buttonNumber < howMatchButtonsForItemsNeed) {
    buttonNumber++;
    const createPagButtons = function () {
      const button = document.createElement("div");
      button.innerHTML = buttonNumber;
      buttonNumber === 1
        ? button.classList.add("pagination-button", "active-pagination")
        : button.classList.add("pagination-button");
      buttonsWrap.append(button);
      button.addEventListener("click", function showItems(e) {
        const buttons = document.querySelectorAll(".pagination-button");
        buttons.forEach((e) => {
          e.classList.remove("active-pagination");
        });
        e.target.classList.add("active-pagination");
        CONTENT.innerHTML = " ";
        const firstIndex = e.target.innerHTML;
        const items = DATA.filter(
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
// ___________________________________________________________________________________________________________

const createFilterButtons = () => {
  const filterButtons = document.querySelectorAll(".year");
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener("click", (e) => {
      e.preventDefault();
      filterButtons.forEach((button) => {
        button.classList.remove("active-article");
      });
      filterButton.classList.add("active-article");
      CONTENT.innerHTML = "";
      const filteredItems = DATA.filter(
        (el) =>
          filterButton.id === "allArticle" ||
          el.year === Number(filterButton.id)
      );
      filteredItems.slice(0, ITEMS_ON_PAGE).map(createItem);
      createPagination(filteredItems, ITEMS_ON_PAGE);
    });
  });
};
createFilterButtons();
//     if (year === "allArticle") {
//       createItem(element);
//     }

// const createFilterButtonsAndUrlParametres = (btn) =>
//   btn.addEventListener("click", (event) => {
//     event.preventDefault();
//     if (btn.id !== "allArticle") {
//       history.pushState({ id: `${btn.id}` }, "", `?year=${btn.id}`);
//     } else {
//       history.pushState({ id: `${btn.id}` }, "", "?");
//     }
//     loadingFilteredContent(btn.id);
//     createPagination()
//   });

// const loadingFilteredContent = async (year) => {
//   const content = document.getElementById("content");
//   content.innerHTML = " ";
//   const json = await fetch(URL_JSON);
//   const data = await json.json();

//   data.forEach((element) => {
//     if (element.year === +year) {
//       createItem(element);
//     }
//     if (year === "allArticle") {
//       createItem(element);
//     }
//   });
//   // createPagination();
// };

// const createFilters = () => {
//   const allAncors = document.querySelectorAll(".year");
//   allAncors.forEach((element) => {
//     const ancorFilterYear = document.getElementById(`${element.id}`);
//     createFilterButtonsAndUrlParametres(ancorFilterYear);
//   });
// };

// createFilters()

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
