const paginationNav = document.getElementById("pagination-nav")
const pageNumbers = paginationNav.getElementsByClassName("grid-page__number")
const forward = paginationNav.querySelector("#pagination-forward")
const backward = paginationNav.querySelector("#pagination-backward")
const form = paginationNav.querySelector(".grid-page__nav-form")
const formBtn= paginationNav.querySelector(".grid-page__nav-button")
const firstPageButton = document.getElementById("first-page__button")
const lastPageButton = document.getElementById("last-page__button")
const inputPageButton = document.getElementById("grid-page__nav-button")
// Pagination Numbers
Array.prototype.forEach.call(pageNumbers, button  => {
    button.addEventListener('click',() => {
        handleActivePagination(Number(button.innerHTML))
    })
});

backward.addEventListener('click', () => {
    const current = paginationNav.querySelector(".active-page-nav")
    handleActivePagination(Number(current.innerHTML) - 1)
})

forward.addEventListener('click', () => {
    const current = paginationNav.querySelector(".active-page-nav")
    handleActivePagination(Number(current.innerHTML) + 1)
})

inputPageButton.addEventListener('click', (e)=> {
    e.preventDefault()
    const input = document.getElementById("page-input").value
    const inputNumber = Number(input)
    handleActivePagination(inputNumber, lastPage)
})

firstPageButton.addEventListener('click', () => {
    handleActivePagination(Number(1))
})

lastPageButton.addEventListener('click', () => {
    handleActivePagination(Number(lastPage))
})


function handleActivePagination(inputNumber) {
    if( 0 < inputNumber && inputNumber <= lastPage ) {
        fetchData( API_URL + `page=${inputNumber}&`)
    }
   
    let firstNumber = inputNumber - 2
    Array.prototype.forEach.call(pageNumbers, number => {
        const current = paginationNav.querySelector(".active-page-nav")
        if( 2 < inputNumber && inputNumber < lastPage - 2 ){
            current.className = current.className.replace("active-page-nav", "")
            pageNumbers[2].classList.add("active-page-nav")
        
            number.innerHTML = firstNumber
            firstNumber += 1
        } else if ( inputNumber === 2) {
            current.className = current.className.replace("active-page-nav", "")
            pageNumbers[inputNumber - 1].classList.add("active-page-nav")
            number.innerHTML = firstNumber + 1
            firstNumber += 1 
        } else if ( inputNumber === 1 ) {
            current.className = current.className.replace("active-page-nav", "")
            pageNumbers[inputNumber - 1].classList.add("active-page-nav")
            number.innerHTML = firstNumber + 2
            firstNumber += 1 
        } else if ( inputNumber >= lastPage - 2) {
            const edgeVariant = 4 - (lastPage - inputNumber )    // thanks to edgeVariant we can navigate pages like 498 499...
            current.className = current.className.replace("active-page-nav", "")
            pageNumbers[ edgeVariant ].classList.add("active-page-nav")
            number.innerHTML = firstNumber - (edgeVariant - 2)   // firstNumber has already subtrated 2, therefore we are decreasing 2 from pageVariant 
            firstNumber += 1
        }

        if(Number(pageNumbers[0].innerHTML) > 1){
            backward.style.setProperty('display', "flex")
            firstPageButton.classList.remove("hide-element")
        } else {
            backward.style.setProperty('display', "none")
            firstPageButton.classList.add("hide-element")
        }

        if(Number(pageNumbers[0].innerHTML) > lastPage - 5){
            forward.style.setProperty('display', "none")
            lastPageButton.classList.add('hide-element')
        } else {
            forward.style.setProperty('display', "flex")
            lastPageButton.classList.remove('hide-element')
        }
    })
}

let lastPage = 500;
const setTotalPageNum = async(totalPageNum)=>{
   
    if( totalPageNum > 500) {
        lastPageButton.innerHTML = "···" + lastPage
        
        return lastPage = 500
    } else {
        await ( lastPage = totalPageNum )
        lastPageButton.innerHTML = "···" + lastPage
        console.log(lastPage); 
    }
}
