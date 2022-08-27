const CURRENTS = document.querySelectorAll(".dashboard__duration--current")
const PREVIOUS = document.querySelectorAll(".dashboard__duration--previous")
const PARENT_BTNS = document.querySelector(".dashboard__timeframes")
const BTNS = Array.from(PARENT_BTNS.children)
const PRELOADER = document.querySelector(".loader")
const DATA_URL = "data.json"
const DELAY = 500

// When window is load
window.addEventListener("load", loadWindow)

// Get all buttons
BTNS.forEach(btn => {
  switchClass(btn)
})

// Switch .dashboard__btn--active class
function switchClass(button) {
  button.addEventListener("click", event => {
    let targetButton = event.target
    let buttonId = targetButton.getAttribute("id")
    let activeButton = PARENT_BTNS.querySelector(".dashboard__btn--active")

    if (targetButton.classList.contains("dashboard__btn--active")) return
    else {
      activeButton.classList.remove("dashboard__btn--active")
      targetButton.classList.add("dashboard__btn--active")
    }

    getReports(buttonId)
  })
}

// Get data on data.json file
function getReports(idValue) {
  let responseStatus = 0
  buttonStatus(responseStatus)
  fetch(DATA_URL)
    .then(response => {
      responseStatus = response.status
      buttonStatus(responseStatus)
      return response.json()
    })
    .then(data => {
      setReports(data, idValue)
    })
}

// Set reports on html elements
function setReports(report, id) {
  setTimeout(() => {
    CURRENTS.forEach((current, index) => {
      if (id === "timeframeDaily") current.innerHTML = `${report[index].timeframes.daily.current}hrs`
      if (id === "timeframeWeekly") current.innerHTML = `${report[index].timeframes.weekly.current}hrs`
      if (id === "timeframeMonthly") current.innerHTML = `${report[index].timeframes.monthly.current}hrs`
    })
    PREVIOUS.forEach((previous, index) => {
      if (id === "timeframeDaily") previous.innerHTML = `Last Day - ${report[index].timeframes.daily.previous}hrs`
      if (id === "timeframeWeekly") previous.innerHTML = `Last Week - ${report[index].timeframes.weekly.previous}hrs`
      if (id === "timeframeMonthly") previous.innerHTML = `Last Month - ${report[index].timeframes.monthly.previous}hrs`
    })
  }, DELAY)
}

// Set buttons status
function buttonStatus(status) {
  if (status === 0) {
    BTNS.forEach(btn => {
      btn.setAttribute("disabled", "true")
    })
  }
  setTimeout(() => {
    statusCode = status
    if (status === 200) {
      BTNS.forEach(btn => {
        btn.removeAttribute("disabled")
      })
    }
  }, DELAY)
}

// Get data when window is load
function loadWindow() {
  let responseStatus = 0
  fetch(DATA_URL)
    .then(response => {
      responseStatus = response.status
      return response.json()
    })
    .then(data => {
      if (responseStatus === 200) {
        CURRENTS.forEach((current, index) => {
          current.innerHTML = `${data[index].timeframes.weekly.current}hrs`
        })
        PREVIOUS.forEach((previous, index) => {
          previous.innerHTML = `Last Week - ${data[index].timeframes.weekly.previous}hrs`
        })

        loaderStatus(responseStatus)
      }
    })
}

// Set loader status
function loaderStatus(statusCode) {
  if (statusCode === 200) {
    PRELOADER.classList.add("hidden")
    document.body.style.overflow = "visible"
    setTimeout(() => {
      PRELOADER.style.display = "none"
    }, DELAY)
  }
}
