let seetingBox = document.querySelector(".setting");
let seetingBtn = document.querySelector(".setting .gear");
let seetingBtnIcon = document.querySelector(".setting .gear i");

function toggleSetting(open) {
  const isOpen = open ?? !seetingBox.classList.contains("open");
  seetingBox.classList.toggle("open", isOpen);
  seetingBtnIcon.classList.toggle("red", isOpen);
  seetingBtnIcon.classList.toggle("fa-spin", isOpen);
}
seetingBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleSetting();
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".setting")) {
    toggleSetting(false);
  }
});

// randomizbackground
let landingPage = document.querySelector(".landing-page");
let imglist = [
  "land1.jpg",
  "land2.jpg",
  "land3.jpg",
  "land4.webp",
  "land5.jpg",
  "land6.jpg",
];
let backgroundOption = true;
let backgroundInterval;
function randomizbackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imglist.length);
      landingPage.style.backgroundImage = `url(imgs/${imglist[random]})`;
      console.log(imglist[random]);
    }, 5000);
  }
}
let backgroundBtns = document.querySelectorAll(".background-option span");
let localBackgroundOption = localStorage.getItem("backgroundOption");
if (localBackgroundOption === null) {
  backgroundOption = true;
  randomizbackground();
}
if (localBackgroundOption !== null) {
  if (localBackgroundOption === "on" || localBackgroundOption === null) {
    backgroundOption = true;
    randomizbackground();
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".background-option span").forEach((x) => {
    x.classList.remove("active");
  });
  if (localBackgroundOption === "on") {
    document.querySelector(".background-option .on").classList.add("active");
  } else {
    document.querySelector(".background-option .off").classList.add("active");
  }
}

backgroundBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.option === "on") {
      backgroundOption = true;
      randomizbackground();
      localStorage.setItem("backgroundOption", e.target.dataset.option);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("backgroundOption", e.target.dataset.option);
    }
  });
});
// randomizbackground
// randomcolor

let colorList = document.querySelectorAll(".color-list span");
let mainColor = localStorage.getItem("mainColor");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colorList.forEach((x) => {
    x.classList.remove("active");
    if (x.dataset.color === mainColor) {
      x.classList.add("active");
    }
  });
}
colorList.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll("span").forEach((x) => {
      x.classList.remove("active");
    });
    e.target.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("mainColor", e.target.dataset.color);
  });
});
// randomcolor
// bullets shwing
let bulletsSpans = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let localBulletsOption = localStorage.getItem("bulletsOption");
if (localBulletsOption !== null) {
  if (localBulletsOption === "on") {
    bulletsContainer.style.display = "flex";
    bulletsSpans.forEach((x) => {
      x.classList.remove("active");
      if (x.dataset.option === localBulletsOption) {
        x.classList.add("active");
      }
    });
  } else {
    bulletsContainer.style.display = "none";
    bulletsSpans.forEach((x) => {
      x.classList.remove("active");
      if (x.dataset.option === localBulletsOption) {
        x.classList.add("active");
      }
    });
  }
}
bulletsSpans.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll("span").forEach((x) => {
      x.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.option === "off") {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bulletsOption", e.target.dataset.option);
    } else {
      bulletsContainer.style.display = "flex";
      localStorage.setItem("bulletsOption", e.target.dataset.option);
    }
  });
});

let bulletsTooltip = document.querySelectorAll(".nav-bullets div");

bulletsTooltip.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector("." + e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// the same function #################
// function scrollToSomeWhere(elements) {
//   elements.forEach((ele) => {
//     ele.addEventListener("click", (e) => {
//       e.preventDefault();

//       document.querySelector("." + e.target.dataset.section).scrollIntoView({
//         behavior: "smooth",
//       });
//     });
//   });
// }
// scrollToSomeWhere(bulletsTooltip)
// bullets shwing
// about observer
let skills = document.querySelectorAll(".skills .skill-holder span");
const aboutObserver = new IntersectionObserver((skills) => {
  skills.forEach(
    (skill) => {
      if (skill.isIntersecting) {
        skill.target.style.width = skill.target.dataset.width;
        aboutObserver.unobserve(skill.target);
      }
    },
    { threshold: 0.5 }
  );
});
skills.forEach((skill) => {
  aboutObserver.observe(skill);
});

// about observer

// start gallery
let allImgs = document.querySelectorAll(".gallery img");
allImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popUpImg = document.createElement("div");
    popUpImg.className = "imgOverlay";
    let popUpBox = document.createElement("div");
    popUpBox.className = "popup-box";
    let imghead = document.createElement("h2");
    imghead.className = "imgheader";
    imghead.innerHTML = e.target.alt;
    let img = document.createElement("img");
    img.src = e.target.src;
    let closeBtn = document.createElement("span");
    closeBtn.className = "clos-btn";
    closeBtn.appendChild(document.createTextNode("X"));
    popUpBox.appendChild(imghead);
    popUpBox.appendChild(img);
    popUpBox.appendChild(closeBtn);
    document.body.appendChild(popUpImg);
    document.body.appendChild(popUpBox);
  });
});
let popClosBtn = document.querySelector(" .clos-btn");

document.body.addEventListener("click", (e) => {
  if (e.target.className === "clos-btn") {
    document.querySelector(".popup-box").remove();
    document.querySelector(".imgOverlay").remove();
  }
});
// start gallery

// clear local storage
let clearBtn = document.querySelector(".reset");
clearBtn.onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// media btns
let menuBtn = document.querySelector(".header-area i");
let mobilemenu = document.querySelector(".header-area .links");
menuBtn.onclick = function () {
  this.classList.toggle("active");
  mobilemenu.classList.toggle("open-menu");
};
document.body.addEventListener("click", (e) => {
  if (e.target !== menuBtn && e.target !== mobilemenu) {
    mobilemenu.classList.remove("open-menu");
    menuBtn.classList.remove("active");
  }
});
