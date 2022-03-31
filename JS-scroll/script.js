const arrCars = [
  {
    src: "https://wallpaperaccess.com/full/1669477.jpg",
    alt: "Toyota",
  },
  {
    src: "https://wallpapersmug.com/download/750x1334/edd675/art-toyota-supra-neon-lights-4k.jpg",
    alt: "Mazda",
  },
  {
    src: "https://iphoneswallpapers.com/wp-content/uploads/2021/05/Toyota-Supra-iPhone-Wallpaper.jpg",
    alt: "not Honda",
  },
  {
    src: "https://i.pinimg.com/originals/21/28/09/21280930bb8191a0362fc0c9a925f332.jpg",
    alt: "not VW",
  },
];

const divForImage = document.getElementById("wrapper__list"); //список

function getImages(arrCars) {
  for (let i = 0; i < arrCars.length; i++) {
    let div = document.createElement("div");
    div.className = "wrapper__list__item ";
    divForImage.appendChild(div);
    let img = document.createElement("img");
    img.src = arrCars[i].src;
    img.alt = arrCars[i].alt;
    img.className = "mini__img";
    div.appendChild(img);
  }
}
getImages(arrCars);

const arrOfImages = document.getElementsByClassName("mini__img");

function ShowAllCars(arrOfImages) {
  const elementBigImage = document.getElementById("big-image");
  for (let i = 0; i < arrOfImages.length; i++) {
    arrOfImages[i].addEventListener("click", function (e) {
      const srcOfImage = e.target.src;
      elementBigImage.src = srcOfImage;
    });
  }
}
ShowAllCars(arrOfImages);
