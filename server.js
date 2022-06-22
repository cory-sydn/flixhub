require('dotenv').config()
const axios = require('axios');
const express = require('express')
const app = express()
const path = require('path');
const PORT = process.env.PORT || 8000;

const TMDB_KEY = process.env.API_KEY

// built-in middleware for json
app.use(express.json())

// serves static files
app.use(express.static('public'))
app.use(express.static('public/components'))

// routes
app.use('/search', require('./routes/components'))


// api request 
app.use('/search/:url', (req, res) => {
    const query = req.params.url    
    const searc_url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
   
    axios(searc_url)
        .then(response => {
            res.json(response.data)
        }).catch(err=>console.log(err))
})

app.use('/discover||movie||tv/:url', ((req, res) => {
    
    var query = req.originalUrl
    if (query.includes("discover") || query.includes("movie") || query.includes("tv")){
        
        const api_url = `https://api.themoviedb.org/3${query}api_key=${TMDB_KEY}`
        console.log(api_url);
        axios(api_url)
            .then(response => {
                res.json(response.data)
            }).catch(err=>{
                console.error(err);
                console.log(err);
            })
    }
    return
}))


app.all('*', (req, res) => {
    res.status(404)
    if ( req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if ( req.accepts('json')) {
        res.json({ error: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`))
