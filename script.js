const urlJson = "https://5440000.github.io/items.json";

const loadingContent = async function getData() {
  const aaa = await fetch(urlJson);
  const json = await aaa.json();
  createAllItems(json);
};

const loadingFilteredContent = async function getData(year) {
  const content = document.getElementById("content");
  content.innerHTML = " ";
  const aaa = await fetch(urlJson);
  const json = await aaa.json();
  json.forEach((element) => {
    if (element.year === year) {
      createItem(element);
    } 
  });
};

// year, url, articleTitle, text, writerName, company
const btnAllArticle = document.getElementById("all-article");
btnAllArticle.addEventListener("click", () => {
    loadingContent();
});

const btnYear2022 = document.getElementById("year2022");
btnYear2022.addEventListener("click", () => {
    loadingFilteredContent(2022);
});
const btnYear2021 = document.getElementById("year2021");
btnYear2021.addEventListener("click", () => {
    loadingFilteredContent(2021);
});
const btnYear2020 = document.getElementById("year2020");
btnYear2020.addEventListener("click", () => {
    loadingFilteredContent(2020);
});
const btnYear2019 = document.getElementById("year2019");
btnYear2019.addEventListener("click", () => {
    loadingFilteredContent(2019);
});
const btnYear2018 = document.getElementById("year2018");
btnYear2018.addEventListener("click", () => {
    loadingFilteredContent(2018);
});
const btnYear2017 = document.getElementById("year2017");
btnYear2017.addEventListener("click", () => {
    loadingFilteredContent(2017);
});

const createItem = (obj) => {
  const content = document.querySelector(".content");
  const div = document.createElement("div");
  div.classList.add("item");
  div.classList.add("row");

  div.insertAdjacentHTML(
    "afterbegin",
    `        
    <div class="col-3 item__wrapper">
        <img
        class="item__image ${obj.year}"
        src="${obj.url}"
        alt=""
        />
    </div>
    <div class="col-9 description flex-column">
        <div class="row description__article-title">${obj.articleTitle}</div>
        <div class="row description__text">${obj.text}
        </div>
        <div class="row description__writer-name">${obj.writerName}</div>
        <div class="row description__company">${obj.company}</div>
    </div>`
  );
  content.append(div);
};

const createAllItems = (arrItems) => {
  arrItems.forEach((element) => {
    createItem(element);
  });
};
setTimeout(() => loadingContent(), 2000);
