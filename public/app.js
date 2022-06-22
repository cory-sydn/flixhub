//  POSTER SLIDER
const posterSlideWrapper = document.querySelector(".poster-slider__wrapper")
const posterLeftArrow = document.querySelector(".poster-slider__left-arrow")
const posterRightArrow = document.querySelector(".poster-slider__right-arrow")
const posters = document.querySelectorAll(".featured-content")
const poster = document.querySelector("[data-index='0']")
const date = document.querySelector('.footer-date')
let screenWidth = window.screen.availWidth


let direction = 0
let current = 1
function posterSlider(){
    let posterArea = screenWidth - 50
    if( (current === (posters.length +1) || (current === 0) ) ) {
        current = 1
        posterSlideWrapper.style.transform = 'translateX(0)'
    } else {
        posterSlideWrapper.style.transform = `translateX(${ posterSlideWrapper.computedStyleMap().get("transform")[0].x.value - (direction * posterArea)}px)`
    }
   
    window.addEventListener('resize', () => {
    screenWidth =  window.screen.availWidth
    posterSlideWrapper.style.transform = 'translateX(0)'
})
}

posterLeftArrow.addEventListener('click', ()=> {
    direction = -1
    current--
    posterSlider()
})

posterRightArrow.addEventListener('click', ()=>{
    direction = 1
    current++
    posterSlider()
})

//  MOVIES  SLIDER

const slideWrapper = document.querySelectorAll(".featured-content__slider-wrapper")
const rightArrow = document.querySelectorAll(".slider__right-arrow")
const leftArrow = document.querySelectorAll(".slider__left-arrow")
const swipeImg = document.querySelectorAll(".swipe-img")


rightArrow.forEach((arrow, i) => {
    
    const swipeItemWidth =swipeImg[0].computedStyleMap().get("width").value + (swipeImg[0].computedStyleMap().get("margin-left").value)*2
    const itemCount = slideWrapper[i].querySelectorAll("img").length
  
    const slideLength = swipeItemWidth * itemCount
    
    function resetTransform(i){
        slideWrapper[i].style.transform = "translateX(0)"
        leftArrow[i].style.setProperty('display', "none")     
    } 
    arrow.addEventListener('click', () => {      
        if( slideLength <  (- slideWrapper[i].computedStyleMap().get("transform")[0].x.value + screenWidth - 50) ) {
            resetTransform(i)            
        } else {
           slideWrapper[i].style.transform = `translateX(${slideWrapper[i].computedStyleMap().get("transform")[0].x.value - swipeItemWidth}px)`
           leftArrow[i].style.setProperty('display', "flex")
        }        
    })
    leftArrow.forEach((arrow, i) => {
        arrow.addEventListener('click',()=>{
            if( screenWidth >  ( - slideWrapper[i].computedStyleMap().get("transform")[0].x.value +(swipeItemWidth*2) )) {
                resetTransform(i)
            } else {
                slideWrapper[i].style.transform = `translateX(${slideWrapper[i].computedStyleMap().get("transform")[0].x.value + swipeItemWidth}px)`
            }
        })
    })
    window.addEventListener('resize', () => {
        screenWidth =  window.screen.availWidth
        resetTransform(i)
    })
})

date.innerHTML = new Date().getFullYear()