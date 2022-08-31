const CARDS = document.querySelectorAll(".card")
const SHINES = document.querySelectorAll(".shine")
const LIGHTBOX = document.querySelector("#lightbox")
const LIGHTBOX_IMAGE = LIGHTBOX.querySelector("img")

SHINES.forEach(shine => {
  shine.addEventListener("click", checkTargetElement)
})
CARDS.forEach(card => {
  card.addEventListener("keyup", checkTargetElement)
})

LIGHTBOX.addEventListener("click", closeLightbox)
window.addEventListener("keyup", event => {
  if (event.key === "Escape" || event.key === 27) closeLightbox()
})

function checkTargetElement(event) {
  let targetElement = event.target
  let targetImage = targetElement.querySelector(".card__img")

  if (targetElement.classList.contains("card__img")) openLightbox(targetElement)
  if (targetElement.classList.contains("shine")) openLightbox(targetElement, targetImage)
  if (targetElement.classList.contains("card")) {
    if (event.key === "Enter" || event.keyCode === 13) openLightbox(targetElement, targetImage)
  }
}

function openLightbox(targetElem, targetImg) {
  if (targetImg) {
    LIGHTBOX_IMAGE.src = targetImg.src
    LIGHTBOX_IMAGE.alt = targetImg.alt
  } else {
    LIGHTBOX_IMAGE.src = targetElem.src
    LIGHTBOX_IMAGE.alt = targetElem.alt
  }

  LIGHTBOX.classList.add("active")
  LIGHTBOX_IMAGE.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  LIGHTBOX.classList.remove("active")
  LIGHTBOX_IMAGE.style.display = "none"
  document.body.style.overflow = "visible"
}
