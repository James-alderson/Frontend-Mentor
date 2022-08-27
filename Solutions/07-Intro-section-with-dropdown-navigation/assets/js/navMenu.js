const navMenu = document.querySelector("#navTop")
const dropBtns = navMenu.querySelectorAll(".btn-dropdown")
const openNav = document.querySelector("#btnNav__open")
const closeNav = document.querySelector("#btnNav__close")
const darkShadow = document.querySelector("#navDarkShadow")
let preventEvent = false


const getDropBtnA = (dropBtn) => {
  const toggleFunc = (event) => {
    const targetDrop = event.target
    const targetDropContent = targetDrop.nextElementSibling

    // Toggle .active class on target .dropBtn;
    targetDrop.classList.toggle("active")

    /*
      if: screen with lower than 800 pixel,
        if: .targetBtn have a .active class,
            Add max-height to be nextElementSibling(.dropdonw-content);
        else: .targetBtn don't have a .active class,
              Remove max-height from nextElementSibling(.dropdonw-content);
    */
    if (window.innerWidth < 800) {
      if (targetDrop.classList.contains("active")) {
        targetDropContent.style.maxHeight = targetDropContent.scrollHeight + "px"
      } else {
        targetDropContent.style.maxHeight = null
      }
    }
  }
  dropBtn.addEventListener("click", toggleFunc)
}
dropBtns.forEach(getDropBtnA)


/*
  if: targetParentElem equal by openNav, 
      Add .active class on navMenu and darkShadow elements;
  elseIf: targetParentElem equal by closeNav or event target element equal by darkShadow,
          Remove .active class from navMenu and darkShadow elements;
*/
const navMenuFunc = (event) => {
  const targetParentElem = event.target.parentElement
  if (targetParentElem === openNav) {
    navMenu.classList.add("active")
    darkShadow.classList.add("active")
  }
  else if (targetParentElem === closeNav || event.target === darkShadow) {
    navMenu.classList.remove("active")
    darkShadow.classList.remove("active")
  }
}
openNav.addEventListener("click", navMenuFunc)
closeNav.addEventListener("click", navMenuFunc)
darkShadow.addEventListener("click", navMenuFunc)


/* ------ After change screen resolution ------ */
const responsiveFunc = () => {
  // When window resolution equal or bigger than 800 pixel;
  if (window.innerWidth >= 800) {
    /*
      if: navMenu have a .active class or darkShadow have a .active class,
          Remove .active class from navMenu and darkShadow;
    */
    if (navMenu.classList.contains("active") || darkShadow.classList.contains("active")) {
      navMenu.classList.remove("active")
      darkShadow.classList.remove("active")
    }

    /* 
      if: .dropBtn have a .active class,
        if: activeDrop and activeContent is true,
            Remove active class from dropBtn and Remove max height style on activeContent;
    */
    const getDropBtn = (dropBtn) => {
      if (dropBtn.classList.contains("active")) {
        const activeDrop = navMenu.querySelector(".btn-dropdown.active")
        const activeContent = activeDrop.nextElementSibling.style.maxHeight

        if (activeDrop && activeContent) {
          dropBtn.classList.remove("active")
          dropBtn.nextElementSibling.style.maxHeight = null
        }
      }
    }
    dropBtns.forEach(getDropBtn)


    /* ------ When clicked on window ------
      preventEvent variable to avoid resending the event;
      if: window resolution equal or bigger than 800 pixel,
        if: targetElem not equal by .btn-dropdown element and targetElem not equal by .dropdown-list element,
            Remove active class from all dropBtn elements;
        elseIf: targetElem equal by .btn-dropdown element and dropBtn elements haved a .active class,
                Remove .active class from all dropBtn elements and add .active class to targetElem;
      else: window resolution lower than 800 pixel,
          if: dropBtn have a .active class,
            if: activeDrop is true and activeContent is false,
                Remove .active class from all dropBtn elements
    */
    if (!preventEvent) {
      preventEvent = true

      const getDropBtn = (dropBtn) => {
        const removeFunc = (event) => {
          if (window.innerWidth >= 800) {
            const targetElem = event.target

            if (!targetElem.matches(".btn-dropdown") && !targetElem.matches(".dropdown-list")) {
              dropBtn.classList.remove("active")
            } else if (targetElem.matches(".btn-dropdown") && dropBtn.matches(".active")) {
              dropBtn.classList.remove("active")
              targetElem.classList.add("active")
            }
          }
        }
        window.addEventListener("click", removeFunc)
      }
      dropBtns.forEach(getDropBtn)
    }
  } else {
    const getDropBtn = (dropBtn) => {
      if (dropBtn.classList.contains("active")) {
        const activeDrop = navMenu.querySelector(".btn-dropdown.active")
        const activeContent = activeDrop.nextElementSibling.style.maxHeight

        if (activeDrop && !activeContent) {
          dropBtn.classList.remove("active")
        }
      }
    }
    dropBtns.forEach(getDropBtn)
  }
}
window.addEventListener("resize", responsiveFunc)


/* ------ Before change screen resolution ------ */
// This function comments writed on line 93
const getDropBtnB = (dropBtn) => {
  const removeFunc = (event) => {
    if (window.innerWidth >= 800) {
      const targetElem = event.target
      if (!targetElem.matches(".btn-dropdown") && !targetElem.matches(".dropdown-list")) {
        dropBtn.classList.remove("active")
      } else if (targetElem.matches(".btn-dropdown") && dropBtn.matches(".active")) {
        dropBtn.classList.remove("active")
        targetElem.classList.add("active")
      }
    }
  }
  window.addEventListener("click", removeFunc)
}
dropBtns.forEach(getDropBtnB)
