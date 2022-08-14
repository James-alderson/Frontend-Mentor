const CALCULATOR = document.querySelector("#calculator")
const BILL = document.querySelector("#bill")
const LABELS = document.querySelectorAll(".input__radio + label")
const CUSTOM_TIP = document.querySelector("#custom")
const PEOPLE = document.querySelector("#people")
const TIP_AMOUNT = document.querySelector("#tipAmount")
const TOTAL = document.querySelector("#total")
const RESET = document.querySelector("#reset")
const ERROR_TEXT = document.querySelector("#errorText")

// Reset calculator data
resetCalculator()

// Prevent calculator inputs to submit
CALCULATOR.addEventListener("submit", event => {
  event.preventDefault()
})

// Get label elements
LABELS.forEach(label => {
  label.addEventListener("click", switchAttribute)
  label.addEventListener("keyup", switchAttribute)
})

// Send (BILL, CUSTOM_TIP, PEOPLE) values for validate
BILL.addEventListener("input", event => {
  validateValue(event.target.value)
})
CUSTOM_TIP.addEventListener("input", event => {
  validateValue(event.target.value)
})
PEOPLE.addEventListener("input", event => {
  validateValue(event.target.value, true)
})


// Get and show values
const showValue = () => {
  let billValue = Number(BILL.value)
  let customTipValue = Number(CUSTOM_TIP.value)
  let peopleValue = Number(PEOPLE.value)
  let buttonsTip = CALCULATOR.querySelector(".input__radio[checked]")

  if (buttonsTip || customTipValue) {
    // Set tip value
    let tipValue = (customTipValue) ? customTipValue : Number(buttonsTip.value)

    if (billValue && peopleValue) {
      RESET.removeAttribute("disabled")
      let persent = ((billValue * tipValue) / 100)
      let tipAmount = (persent / peopleValue)
      let total = ((billValue + persent) / peopleValue)

      TIP_AMOUNT.innerHTML = `$${tipAmount.toFixed(2)}`
      TOTAL.innerHTML = `$${total.toFixed(2)}`
      TIP_AMOUNT.setAttribute("title", `$${tipAmount.toFixed(2)}`)
      TOTAL.setAttribute("title", `$${total.toFixed(2)}`)
    }
  }
}

// Set and remove [checked] attribute from tip, and reset CUSTOM_TIP value
function switchAttribute(event) {
  let targetTip = event.target
  let targetInput = targetTip.previousElementSibling
  let customTipValue = CUSTOM_TIP.value
  let activeTip = CALCULATOR.querySelector(".input__radio[checked]")

  // key " " === Spacebar key in keyboard
  if (event.key === " " || event.type === "click") {
    if (activeTip) activeTip.removeAttribute("checked")
    if (customTipValue) CUSTOM_TIP.value = null

    targetInput.setAttribute("checked", "true")
  }

  showValue()
}

// Remove [checked] attribute from tip, when enter value in CUSTOM_TIP
function resetTip() {
  let activeTip = CALCULATOR.querySelector(".input__radio[checked]")

  if (activeTip) activeTip.removeAttribute("checked")
}
CUSTOM_TIP.addEventListener("input", resetTip)

// Reset calculator output data
function resetOutput() {
  TIP_AMOUNT.innerHTML = "$0.00"
  TOTAL.innerHTML = "$0.00"
  TIP_AMOUNT.setAttribute("title", "$0.00")
  TOTAL.setAttribute("title", "$0.00")
}

// Reset calculator data and values
function resetCalculator() {
  let activeTip = CALCULATOR.querySelector(".input__radio[checked]")

  if (activeTip) activeTip.removeAttribute("checked")
  CALCULATOR.reset()
  RESET.setAttribute("disabled", "true")
  PEOPLE.classList.remove("input--error")
  resetOutput()
}
RESET.addEventListener("click", resetCalculator)

// Validate inputs value
function validateValue(value, check) {
  if (check) {
    if (value.length !== 0) {
      if (value == 0) {
        PEOPLE.classList.add("input--error")
        ERROR_TEXT.innerHTML = "Can't be zero"
        resetOutput()
      } else {
        PEOPLE.classList.remove("input--error")
      }
    } else {
      PEOPLE.classList.remove("input--error")
    }
  }
  if (value <= 0) {
    resetOutput()
    return
  }
  showValue()
}
