const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"

// MENU SELECTION  / LINK HANDLING

// first load screening Link(default)
window.addEventListener('load',  ()=> {
    API_URL = "https://cory-sydn.github.io/flixhub/" + `discover/movie?sort_by=popularity.desc&`
    fetchData(API_URL)
})

const menuButtons = document.getElementsByClassName("menu_link")
const displayTitle = document.getElementById("display-title")

let API_URL="";
console.log(API_URL);
Array.prototype.forEach.call(menuButtons, button =>{
    button.addEventListener('click',()=> {
        const { selectLink } = button.dataset
        setDiscoverType(selectLink)       

        // sets movies or series to display
        function setDiscoverType(selection)  {    
            
            if(selection.includes("movie")) {
                displayType = "movie"
                const firstTitle = selection.includes("top") ? "TOP RATED": selection.includes("date")? "NEW" : "POPULAR"
                displayTitle.innerText= `${firstTitle} MOVIES`
            } else {
                displayType = "series"
                const firstTitle = selection.includes("top") ? "TOP RATED": selection.includes("date")? "NEW" : "POPULAR"
                displayTitle.innerText= `${firstTitle} SERIES`
            }
            API_URL = "https://cory-sydn.github.io/flixhub/" + `${selectLink}`
            console.log(API_URL);
            fetchData(API_URL)
        }
    })
})

// set page limit for pagination
const getTotalPageNum= async(totalPageNum)=>{
    await setTotalPageNum(totalPageNum)    
}

const grid = document.querySelector(".featured-content__list-grid")
const gridImg = document.getElementsByClassName("movie-list__item-link")

let gridImgWidth;
window.addEventListener('load',  ()=> {
    const cssObj = window.getComputedStyle(gridImg[0], null )
    gridImgWidth = cssObj.getPropertyValue("width")
})

const handleMovies = (data) => {    
    grid.innerHTML = ""

    data.forEach( (obj) => {
        const {title, vote_average, poster_path, genre_ids, release_date} = obj

        const IMG_URL = `${BASE_IMG_URL}${poster_path}`
        const gridItem = document.createElement("div")
        
        let gname="";
        
        genre_ids.map((genreId) => {            
            genreArray.forEach((genre) => {                
                const {id, name} = genre
                if(id === genreId) gname += ` ${name},`     
            })             
        })

        gridItem.innerHTML = `
        <div class="movie-list__item">
            <a href="#" class="movie-list__item-link ">
                <img class="grid-img" id="grid-img" src=${IMG_URL} alt=${title}  >
                <title class="movie-list__item-title f600title">${title} </title>
                <p class="movie-list__item-description">${release_date.split("-")[0] || release_date} 
                    <br>
                    ${  gname.includes(undefined) 
                        ? gname.replace(undefined, "") && gname.replace(/\s?,$/gm, "")
                        : gname.replace(/\s?,$/gm, "")
                    }
                    <div class="rating"
                        style="background: conic-gradient( hsl(127, ${ parseInt(vote_average)*10}%, 50%) ${vote_average*10}%, transparent 0 100%) "
                    >
                        <span class="rating-center"
                            style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.109), rgba(0, 0, 0, 0.209))
                            , url(${IMG_URL}); 
                            background-size: ${gridImgWidth}; object-fit: contain;
                            background-position: center; background-repeat: no-repeat;"           
                        >
                        <h3>${vote_average}</h3>
                        </span>
                    </div> 
                    
                </p>
                
            </a>
        </div>`
      
        if(poster_path !==  null) {
            return grid.innerHTML += gridItem.innerHTML
        }        
    });
}

// resize rating circle's background
const getWidth = document.getElementsByClassName("movie-list__item-link")
window.addEventListener("resize",  ()=> {
    const cssObj = window.getComputedStyle(getWidth[0], null )

    newGridImgWidth = cssObj.getPropertyValue("width")
    const ratingCenter = grid.getElementsByClassName("rating-center")
    
    Array.prototype.forEach.call(ratingCenter, el=> {
        el.style.setProperty("background-size", `${newGridImgWidth}` )
    })
})
