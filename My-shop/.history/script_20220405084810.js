const modal = document.getElementById('mymodal')
const btn = document.getElementById('price__button')
const span = document.getElementsByClassName("close")[0]

btn.onclick = function () {
    modal.style.display = 'block';
}

span.onclick = function () {
    modal.style.display = "none"
}