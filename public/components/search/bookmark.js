const bookmarkButton = document.querySelectorAll("#bookmark-side-button")
const deleteAllListButton = document.querySelector(".bookmark-delete-button")

const bookmarkWrapper = document.querySelector(".bookmark-wrapper")
const bookmarkList = document.querySelector(".bookmark-list")


// SIDE BAR BOOKMARK BUTTON AND BOOKMARKS EXIT
let items = JSON.parse(localStorage.getItem("bookmarks")) || [];  // storage state

bookmarkButton.forEach(button => {
        button.addEventListener('click', ()=> {    
        if(bookmarkWrapper.computedStyleMap().get("display").value === "none") {
            bookmarkWrapper.style.setProperty('display', 'flex')        
            updateStorage(items)
        } else {
            bookmarkWrapper.style.setProperty('display', 'none')
        }
    })
})


// STORAGE HANDLING

const updateStorage = (listItems) => {
    localStorage.setItem("bookmarks", JSON.stringify(listItems))
    items =  JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarkList.innerHTML = "";
    displayBookmarks(items)
    handleBookmarkListButton(items)
}

const addToList = (movie) => {   
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const data = movie
    const newItem = {id, data}
    const listItems = [...items, newItem]
    updateStorage(listItems)
}

deleteAllListButton.addEventListener('click',()=> {
    localStorage.clear()
    updateStorage([])
})

const handleDelete = (id)=> {
    const listItems = items.filter((item) => item.data.id !== id )    
    updateStorage(listItems)
}


// DISPLAY
const displayBookmarks = (items) => {    
    if(items.length < 1 ) return  modal.showModal() + clearModal()
    
    let bmGridImgWidth="0px";
    const bmListItem = document.createElement("div")

    items.forEach(item => {
            
        const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"
        const IMG_URL = `${BASE_IMG_URL}${item.data.poster_path}`

        bmListItem.innerHTML =`
        <div class="bookmark-list__item" >
            <a class="bookmark-list__item-link "   data-tmdb-id=${item.data.id}>
                <img class="bookmark-img" id="" src= ${IMG_URL} alt=${item.data.title} >
                <title class="bookmark-list__item-title">${item.data.title} </title>
                <p class="bookmark-list__item-description">${ item.data.release_date.split("-")[0] || item.data.release_date} 
                    <br>
                    <div class="bookmark__rating"
                    style="background: conic-gradient( hsl(127, ${ parseInt(item.data.vote_average)*10}%, 50%) ${item.data.vote_average*10}%, transparent 0 100%) "
                    >
                        <span class="bookmark__rating-center"
                            style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.109), rgba(0, 0, 0, 0.209))
                            , url(${IMG_URL}); 
                            background-size: ${bmGridImgWidth}; object-fit: contain;
                            background-position: center; background-repeat: no-repeat;"           
                        >
                            <h3>${item.data.vote_average}</h3>
                        </span>
                    </div>                    
                </p>
                <i class="fa-regular fa-heart add-bookmarks little-heart clicked">
                </i>
            </a>
        </div>`                            
        bookmarkList.innerHTML += bmListItem.innerHTML
    });

    const bookmarkListItems = document.getElementsByClassName("bookmark-list__item-link")
    const ratingCenter = bookmarkList.getElementsByClassName("bookmark__rating-center")
    
    const cssObj = window.getComputedStyle(bookmarkListItems[0], null )
    bmGridImgWidth = cssObj.getPropertyValue("width")
    
    Array.prototype.forEach.call(ratingCenter, el=> {
        el.style.setProperty("background-size", `${bmGridImgWidth}` )
    })

    window.addEventListener("resize",  ()=> {
        const bookmarkListItems = document.getElementsByClassName("bookmark-list__item-link")
        if (bookmarkListItems.length) {   // check if bookmark has an item or not
            const cssObj = window.getComputedStyle(bookmarkListItems[0], null )
            newBmGridImgWidth = cssObj.getPropertyValue("width")
            
            Array.prototype.forEach.call(ratingCenter, el=> {
                el.style.setProperty("background-size", `${newBmGridImgWidth}` )
            })
        }
    })       
    
}

            
const handleBookmarkListButton = (data) => {
    const bookmarkListItems = document.getElementsByClassName("bookmark-list__item-link")
    
    Array.prototype.forEach.call(bookmarkListItems, item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation()
           
            if (e.target.classList.contains("add-bookmarks")) {                
                e.target.classList.toggle("clicked")                
                syncStorageWithBookmarks(data, item)
            }
        })

        item.addEventListener('dblclick', ()=> {
                item.getElementsByClassName("add-bookmarks")[0].classList.toggle("clicked")
                syncStorageWithBookmarks(data, item)
        })
    })
}

function syncStorageWithBookmarks(data, item){
    data.forEach((movie) => {
       
        if (!item.getElementsByClassName("add-bookmarks")[0].classList.contains("clicked")) {
            if(movie.data.id === Number(item.dataset.tmdbId)){                
                handleDelete(movie.data.id)                
            }            
        } else {
            if(movie.data.id === Number(item.dataset.tmdbId)){                               
                addToList(movie.data)
            }
        }
    })
}

Array.prototype.forEach.call(listItems, item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.classList.contains("add-bookmarks")) {
            e.target.classList.toggle("clicked")           
        }
    })

    item.addEventListener('dblclick', ()=> {
        item.getElementsByClassName("add-bookmarks")[0].classList.toggle("clicked")       
    }) 
})

