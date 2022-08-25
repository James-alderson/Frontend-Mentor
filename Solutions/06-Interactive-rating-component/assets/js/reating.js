const btnGroup = document.querySelector("#btnGroup")
const ranks = Array.from(btnGroup.children) // Get all children from #btnGroup
const submitBtn = document.querySelector("#submitBtn")
const rankContent = document.querySelector("#rankContent")
const thankContent = document.querySelector("#thankContent")
const rankSelected = document.querySelector("#rankSelected")

// When rank is focused
const focusFunc = (e) => {
  const targetRank = e.target
  const targetRankValue = targetRank.innerHTML
  const activeRank = btnGroup.querySelector(".btn-rank.btn-active")
  /* 
     Check if #btnGroup children is have a .btn-active class,
     and user selected rank is not equal by .activeRank(previous selected rank):
      -- Remove .btn-active class from #btnGroup children
  */
  if (activeRank && targetRank !== activeRank) {
    activeRank.classList.remove("btn-active")
  }

  // When #submitBtn clicked
  const submitFunc = () => {
    rankContent.classList.remove("active")
    thankContent.classList.add("active")
    rankSelected.innerHTML = `You selected ${targetRankValue} out of 5`
  }
  submitBtn.addEventListener("click", submitFunc)
}

// When rank is unfocused(blur)
const blurFunc = (e) => {
  const targetRank = e.target
  // Add .btn-active class on user unfocused rank
  targetRank.classList.add("btn-active")
}

// Create loop for get access all rank
ranks.forEach(rank => {
  rank.addEventListener("focus", focusFunc)
  rank.addEventListener("blur", blurFunc)
})
