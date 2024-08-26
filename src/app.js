const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = 3000
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mariam Tsu',
    message: 'Use this site to get your weather!'
  }
  )
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mariam Tsu'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'How can I help you?',
    name: 'Mariam Tsu'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query?.address || ''

  if (!address) {
    return res.send({
      error: 'Please provide address'
    })
  }

  if (address) {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          forecast: forecastData,
          location,
          address: address
        })
      })
    })
  }
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mariam Tsu',
    errorMessage: 'Help article not found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mariam Tsu',
    errorMessage: 'Page not found',

  })
})

app.listen(port, () => {
  console.log(`Server is up on ${port}`)
})