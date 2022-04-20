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
    if (element.year === (+year)) {
      createItem(element);
    }  
  });
};


const goBtnGo = (btn)=>
btn.addEventListener("click", () => {
    history.pushState({id:`${btn.id}`}, "",`?year=${btn.id}`)
    const a = btn.id
    loadingFilteredContent(a);
});


const btnAllArticle = document.getElementById("all-article");
btnAllArticle.addEventListener("click", () => {
    history.pushState({id:`${btnAllArticle.id}`}, "",`?year=AllYear`)
    loadingContent();
});


const btnYear2022 = document.getElementById("2022");
goBtnGo(btnYear2022)

const btnYear2021 = document.getElementById("2021");
goBtnGo(btnYear2021)

const btnYear2020 = document.getElementById("2020");
goBtnGo(btnYear2020)

const btnYear2019 = document.getElementById("2019");
goBtnGo(btnYear2019)

const btnYear2018 = document.getElementById("2018");
goBtnGo(btnYear2018)

const btnYear2017 = document.getElementById("2017");
goBtnGo(btnYear2017)

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
setTimeout(() => loadingContent(), 2000);
