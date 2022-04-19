document.addEventListener("click", function (e) {
  const srcOfImage = e.target.src;
  const elementBigImage = document.getElementById("big-image");
  elementBigImage.src = srcOfImage;
  console.log(src);
});
