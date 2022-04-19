const urlJson = "https://5440000.github.io/items.json";

const loadingContent = async function getData() {
  // const response = await fetchWithTimeout('/games', {
  //     timeout: 6000
  //   });

  const aaa = await fetch(urlJson);
  const json = await aaa.json();

  createAllItems(json);
};

// year, url, articleTitle, text, writerName, company
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
