// differences from movies: title-> name, release_date -> first_air_date
const handleSeries = (data) =>{    
    grid.innerHTML = ""

    data.forEach( (obj) => {
        const {name, vote_average, poster_path, genre_ids, first_air_date} = obj
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
                <img class="grid-img" id="grid-img" src=${IMG_URL} alt=${name}  >
                <title class="movie-list__item-title f600title">${name} </title>
                <p class="movie-list__item-description">${first_air_date.split("-")[0] || first_air_date} 
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
      
        if(IMG_URL !== (BASE_IMG_URL+ null) ) {
            return grid.innerHTML += gridItem.innerHTML
        }        
    });
}