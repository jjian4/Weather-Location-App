const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory
app.use(express.static(publicDirPath))

// Setup handlebars engine, views location, partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'James'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'James'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'James',
        message: 'Help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to search'
        })
    }
    //Set a default parameter (in case no object returned)
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send( {error} )
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send( {error} )
            }
            res.send({
                address: req.query.address,
                location,
                forcast: forcastData,
            })        
        })    
    })

})

app.get('/products', (req ,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log('req.query.search')
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'James',
        message: 'Help article not found...'
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'James',
        message: 'My 404 page...'
    })
})

app.listen(3000, () => {
    console.log('Port 3000 server is up.')
})