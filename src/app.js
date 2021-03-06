const express = require('express')
const path= require('path')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const { isRegExp } = require('util')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const pathDirectory= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pathDirectory))


app.get('',(req,res)=> {
    res.render('index',{
        title: 'Weather',
        name: 'Kunal Damania'
    })
})
app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About me',
        name: 'Kunal Damania'
    })
})
app.get('/help',(req,res)=> {
    res.render('help',{
        title: 'Welcome to the Help page',
        name: 'Kunal Damania'
    })
})


app.get('/weatherpage',(req, res)=>{
    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, place}= {})=>{
        if(error){
            return res.send({
                error: 'error, find a location with correct address'
            })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send ({error})
            }
            res.send ({
                forecast: forecastData,
                place: place,
                address: req.query.address
            })
        })
    })

})
app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404' ,
        name: "Kunal Damania",
        errorMessage: "Error 404 page not found"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 help' ,
        name: "Kunal Damania",
        errorMessage: "Help article not found"
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port " + port)
})