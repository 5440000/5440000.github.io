const urlJson = "https://5440000.github.io/items.json";

const createItem = (obj) => {
  const content = document.querySelector(".content");
  const div = document.createElement("div");
  div.classList.add("item", "no-padding", "row");
  div.insertAdjacentHTML(
    "afterbegin",
    `        
      <div class="item-overlay no-padding col-xl-3 col-lg-4 col-md-5 col-sm  item__wrapper align-self-center ">
          <img
          class="item__image ${obj.year}"
          src="${obj.url}"
          alt=""
          />
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7 col-sm description flex-column justify-content-center">
          <div class="col no-padding description__article-title">${obj.articleTitle}</div>
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
            // ********
    const divWithPaginationButtons =
    document.getElementById("pag-buttons");
    const allActiveButton =
      [...divWithPaginationButtons.querySelectorAll(".active-pagination")];
    allActiveButton.forEach((element) => {
      element.classList.remove("active-pagination");
    });
// ********************
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

  // ________________________________________________________________
  const createPaginationButtonsFirstAndLast = () => {
    const divForFirstButton = document.getElementById("first");
    const divForLastButton = document.getElementById("last");
    const firstButton = document.createElement("a");
    const lastButton = document.createElement("a");
    const content = document.getElementById("content");
    const arrAllItemsInHtml = [...content.querySelectorAll(".item")];

    const refreshActiveStatus = (e) => {
      
      const divWithPaginationButtons =
      document.getElementById("pag-buttons");
      const allActiveButton =
        [...divWithPaginationButtons.querySelectorAll(".active-pagination")];
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

    divForFirstButton.append(firstButton);
    firstButton.classList.add("pagination-button");
    firstButton.textContent = "< First";
    firstButton.addEventListener("click", (event) => {
      const a = event.target;
      HideAllItems();
      showFirst();
      console.log(a);
      refreshActiveStatus(a);
    });

    divForLastButton.append(lastButton);
    lastButton.classList.add("pagination-button");
    lastButton.textContent = "Last >";
    lastButton.addEventListener("click", (event) => {
      const a = event.target;

      HideAllItems();
      showFirst();
      console.log(a);
      refreshActiveStatus(a);
    });
  };
  createPaginationButtonsFirstAndLast();

  // ________________________________________________________________
};
// __________________________________________________________________________
const loadingContent = async function getData() {
  const aaa = await fetch(urlJson);
  const json = await aaa.json();
  //   setTimeout(() => createAllItems(json), 1500);
  createAllItems(json);
  createPagination(json);
};

loadingContent();

const loadingFilteredContent = async function getData(year) {
  const content = document.getElementById("content");
  content.innerHTML = " ";
  const aaa = await fetch(urlJson);
  const json = await aaa.json();
  json.forEach((element) => {
    if (element.year === +year) {
      createItem(element);
    }
    if (year === "allArticle") {
      createItem(element);
    }
  });
  createPagination(json);
};

const createFilterButtonsAndUrlParametres = (btn) =>
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState({ id: `${btn.id}` }, "", `?year=${btn.id}`);
    const a = btn.id;
    loadingFilteredContent(a);
  });

const createFilters = () => {
  const allAncors = document.querySelectorAll("a");
  allAncors.forEach((element) => {
    if (element.dataset.id == "filter") {
      const ancorFilterYear = document.getElementById(`${element.id}`);
      createFilterButtonsAndUrlParametres(ancorFilterYear);
    }
  });
};

createFilters();

const createUrlParametersSearch = () => {
  const searchForm = document.getElementById("mySearch");
  searchForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      history.pushState(
        { id: `${searchForm.value}` },
        "",
        `?keyword=${searchForm.value}`
      );
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
