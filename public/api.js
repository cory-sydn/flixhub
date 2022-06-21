let genreArray= [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

console.log("api.js");
let displayType="movie";  //switch registry, default screening displayType is movie
const fetchData = async (url) => {
    try{
        const response = await fetch(url)
        const data = await response.json()
        const totalPageNum = await data.total_pages
        getTotalPageNum(totalPageNum)
        
        if(!response.ok) throw Error("Reload the page")        

        if(displayType === "movie"){
            handleMovies(data.results)
        } else {
            handleSeries(data.results)
        }
    } catch (err) {
        console.log("Something wrong with the api!");
    } 
}