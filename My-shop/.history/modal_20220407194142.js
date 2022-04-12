const shop = document.getElementById("shop")
const banner = document.createElement("div")
banner.classList.add("#shop")
const theFirstChild = shop.firstChild
console.log(theFirstChild)
shop.insertBefore(banner, theFirstChild);














function _createModal({id, img, name, price, currancy, madein,}) {
  const modal = document.createElement("div");
  const DEFAULT_WIDTH = "600px"
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="modal-overlay" data-close = "true">
        <div class="modal-window style="width ${DEFAULT_WIDTH}">
          <div class="modal-header">
            <span class="modal-title">Наручные часы  ${name}</span>
            <span class="modal-close"  data-close="true">&times;</span>
          </div>
          <div class="modal-body">
            <div class="modal-body-img" style="background-image:url(${img})" ></div>
            <div class="modal-good-info">

              <div class="price"> 
              Марка    
              <b>${name}</b> <br><br><br><br><br>
              Стоимость  <b>${price} ${currancy}</b> 
              <br><br><br><br><br>
              Производитель  <b>${madein}</b>
              </div>
            </div>
          </div>
          
          
          <div class="modal-footer">
              <button class="modal-btn modal-btn-add-in-cart">В корзину</button>
              <button class="modal-btn modal-btn-close" data-close = "true" >Закрыть окно</button>
          </div>
        </div>
      </div>
    `
  );
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  console.log(options)
  const $modal = _createModal(options);
  const modal = {
    open() {
      $modal.classList.add("open");
    },
    close() {
      $modal.classList.remove("open");
    },
    // destroy() {},
  };

  $modal.addEventListener('click', event =>{
      if(event.target.dataset.close) {
          modal.close()
      }
  })
  return modal
};

// что надо сделать

// -в модальлном окне отобразить картинку название стоимость
//     для этого при клике индецифицировать блок

