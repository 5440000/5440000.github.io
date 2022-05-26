(function () {
  const URL_JSON = "https://5440000.github.io/items.json";
  const ITEMS_ON_PAGE = 5;
  const CONTENT = document.querySelector("#content");
  let DATA = [];
  let FILTERED_ITEMS = [];
  // ___________________________________CREATE--ITEM________________________________________________________________________

  const createItem = (articlePreview) => {
    const div = document.createElement("div");
    div.addEventListener("click", () => {
      window.location.href = articlePreview.url;
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
          <h2 class=" description__article-title">${articlePreview.articleTitle}</h2>
          <div class=" description__text">${articlePreview.text}
          </div>
          <div class=" description__writer-name">${articlePreview.writerName}</div>
          <div class=" description__company">${articlePreview.company}</div>
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

  // ___________________________________FIRST LAST________________________________________________________________________
  const createFirstAndLast = (array) => {
    const divForFirstButton = document.getElementById("first");
    const divForLastButton = document.getElementById("last");

    const firstButton = document.createElement("li");
    const lastButton = document.createElement("li");

    const refreshActiveStatus = (e) => {
      const buttonFirst = document.getElementById("first").firstElementChild;
      const buttonLast = document.getElementById("last").lastChild;

      const divWithPaginationButtons = document.getElementById("pag-buttons");
      const allActiveButton = [
        ...divWithPaginationButtons.querySelectorAll(".active-pagination"),
      ];
      const divWithPaginationNumbers = document.getElementById("for-buttons");
      const allPaginationNumbers =
        divWithPaginationNumbers.querySelectorAll(".pagination-button");
      allActiveButton.forEach((element) => {
        element.classList.remove("active-pagination");
      });
      if (e.innerHTML === "&lt; First") {
        allPaginationNumbers[0].classList.add("active-pagination");
        e.classList.add("no-hover");
        buttonLast.classList.remove("no-hover");
      }
      if (e.innerHTML === "Last &gt;") {
        allPaginationNumbers[allPaginationNumbers.length - 1].classList.add(
          "active-pagination"
        );
        e.classList.add("no-hover");
        buttonFirst.classList.remove("no-hover");
      }
    };

    const createItemsForButtonFirst = function (event) {
      // event.target.classList.add("no-hover")
      const paginationButtons = document.getElementById("for-buttons");
      const arrayButtons =
        paginationButtons.querySelectorAll(".pagination-button");
      if (
        arrayButtons.length === 1 ||
        arrayButtons[0].classList.contains("active-pagination")
      ) {
      } else {
        CONTENT.innerHTML = "";
        array.filter((e, index) => index < ITEMS_ON_PAGE).map(createItem);
        refreshActiveStatus(event.target);
      }
    };

    const createItemsForButtonLast = function (event) {
      const paginationButtons = document.getElementById("for-buttons");
      const arrayButtons =
        paginationButtons.querySelectorAll(".pagination-button");
      if (
        arrayButtons.length === 1 ||
        arrayButtons[arrayButtons.length - 1].classList.contains(
          "active-pagination"
        )
      ) {
      } else {
        CONTENT.innerHTML = "";
        array
          .filter(
            (e, index) =>
              index >= Math.floor(array.length / ITEMS_ON_PAGE) * ITEMS_ON_PAGE
          )
          .map(createItem);
        refreshActiveStatus(event.target);
      }
    };

    divForFirstButton.innerHTML = " ";
    divForFirstButton.append(firstButton);
    firstButton.classList.add("pagination-button", "no-padding");
    firstButton.textContent = "< First";
    firstButton.addEventListener("click", createItemsForButtonFirst);
    divForLastButton.innerHTML = " ";
    divForLastButton.append(lastButton);
    lastButton.classList.add("pagination-button", "no-padding");
    lastButton.textContent = "Last >";
    lastButton.addEventListener("click", createItemsForButtonLast);
  };

  // _____________________________________CREATE FIRST & LAST
  const createStylePaginationButtonsFirstAndLast = () => {
    const buttonFirst = document.getElementById("first").firstElementChild;
    const buttonLast = document.getElementById("last").lastChild;
    const divWithPaginationButtons = document.getElementById("for-buttons");
    const arrPuginationButtons =
      divWithPaginationButtons.querySelectorAll(".pagination-button");

    const styleForFirstButton = () => {
      if (arrPuginationButtons.length === 1) {
        buttonFirst.classList.add("no-hover");
      }

      if (arrPuginationButtons[0] != undefined) {
        if (arrPuginationButtons[0].classList.contains("active-pagination")) {
          buttonFirst.classList.add("no-hover");
        }
      }
    };

    const styleForLastButton = () => {
      if (arrPuginationButtons.length === 1) {
        buttonLast.classList.add("no-hover");
      }
      if (arrPuginationButtons[arrPuginationButtons.length - 1] != undefined) {
        if (
          arrPuginationButtons[
            arrPuginationButtons.length - 1
          ].classList.contains("active-pagination")
        ) {
          buttonLast.classList.add("no-hover");
        }
      }
    };
    styleForFirstButton();
    styleForLastButton();
  };
  // ___________________________________PAGINATION_______________________________________________________________________
  // fitstIndex, lastIndex. activeIndex, pageCount);
  function deleteFirstAndLastButtons() {
    const divForFirstButton = document.getElementById("first");
    const divForLastButton = document.getElementById("last");
    divForFirstButton.innerHTML = "";
    divForLastButton.innerHTML = "";
  }


  const showArticles = function (event) {
    removeActiveStyleFromFirstAndLastButtons();
    const divButtons = document.getElementById("for-buttons");
    const buttons = divButtons.querySelectorAll(".pagination-button");
    buttons.forEach((button) => {
      button.classList.remove("active-pagination");
    });
    event.target.classList.add("active-pagination");
    createStylePaginationButtonsFirstAndLast();

    CONTENT.innerHTML = "";
    const firstIndex = event.target.innerHTML;
    const items = FILTERED_ITEMS.filter(
      (e, index) =>
        index >= firstIndex * ITEMS_ON_PAGE - 5 &&
        index <= firstIndex * ITEMS_ON_PAGE - 1
    );
    items.map(createItem);
  };


  const createPagination = () => {
    const buttonsWrap = document.getElementById("for-buttons");
    buttonsWrap.innerHTML = "";


    deleteFirstAndLastButtons();

    const countOfButtons = Math.ceil(
      FILTERED_ITEMS.length / ITEMS_ON_PAGE
    );
    let buttonNumber = 0;
    if (countOfButtons !== 1) {
      while (buttonNumber < countOfButtons) {
        buttonNumber++;
        const button = document.createElement("li");
        button.insertAdjacentHTML("afterbegin", `<a>${buttonNumber}</a>`);
        buttonNumber === 1
          ? button.classList.add("pagination-button", "active-pagination")
          : button.classList.add("pagination-button");
        buttonsWrap.append(button);
        button.addEventListener("click", showArticles);
      }
    }

    if (FILTERED_ITEMS.length > 5) {
      createFirstAndLast(FILTERED_ITEMS);
      removeActiveStyleFromFirstAndLastButtons();
      createStylePaginationButtonsFirstAndLast();
    }
  };
  // ___________________________________FILTER & SEARCH
  const createFilterButtons = (filterButton) => {
    const inputSearch = document.getElementById("mySearch");
    const filterButtons = document.querySelectorAll("input");
    const inputValuesForRender = { keyword: " ", year: "all-year" };
    const searchButton = document.querySelector(".search__icon");


    function getFilterValue() {
      inputValuesForRender.year = this.value;
      renderFilteredContent();
      createPagination();
    }
    function getSearchValue() {
      if (inputValuesForRender.keyword != this.value) {
        inputValuesForRender.keyword = this.value;
        renderFilteredContent();
        createPagination();
      }
    }

    function renderFilteredContent() {
      CONTENT.innerHTML = " ";
      if (inputValuesForRender.year == "all-year") {
        FILTERED_ITEMS = DATA.filter(
          (element) =>
            element.articleTitle.includes(inputValuesForRender.keyword) ||
            element.text.includes(inputValuesForRender.keyword)
        );
      } else {
        FILTERED_ITEMS = DATA.filter(
          (element) =>
            element.year == inputValuesForRender.year &&
            (element.articleTitle.includes(inputValuesForRender.keyword) ||
              element.text.includes(inputValuesForRender.keyword))
        );
      }

      if (FILTERED_ITEMS.length === 0) {
        CONTENT.innerHTML = "";
        CONTENT.insertAdjacentHTML(
          "afterbegin",
          `<h3 class='no-found'> :(   No result found for "${inputValuesForRender.keyword}". Please try another way. </h3>`
        );
      }
      FILTERED_ITEMS.filter((e, index) => index < ITEMS_ON_PAGE).map(
        createItem
      );
    }

    filterButtons.forEach((filterButton) => {
      if (filterButton.type === "radio") {
        filterButton.addEventListener("change", getFilterValue);
      } else {
        inputSearch.addEventListener("change", getSearchValue);
        inputSearch.addEventListener("keyup", function (event) {
          if (event.code === "Enter") {
            const getSearchValueBindCreateFilterButtonContext =
              getSearchValue.bind(this);
            getSearchValueBindCreateFilterButtonContext();
          }
        });
      }
    });
  };

  // };
  // ___________________________________FOCUS--ON--SEARCH____________________________________________________________________
  const createFocusOnSearchInput = () => {
    const input = document.getElementById("mySearch");
    const searchButton = document.getElementById("search-svg");
    searchButton.addEventListener("click", function () {
      input.focus();
    });
  };
  // ____________________________________BURGER--MENU________________________________________________________________________
  const createBurgerMenu = () => {
    const listMenuPage = document.getElementById("navbarSupportedContent");
    const burgerButton = document.querySelector(".burger");
    const arrPages = listMenuPage.querySelectorAll(".nav-li");
    const createBurger = (e) => {
      if (listMenuPage.classList.contains("show")) {
        burgerButton.classList.remove("show");
        listMenuPage.classList.remove("show");
      } else {
        burgerButton.classList.add("show");
        listMenuPage.classList.add("show");
        arrPages.forEach((element) => {
          element.addEventListener("click", () => {
            listMenuPage.classList.remove("show");
            burgerButton.classList.remove("show");
          });
        });
      }
    };

    burgerButton.addEventListener("click", createBurger);
  };
  // ___________________________________DROPDOWN________________________________________________________________________
  const createDropdown = () => {
    const listOfYears = document.querySelector(".overlay-listyear");
    const dropButton = document.getElementById("filter");
    dropButton.innerHTML = "Filter: allArticle";
    const arrYears = listOfYears.querySelectorAll('[data-id="filter"]');
    console.log(arrYears);
    const createDropdownStyle = () => {
      if (listOfYears.classList.contains("show")) {
        listOfYears.classList.remove("show");
      } else {
        listOfYears.classList.add("show");
        arrYears.forEach((element) => {
          element.addEventListener("click", () => {
            listOfYears.classList.remove("show");
            dropButton.innerHTML = `Filter: ${element.id}`;
          });
        });
      }
    };
    dropButton.addEventListener("click", createDropdownStyle);
  };
  // __________________________________NAV--BUTTONS--STYLE_______________________________________________________________
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
  // __________________________________STYLE--FIRST--LAST_______________________________________________________________
  const removeActiveStyleFromFirstAndLastButtons = () => {
    const firstAndLastButtons = document.querySelectorAll("#first, #last");
    firstAndLastButtons.forEach((div) => {
      div.firstElementChild.classList.remove("active-pagination");
      div.firstElementChild.classList.remove("no-hover");
    });
  };
  const _UrlParametres = (btn) =>
    btn.addEventListener("click", (event) => {
      // event.preventDefault();
      if (btn.id !== "allArticle") {
        history.pushState({ id: btn.id }, "", `?year=${btn.id}`);
      } else {
        history.pushState({ id: btn.id }, "", "?year=all");
      }
    });

  const createFilterUrlParams = () => {
    const allAncors = document.querySelectorAll(".year");
    allAncors.forEach((element) => {
      const ancorFilterYear = document.getElementById(`${element.id}`);
      _UrlParametres(ancorFilterYear);
    });
  };
  // __________________________________URL--SEARCH--PARAMS_________________________________________________________________________
  const createUrlParametersSearch = () => {
    const divWithYears = document.querySelector(".overlay-listyear");
    const searchForm = document.getElementById("mySearch");
    const createPushStateParams = (event) => {
      if (event.key === "Enter") {
        const activYear = divWithYears.querySelector(".active-article");
        event.preventDefault();
        if (location.href.includes("All")) {
          history.pushState(
            { id: searchForm.value },
            "",
            `?keyword=${searchForm.value}`
          );
        }
        if (location.href.includes("year")) {
          history.pushState(
            { id: searchForm.value },
            "",
            `?keyword=${searchForm.value}&year=${activYear.innerHTML}`
          );
        } else {
          history.pushState(
            { id: searchForm.value },
            "",
            `?keyword=${searchForm.value}`
          );
        }
      }
    };

    searchForm.addEventListener("keydown", createPushStateParams);
  };

  createUrlParametersSearch();
  loadingContent();
  createFilterButtons();
  createFilterUrlParams();
  createFocusOnSearchInput();
  createBurgerMenu();
  createDropdown();
  creatActiveStyleNavButton();
})();
