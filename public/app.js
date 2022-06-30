//  HERO SLIDER
const posterSlideWrapper = document.querySelector(".poster-slider__wrapper")
const posterLeftArrow = document.querySelector(".poster-slider__left-arrow")
const posterRightArrow = document.querySelector(".poster-slider__right-arrow")
const posters = document.querySelectorAll(".featured-content")
const poster = document.querySelector("[data-index='0']")
const date = document.querySelector('.footer-date')


let posterIndex = 0;
let direction = 0;
function heroSlider() {

    posters.forEach((poster, index) => {        

        if (poster.classList.contains('active-hero--left')) {
            poster.classList.remove('active-hero--left')        
        }
        if (poster.classList.contains('active-hero--right')) {
            poster.classList.remove('active-hero--right')        
        }
        
        if (index === posterIndex) {
            direction === 0 ? poster.classList.add('active-hero--left') : poster.classList.add('active-hero--right')           
        }
    });
}

posterLeftArrow.addEventListener('click', ()=> {
    direction = 1
    posterIndex === 0 
        ? posterIndex = 3
        : posterIndex -= 1
    heroSlider(posterIndex);
})

posterRightArrow.addEventListener('click', ()=>{
    direction = 0
    posterIndex + 1 === posters.length 
      ? posterIndex = 0 
      : posterIndex += 1
    heroSlider(posterIndex);
})

const interval = setInterval(() => {
    direction = 0
    posterIndex + 1 === posters.length 
        ? posterIndex = 0 
        : posterIndex += 1
    heroSlider(posterIndex)
}, 7000)

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
        const screenWidth =  window.visualViewport.width
        const displayedWidth = (- slideWrapper[i].computedStyleMap().get("transform")[0].x.value + screenWidth - 50)

        if ((slideLength - displayedWidth) <  swipeItemWidth ) {
            const remainder = slideLength - displayedWidth
            slideWrapper[i].style.transform = `translateX(${slideWrapper[i].computedStyleMap().get("transform")[0].x.value - (remainder + 16) }px)`
        } else {
           slideWrapper[i].style.transform = `translateX(${slideWrapper[i].computedStyleMap().get("transform")[0].x.value - swipeItemWidth}px)`
           leftArrow[i].style.setProperty('display', "flex")
        }

        if (slideLength - displayedWidth < 0) return resetTransform(i)
    })

    leftArrow.forEach((arrow, i) => {
        arrow.addEventListener('click',()=>{
            const screenWidth =  window.visualViewport.width
            if( screenWidth >  ( - slideWrapper[i].computedStyleMap().get("transform")[0].x.value +(swipeItemWidth*2) )) {
                resetTransform(i)
            } else {
                slideWrapper[i].style.transform = `translateX(${slideWrapper[i].computedStyleMap().get("transform")[0].x.value + swipeItemWidth}px)`
            }
        })
    })
    window.addEventListener('resize', () => {
        resetTransform(i)
    })
})

date.innerHTML = new Date().getFullYear()