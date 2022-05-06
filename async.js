const URL_JSON = "https://5440000.github.io/items.json";
const ITEMS_ON_PAGE = 5;
const CONTENT = document.querySelector("#content");
let DATA = [];
let FILTERED_ITEMS = [];
// ___________________________________CREATE--ITEM________________________________________________________________________

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
  FILTERED_ITEMS = DATA;
  const firstItems = DATA.filter((e, index) => index < ITEMS_ON_PAGE);
  setTimeout(() => firstItems.map(createItem), 1000);
  setTimeout(() => createPagination(DATA), 1000);
};
// ___________________________________PAGINATION_______________________________________________________________________

const createPagination = (array) => {
  const buttonsWrap = document.getElementById("for-buttons");
  buttonsWrap.innerHTML = "";
  const howMatchButtonsForItemsNeed = Math.ceil(array.length / ITEMS_ON_PAGE);
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
        removeActiveStyleFromFirstAndLastButtons();
        const buttons = document.querySelectorAll(".pagination-button");
        buttons.forEach((e) => {
          e.classList.remove("active-pagination");
        });
        e.target.classList.add("active-pagination");
        CONTENT.innerHTML = "";
        const firstIndex = e.target.innerHTML;
        const items = array.filter(
          (e, index) =>
            index >= firstIndex * ITEMS_ON_PAGE - 5 &&
            index <= firstIndex * ITEMS_ON_PAGE - 1
        );
        items.map(createItem);
      });
    };
    createPagButtons();
  }
  // _____________________________________——____________**************
  const createFirstAndLast = (array) => {
    const divForFirstButton = document.getElementById("first");
    const divForLastButton = document.getElementById("last");
    const firstButton = document.createElement("div");
    const lastButton = document.createElement("div");

    const refreshActiveStatus = (e) => {
      const divWithPaginationButtons = document.getElementById("pag-buttons");
      const allActiveButton = [
        ...divWithPaginationButtons.querySelectorAll(".active-pagination"),
      ];
      allActiveButton.forEach((element) => {
        element.classList.remove("active-pagination");
      });
      e.classList.add("active-pagination");
    };

    divForFirstButton.innerHTML = " ";
    divForFirstButton.append(firstButton);
    firstButton.classList.add("pagination-button", "no-padding");
    firstButton.textContent = "< First";
    firstButton.addEventListener("click", (event) => {
      const a = event.target;
      CONTENT.innerHTML = "";
      array.filter((e, index) => index < ITEMS_ON_PAGE).map(createItem);
      refreshActiveStatus(a);
    });
    divForLastButton.innerHTML = " ";
    divForLastButton.append(lastButton);
    lastButton.classList.add("pagination-button", "no-padding");
    lastButton.textContent = "Last >";
    lastButton.addEventListener("click", (event) => {
      const a = event.target;
      CONTENT.innerHTML = "";
      array
        .filter(
          (e, index) =>
            index >= Math.floor(array.length / ITEMS_ON_PAGE) * ITEMS_ON_PAGE
        )
        .map(createItem);
      refreshActiveStatus(a);
    });
  };

  // ___________________________________________________________________________________________________________-
  const stopHoverOnPaginationButtonsFirstAndLast = () => {
    const buttonFirst = document.getElementById("first").firstElementChild;
    const buttonLast = document.getElementById("last").lastChild;
    const divWithPaginationButtons = document.getElementById("for-buttons");
    const arrPuginationButtons =
      divWithPaginationButtons.querySelectorAll(".pagination-button");

    buttonFirst.addEventListener("mouseover", (e) => {
      buttonFirst.classList.remove("no-hover");

      if (arrPuginationButtons.length === 1) {
        buttonFirst.classList.add("no-hover");
      }
      if (arrPuginationButtons[0].classList.contains("active-pagination")) {
        buttonFirst.classList.add("no-hover");
      }
      e.preventDefault();
    });
    buttonLast.addEventListener("mouseover", (e) => {
      buttonLast.classList.remove("no-hover");

      if (arrPuginationButtons.length === 1) {
        buttonLast.classList.add("no-hover");
      }
      if (
        arrPuginationButtons[
          arrPuginationButtons.length - 1
        ].classList.contains("active-pagination")
      ) {
        buttonLast.classList.add("no-hover");
      }
    });
  };

  createFirstAndLast(array);
  stopHoverOnPaginationButtonsFirstAndLast();
};
// ___________________________________FILTER--BUTTONS________________________________________________________________________

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
      FILTERED_ITEMS = DATA.filter(
        (el) =>
          filterButton.id === "allArticle" ||
          el.year === Number(filterButton.id)
      );
      FILTERED_ITEMS.filter((e, index) => index < ITEMS_ON_PAGE).map(
        createItem
      );
      createPagination(FILTERED_ITEMS);
    });
  });
};

// ____________________________________SEARCH_______________________________________________________________________

const createSearch = () => {
  function submit(e) {
    e.preventDefault();
  }
  function filter(e) {
    const input = document.getElementById("mySearch");
    let filteredItemForRender = [];
    const inputValue = input.value.toUpperCase();
    FILTERED_ITEMS.forEach((item) => {
      let article = item.articleTitle.toUpperCase();
      if (article.includes(inputValue)) {
        filteredItemForRender.push(item);
      }
    });
    CONTENT.innerHTML = "";
    filteredItemForRender
      .filter((e, index) => index < ITEMS_ON_PAGE)
      .map(createItem);
    createPagination(filteredItemForRender);
    if (filteredItemForRender.length > 0) {
      removeActiveStyleFromFirstAndLastButtons();
    }
    if (filteredItemForRender.length === 0) {
      const divsForFirstAndLast = document.querySelectorAll("#first, #last");
      divsForFirstAndLast.forEach((div) => {
        div.innerHTML = "";
      });
    }
  }
  function autoReset() {
    const input = document.getElementById("mySearch");
    const cards = document.querySelectorAll(".item");
    cards.forEach(function getMatch(info) {
      if ((input.value == null, input.value == "")) {
        createPagination(FILTERED_ITEMS);
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
// ___________________________________FOCUS--ON--SEARCH________________________________________________________________________
const createFocusOnSearchInput = () => {
  const input = document.getElementById("mySearch");
  const searchButton = document.getElementById("search-svg");
  searchButton.addEventListener("click", function () {
    input.focus();
  });
};
// ___________________________________FOCUS--ON--SEARCH________________________________________________________________________
const createBurgerMenu = () => {
  const listMenuPage = document.getElementById("navbarSupportedContent");
  const burgerButton = document.querySelector(".burger");
  const arrPages = listMenuPage.querySelectorAll(".nav-li");
  burgerButton.addEventListener("click", (e) => {
    if (listMenuPage.classList.contains("show")) {
      burgerButton.classList.remove("show");
      listMenuPage.classList.remove("show");
    } else {
      burgerButton.classList.add("show");
      listMenuPage.classList.add("show");
      arrPages.forEach((element) => {
        element.addEventListener("click", () => {
          listMenuPage.classList.remove("show");
        });
      });
    }
  });
};
// ___________________________________DROPDOWN________________________________________________________________________
const createDropdown = () => {
  const listOfYears = document.querySelector(".overlay-listyear");
  const dropButton = document.getElementById("filter");
  const arrYears = listOfYears.querySelectorAll(".year");
  dropButton.addEventListener("click", () => {
    if (listOfYears.classList.contains("show")) {
      listOfYears.classList.remove("show");
    } else {
      listOfYears.classList.add("show");
      arrYears.forEach((element) => {
        element.addEventListener("click", () => {
          listOfYears.classList.remove("show");
          dropButton.innerHTML = "Filter:" + element.innerHTML;
        });
      });
    }
  });
};
// __________________________________NAV--BUTTONS--STYLE_________________________________________________________________________
const creatActiveStyleNavButton = () => {
  const arrNavButtons = document.querySelectorAll(".nav-li");
  arrNavButtons.forEach((currentItem) => {
    currentItem.addEventListener("click", () => {
      arrNavButtons.forEach((e) => {
        e.classList.remove("nav-active");
      });
      currentItem.classList.add("nav-active");
    });
  });
};
// ______________________________________________________________________
const removeActiveStyleFromFirstAndLastButtons = () => {
  const firstAndLastButtons = document.querySelectorAll("#first, #last");
  firstAndLastButtons.forEach((div) => {
    div.firstElementChild.classList.remove(".active-pagination");
  });
};

const _UrlParametres = (btn) =>
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (btn.id !== "allArticle") {
      history.pushState({ id: `${btn.id}` }, "", `?year=${btn.id}`);
    } else {
      history.pushState({ id: `${btn.id}` }, "", "?year=all");
    }
  });

const createFilterUrlParams = () => {
  const allAncors = document.querySelectorAll(".year");
  allAncors.forEach((element) => {
    const ancorFilterYear = document.getElementById(`${element.id}`);
    _UrlParametres(ancorFilterYear);
  });
};
// ______________
const createUrlParametersSearch = () => {
  const divWithYears = document.querySelector(".overlay-listyear");
  const searchForm = document.getElementById("mySearch");
  searchForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const activYear = divWithYears.querySelector(".active-article");
      event.preventDefault();
      if (location.href.includes("All")) {
        history.pushState(
          { id: `${searchForm.value}` },
          "",
          `?keyword=${searchForm.value}`
        );
      }
      if (location.href.includes("year")) {
        history.pushState(
          { id: `${searchForm.value}` },
          "",
          `?keyword=${searchForm.value}&year=${activYear.innerHTML}`
        );
      } else {
        history.pushState(
          { id: `${searchForm.value}` },
          "",
          `?keyword=${searchForm.value}`
        );
      }
    }
  });
};
createUrlParametersSearch();

loadingContent();
createFilterButtons();
createFilterUrlParams();
createSearch();
createFocusOnSearchInput();
createBurgerMenu();
createDropdown();
creatActiveStyleNavButton();
