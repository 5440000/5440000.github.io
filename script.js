const urlJson = "https://5440000.github.io/items.json";

const createItem = (obj) => {
  const content = document.querySelector(".content");
  const div = document.createElement("div");
  div.classList.add("item");
  div.classList.add("row");
  div.insertAdjacentHTML(
    "afterbegin",
    `        
      <div class="col-xl-3 col-lg-4 col-md-5 col-sm  item__wrapper align-self-center ">
          <img
          class="item__image ${obj.year}"
          src="${obj.url}"
          alt=""
          />
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7 col-sm description flex-column justify-content-center">
          <div class="col description__article-title">${obj.articleTitle}</div>
          <div class="col description__text">${obj.text}
          </div>
          <div class="col description__writer-name">${obj.writerName}</div>
          <div class="col description__company">${obj.company}</div>
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
    content.append(btn);
    console.log(i);
    btn.addEventListener("click", () => {
      const pagButtons = content.querySelectorAll(".pagination-button");
      pagButtons.forEach((element) => {
        element.classList.remove("active");
      });
      btn.classList.add("active");
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
};

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
