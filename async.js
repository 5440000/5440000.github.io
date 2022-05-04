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

const loadingContent = async function getData() {
  const json = await fetch(urlJson);
  const data = await json.json();
  const itemsOnPage = 5 
  const firstItems = data.filter((e,index)=>index < itemsOnPage);
  firstItems.map(createItem)
}
loadingContent()

// const createPaginationButton = (i) => {
//   const content = document.getElementById("for-buttons");
//   const btn = document.createElement("div");
//   btn.innerHTML = i;

//   btn.classList.add("col-1", "pagination-button");
//   if (i === 1) {
//     btn.classList.add("active-pagination");
//   }
//   content.append(btn);
//   btn.addEventListener("click", () => {
//     const pagButtons = content.querySelectorAll(".pagination-button");
//     pagButtons.forEach((element) => {
//       const divWithPaginationButtons = document.getElementById("pag-buttons");
//       const allActiveButton = [
//         ...divWithPaginationButtons.querySelectorAll(".active-pagination"),
//       ];

//       allActiveButton.forEach((element) => {
//         element.classList.remove("active-pagination");
//       });
//       element.classList.remove("active-pagination");
//     });
//     btn.classList.add("active-pagination");

//     const showPagination = (i) => {
//       const startIndex = i * numberOfItemOnPage - numberOfItemOnPage;
//       const lastIndex = i * numberOfItemOnPage - 1;
//       const renderedItems = arrAllItemsInHtml.slice(startIndex, lastIndex);
//       renderedItems.forEach((element) => {
//         element.classList.remove("hide");
//       });
//     };

//     showPagination(i);
//   });
// };
