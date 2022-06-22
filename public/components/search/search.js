const searchButton = document.getElementById("search__button")
const topLink = document.querySelector(".top-link")

const BASE_IMG_URL_FIND = "https://image.tmdb.org/t/p/w500"

const fetchSearchData = async (url) => {
    try{
        const response = await fetch(url)
        const data = await response.json()
        if(!response.ok) throw Error("Reload the page")
        console.log(data.results);
        listFoundMovies(data.results)
        handleBookmarkButton(data.results)
       
    } catch (err) {
        console.error(err);
        console.log("Something wrong with the api!");
    } 
}

searchButton.addEventListener("click", (e)=> {
    e.preventDefault()      
    const rawInput = document.getElementById("search__input").value
    const regExp = /([A-Z]){2}\w+/gi;
    console.log(rawInput.match(regExp));
    if (rawInput.match(regExp) === null) return  modal.showModal()
    const query = rawInput.trim()
    //console.log(query);
    const baseUrl =  "https://cory-sydn.github.io/flixhub/" + `${query}`
    console.log(baseUrl);
    fetchSearchData(baseUrl)

    // If opened, close bookmarks
    if(bookmarkWrapper.computedStyleMap().get("display").value === "flex") {
        bookmarkWrapper.style.setProperty('display', 'none')        
        bookmarkList.innerHTML = ""  // reset bmList
    }

    window.scrollTo(0,document.body.scrollHeight );
})

let genreArray= [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

const list = document.getElementById("display_finding")
const gridImg = document.getElementsByClassName("movie-list__item-link")


// define initial size of rating circle's background
let gridImgWidth;
window.addEventListener('load',  ()=> {
    const cssObj = window.getComputedStyle(gridImg[0], null )
    gridImgWidth = cssObj.getPropertyValue("width")
})

const listFoundMovies = (data) =>{    
    list.innerHTML = ""

    data.forEach( (movie) => {
        const {id, title, vote_average, poster_path, genre_ids, release_date, overview} = movie

        const IMG_URL = `${BASE_IMG_URL_FIND}${poster_path}`
        const listItem = document.createElement("div")
        
        let gname="";        
        genre_ids.map((genreId) => {
            
            genreArray.forEach((genre) => {                
                const {id, name} = genre
                if(id === genreId) gname += ` ${name},`                
            })             
        })
        let heart=""

        // check if the movie is allready in storage
        if(items.length > 0 ){
            items.forEach(item => { 
                if(item.data.id === id) heart = "clicked"
            })
        }

        listItem.innerHTML = `
        <div class="movie-list__item scroll-snapping" >
            <a class="movie-list__item-link "   data-tmdb-id=${id}>
                <img class="grid-img" id="grid-img" src=${IMG_URL} alt=${movie.title} >
                <title class="movie-list__item-title">${movie.title} </title>
                <p class="movie-list__item-description">${release_date?.split("-")[0] || release_date} 
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
                <i class="fa-regular fa-heart add-bookmarks ${heart} ">
                </i>
            </a>
            <div class="movie-list__overview" >
                <h3>${title}</h3>
                <p>${overview}</p>
            </div>
            
        </div>
        `
      
        if(poster_path !== null ) {
            return list.innerHTML += listItem.innerHTML
        } 
    });
}

// resize rating circle's background
const listItems = document.getElementsByClassName("movie-list__item-link")

window.addEventListener("resize",  ()=> {
    const cssObj = window.getComputedStyle(listItems[0], null )

    newGridImgWidth = cssObj.getPropertyValue("width")
    const ratingCenter = list.getElementsByClassName("rating-center")
    
    Array.prototype.forEach.call(ratingCenter, el=> {
        el.style.setProperty("background-size", `${newGridImgWidth}` )
    })
})


// (SEND TO / REMOVE FROM)  STORAGE
const handleBookmarkButton = (data) => {

    Array.prototype.forEach.call(listItems, item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target.classList.contains("add-bookmarks")) {
                e.target.classList.toggle("clicked")
                syncStorage(data, item)
            }
        })

        item.addEventListener('dblclick', ()=> {
            item.getElementsByClassName("add-bookmarks")[0].classList.toggle("clicked")
            syncStorage(data, item)
        }) 
    })
}

function syncStorage(data, item){
    data.forEach((movie) => {                    
        if (item.getElementsByClassName("add-bookmarks")[0].classList.contains("clicked")  ) {
            if(movie.id === Number(item.dataset.tmdbId)){
                //console.log(movie.id);
                console.log(Number(item.dataset.tmdbId));               
                addToList(movie)
            }
        } 
        if (!item.getElementsByClassName("add-bookmarks")[0].classList.contains("clicked")) {
            
            if(movie.id === Number(item.dataset.tmdbId)){
                //console.log(movie.id);
                console.log(item.dataset.tmdbId);
                handleDelete(movie.id)
                
            }
        }
    })
}


// UP ARROW
topLink.addEventListener('click',()=>{
    window.scrollTo(0, 0)
})

window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    if(scrollHeight > 100) {
        topLink.classList.add("show-link");
    }
    else {
        topLink.classList.remove("show-link")
    }
})

