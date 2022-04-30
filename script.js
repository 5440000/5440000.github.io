const urlJson = "https://5440000.github.io/items.json";

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

const createAllItems = (arrItems) => {
  arrItems.forEach((element) => {
    createItem(element);
  });
};
//кнопки First Last не активные если на странице 1 пагинация

const stopHoverOnPaginationButtonsFirstAndLast = () => {
  const buttonFirst = document.getElementById("first");
  const buttonLast = document.getElementById("last");

  const divWithPaginationButtons = document.getElementById("for-buttons");
  const arrPuginationButtons =
    divWithPaginationButtons.querySelectorAll(".pagination-button");

  buttonFirst.addEventListener("mouseover", (e) => {
    if (arrPuginationButtons.length <= 1) {
      buttonFirst.lastChild.classList.add("no-hover");
      e.preventDefault();
    }
    if (arrPuginationButtons.length <= 1) {
      buttonLast.lastChild.classList.add("no-hover");
      e.preventDefault();
    }
  });
};

const createPagination = (json) => {
  const numberOfItemOnPage = 6;
  const arrAllItemsInHtml = [...content.querySelectorAll(".item")];
  if (arrAllItemsInHtml.length >= numberOfItemOnPage) {
    for (let i = numberOfItemOnPage; i < arrAllItemsInHtml.length; i++) {
      arrAllItemsInHtml[i].classList.add("hide");
    }
  }

  const HideAllItems = () => {
    arrAllItemsInHtml.forEach((element) => {
      element.classList.add("hide");
    });
  };

  const createBtn = (i) => {
    const content = document.getElementById("for-buttons");
    const btn = document.createElement("div");
    btn.innerHTML = `${i}`;

    btn.classList.add("col-1", "pagination-button");
    if (i === 1) {
      btn.classList.add("active-pagination");
    }
    content.append(btn);
    btn.addEventListener("click", () => {
      const pagButtons = content.querySelectorAll(".pagination-button");
      pagButtons.forEach((element) => {
        const divWithPaginationButtons = document.getElementById("pag-buttons");
        const allActiveButton = [
          ...divWithPaginationButtons.querySelectorAll(".active-pagination"),
        ];

        allActiveButton.forEach((element) => {
          element.classList.remove("active-pagination");
        });
        element.classList.remove("active-pagination");
      });
      btn.classList.add("active-pagination");
      HideAllItems();

      const showPagination = (i) => {
        const number = i;
        const startIndex = number * numberOfItemOnPage - numberOfItemOnPage;
        let lastIndex = number * numberOfItemOnPage - 1;
        if (arrAllItemsInHtml.length > numberOfItemOnPage * i) {
          for (let index = startIndex; index <= lastIndex; index++) {
            arrAllItemsInHtml[index].classList.remove("hide");
          }
        } else {
          if (arrAllItemsInHtml.length <= lastIndex) {
            for (let i = lastIndex; i > arrAllItemsInHtml.length - 1; --i) {
              lastIndex = lastIndex - 1;
            }
            for (let index = startIndex; index <= lastIndex; index++) {
              arrAllItemsInHtml[index].classList.remove("hide");
            }
          }
        }
      };

      showPagination(i);
    });
  };

  const howMuchButtons = Math.ceil(
    arrAllItemsInHtml.length / numberOfItemOnPage
  );
  const divWithPaginationButtons = document.getElementById("for-buttons");
  divWithPaginationButtons.innerHTML = "";
  for (let i = 1; i <= howMuchButtons; i++) {
    createBtn(i);
  }

  const createPaginationButtonsFirstAndLast = () => {
    const divForFirstButton = document.getElementById("first");
    const divForLastButton = document.getElementById("last");
    const firstButton = document.createElement("div");
    const lastButton = document.createElement("div");
    const content = document.getElementById("content");
    const arrAllItemsInHtml = [...content.querySelectorAll(".item")];

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

    const showFirst = () => {
      const partOfArr = arrAllItemsInHtml.slice(0, numberOfItemOnPage);
      partOfArr.forEach((element) => {
        element.classList.remove("hide");
      });
    };

    const showLast = () => {
      const partOfArr = arrAllItemsInHtml.slice(-numberOfItemOnPage);
      partOfArr.forEach((element) => {
        element.classList.remove("hide");
      });
    };

    divForFirstButton.innerHTML = " ";
    divForFirstButton.append(firstButton);
    firstButton.classList.add("pagination-button", "no-padding");
    firstButton.textContent = "< First";
    firstButton.addEventListener("click", (event) => {
      const a = event.target;
      HideAllItems();
      showFirst();
      refreshActiveStatus(a);
    });
    divForLastButton.innerHTML = " ";
    divForLastButton.append(lastButton);
    lastButton.classList.add("pagination-button", "no-padding");
    lastButton.textContent = "Last >";
    lastButton.addEventListener("click", (event) => {
      const a = event.target;

      HideAllItems();
      showLast();
      refreshActiveStatus(a);
    });
  };
  createPaginationButtonsFirstAndLast();
  stopHoverOnPaginationButtonsFirstAndLast();
};
const loadingContent = async function getData() {
  const aaa = await fetch(urlJson);
  const json = await aaa.json();
  setTimeout(() => createAllItems(json), 1000);
  setTimeout(() => createPagination(json), 1500);
};

loadingContent();

const loadingFilteredContent = async (year) => {
  const content = document.getElementById("content");
  content.innerHTML = " ";
  const json = await fetch(urlJson);
  const data = await json.json();
  data.forEach((element) => {
    if (element.year === +year) {
      createItem(element);
    }
    if (year === "allArticle") {
      createItem(element);
    }
  });
  createPagination(data);
};

const createFilterButtonsAndUrlParametres = (btn) =>
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (btn.id !=="allArticle") {
      history.pushState({ id: `${btn.id}` }, "", `?year=${btn.id}`);
    }
    else {
      history.pushState({ id: `${btn.id}` }, "", "?");
    };
    loadingFilteredContent(btn.id);

  });

const createFilters = () => {
  const allAncors = document.querySelectorAll(".year");
  allAncors.forEach((element) => {
    const ancorFilterYear = document.getElementById(`${element.id}`);
    createFilterButtonsAndUrlParametres(ancorFilterYear);
  });
};

// ?keyword=test&

const createActionForSearcIcon = () => {
  const searchIcon = document.querySelector(".search__icon");
  console.log(
    "🚀 ~ file: script.js ~ line 235 ~ createActionForSearcIcon ~ searchIcon",
    searchIcon
  );
  const searchForm = document.getElementById("mySearch");
  console.log(
    "🚀 ~ file: script.js ~ line 237 ~ createActionForSearcIcon ~ searchForm",
    searchForm
  );
  searchIcon.addEventListener("click", () => {
    console.log("123");
    history.pushState(
      { id: `${searchForm.value}` },
      "",
      `?keyword=${searchForm.value}`
    );
    createActionForSearcIcon();
  });
};

createActionForSearcIcon();

createFilters();
// #search
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
      };
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

creatActiveStyleNavButton();


//search

const search =() => {
function submit(evt) {
  evt.preventDefault();
}

function filter(evt) {
  evt.preventDefault();
  var input = document.getElementById("mySearch");
  var inputValue = input.value.toUpperCase();
  var cards = document.querySelectorAll(".item");

  cards.forEach(function getMatch(info) {
    let heading = info.querySelector("h2");
    let headingContent = heading.innerHTML.toUpperCase();

    if (headingContent.includes(inputValue)) {
      info.classList.add("show");
      info.classList.remove("hide-result");
    } else {
      info.classList.add("hide-result");
      info.classList.remove("show");
    }
  });
}

function autoReset() {
  let input = document.getElementById("mySearch");
  let cards = document.querySelectorAll(".item");

  cards.forEach(function getMatch(info) {
    if ((input.value == null, input.value == "")) {
      info.classList.remove("show");
      createPagination()
    } else {
      return;
    }
  });




}

let form = document.querySelector(".search");

form.addEventListener("keyup", filter);
form.addEventListener("keyup", autoReset);
form.addEventListener("submit", submit);

}
search()
//active status to filter year buttons

const createActiveStatusOnClickToFilterYearButtons = () => {
  const divList = document.querySelector(".list-of-years");
  const arrayOfYears = divList.querySelectorAll(".year");
  arrayOfYears.forEach((element) => {
    element.addEventListener("click", () => {
      arrayOfYears.forEach((element) => {
        element.classList.remove("active-article");
      });
      element.classList.add("active-article");
    });
  });
};

createActiveStatusOnClickToFilterYearButtons();

// dropdauwn of years in mobile

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
createDropdown();

// burger
const createBurgerMenu = () => {
  const listMenuPage = document.getElementById("navbarSupportedContent");
  const burgerButton = document.querySelector(".burger");
  const arrPages = listMenuPage.querySelectorAll(".nav-li");
  burgerButton.addEventListener("click", (e) => {
    if (listMenuPage.classList.contains("show")) {
      listMenuPage.classList.remove("show");
    } else {
      listMenuPage.classList.add("show");
      arrPages.forEach((element) => {
        element.addEventListener("click", () => {
          listMenuPage.classList.remove("show");
        });
      });
    }
  });
};
createBurgerMenu();

// фокус на инпуте при нажатии на  кнопку из навбар
const createFocusOnSearchInput = () => {
  const input = document.getElementById("mySearch");
  const searchButton = document.getElementById("search-svg");

  searchButton.addEventListener("click", function () {
    input.focus();
  });
};

createFocusOnSearchInput();
