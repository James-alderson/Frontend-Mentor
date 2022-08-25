const adviceId = document.querySelector("#adviceId")
const adviceText = document.querySelector("#adviceText")
const adviceBtn = document.querySelector("#adviceBtn")

const loadAdviceContent = () => {
  // Generate random integer number between 1 to 224
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min)
  let randonInt = getRandomInt(1, 224)

  // After get random number, send random number on the end of url for get random advice
  fetch(`https://api.adviceslip.com/advice/${randonInt}`)
    .then(response => response.json())
    .then(data => {
      adviceId.innerHTML = `Advice #${data.slip.id}`
      adviceText.innerHTML = data.slip.advice
    })
    .catch(err => console.log(err))
}

// Call loadAdviceContent function
adviceBtn.addEventListener("click", loadAdviceContent)