const LOADING = document.querySelector("#loading")

window.addEventListener("load", e => {
  LOADING.classList.add("hidden")
  document.body.style.overflow = "visible"

  setTimeout(() => {
    LOADING.style.display = "none"
  }, 500)
})
