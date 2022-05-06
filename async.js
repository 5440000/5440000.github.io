const URL_JSON = "https://5440000.github.io/items.json";
const ITEMS_ON_PAGE = 5;
const CONTENT = document.querySelector("#content");
let DATA = [];
let filteredItems = [];

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
  filteredItems = DATA;
  const firstItems = DATA.filter((e, index) => index < ITEMS_ON_PAGE);
  firstItems.map(createItem);
  createPagination(DATA);
};
loadingContent();

const createPagination = (DATA) => {
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
        CONTENT.innerHTML = "";
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
      filteredItems = DATA.filter(
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

// ___________________________________________________________________________________________________________

const createSearch = () => {
  function submit(e) {
    e.preventDefault();
  }
  function filter(e) {
    const input = document.getElementById("mySearch");
    let filteredItemForRender = [];
    const inputValue = input.value.toUpperCase();
    filteredItems.forEach((item) => {
      let article = item.articleTitle.toUpperCase();
      if (article.includes(inputValue)) {
        filteredItemForRender.push(item);
      }
    });
    CONTENT.innerHTML = "";
    filteredItemForRender.slice(0, ITEMS_ON_PAGE).map(createItem);
    createPagination(filteredItemForRender);
  }

  function autoReset() {
    const input = document.getElementById("mySearch");
    const cards = document.querySelectorAll(".item");

    cards.forEach(function getMatch(info) {
      if ((input.value == null, input.value == "")) {
        createPagination(filteredItems);
      } else {
        return;
      }
    });
  }

  const form = document.querySelector(".search");

  form.addEventListener("keyup", (e) => {
    e.preventDefault();
    filter(e);
  });

  form.addEventListener("keyup", autoReset);
  form.addEventListener("submit", submit);
};
createSearch();
