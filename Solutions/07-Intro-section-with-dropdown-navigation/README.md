# Frontend Mentor - Intro section with dropdown navigation solution

This is a solution to the [Intro section with dropdown navigation challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the relevant dropdown menus on desktop and mobile when interacting with the navigation links
- View the optimal layout for the content depending on their device's screen size
- See hover states for all interactive elements on the page

### Screenshot

![](./assets/screenshots/mobile-design.png)
![](./assets/screenshots/tablet-design.png)
![](./assets/screenshots/desktop-design.png)

### Links

- Solution URL: [Solution](https://www.frontendmentor.io/solutions/intro-section-with-dropdown-navigation-RcPCo6CSvM)
- Live Site URL: [Live Demo](https://james-alderson.github.io/Frontend-Mentor/Solutions/07-Intro-section-with-dropdown-navigation/index.html)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- CSS Vendor Prefixes

### What I learned

In this project I learned to used `matches()` javaScript method.

The `matches()` method of the Element interface tests whether the element would be selected by the specified CSS selector.

To see how you can add code snippets, see below:

```js
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
```

### Continued development

Create simple tablet design, from 800px to 1100px.

### Useful resources

- [W3Schools](https://www.w3schools.com/howto/howto_js_dropdown.asp) - This helped me for create dropdown menu.
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) - This helped me for use `matches()` javaScript method.

## Author

- Frontend Mentor - [@James-alderson](https://www.frontendmentor.io/profile/James-alderson)
