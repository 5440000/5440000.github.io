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
    if (element.year === +year) {
      createItem(element);
    }
  });
};

const goBtnGo = (btn) =>
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState({ id: `${btn.id}` }, "", `?year=${btn.id}`);
    const a = btn.id;
    loadingFilteredContent(a);
  });

const arrAncorsOfYear = () => {
  const allAncors = document.querySelectorAll("a");
  allAncors.forEach((element) => {
    if (element.dataset.id == "filter") {
      const ancorFilterYear = document.getElementById(`${element.id}`);
      goBtnGo(ancorFilterYear);
    }
  });
};

arrAncorsOfYear();

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

const searchForm = document.getElementById("mySearch");
searchForm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    history.pushState({ id: 123 }, "", `?keyword=${searchForm.value}`);
  }
});

setTimeout(() => loadingContent(), 2000);
