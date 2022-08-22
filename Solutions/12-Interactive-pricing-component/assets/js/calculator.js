const PAGEVIEWS = document.querySelector("#pageViews")
const PRICE = document.querySelector("#price")
const RANGE = document.querySelector("#range")
const BILLING = document.querySelector("#billing")
const CHECKBOX = document.querySelector("#billing + label")
const BUTTON = document.querySelector("#submit")
const DISCOUNT = document.querySelector("#discount")

window.addEventListener("load", loadFunc)
window.addEventListener("resize", discountText)
RANGE.addEventListener("input", rangeFunc)
BILLING.addEventListener("change", billFunc)
CHECKBOX.addEventListener("keyup", checkFunc)

function loadFunc() {
  rangeFunc()
  discountText()
}

function rangeFunc() {
  let rangeValue = Number(RANGE.value)

  billFunc()
  buttonStatus(rangeValue)

  PAGEVIEWS.innerHTML = `${rangeValue * 2}K Pageviews`
  RANGE.style.backgroundImage = `linear-gradient(to right, #a2f2e9 ${rangeValue}%, #f1f5fe ${rangeValue}%)`
}

function billFunc() {
  let checked = BILLING.checked
  let price = RANGE.value * 0.32
  let calcPercent = ((price * 25) / 100).toFixed(2)

  if (checked) PRICE.innerHTML = `$${calcPercent}`
  else PRICE.innerHTML = `$${(price).toFixed(2)}`
}

function buttonStatus(value) {
  if (value === 0) BUTTON.setAttribute("disabled", "")
  else BUTTON.removeAttribute("disabled")
}

function checkFunc(event) {
  if (event.key === " " || event.keyCode === 32) {
    BILLING.toggleAttribute("checked")
    billFunc()
  }
}

function discountText() {
  if (window.innerWidth > 767) {
    DISCOUNT.innerHTML = "25% discount"
  } else {
    DISCOUNT.innerHTML = "-25%"
  }
}
