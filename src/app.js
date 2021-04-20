const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./geocode')
const weatherStack = require('./weatherStack')

//defining absolute path to public and views
const viewDirPublic = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//using public folder
app.use(express.static(viewDirPublic))

//setting views engine and views location
app.set('views', viewDirPath)


app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

const port = process.env.PORT || 3000

/* rendering views */

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Rhiad'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Rhiad'
    } )
})


/* methods */

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide na address' 
        })
    }
    let address = req.query.address
    geocode(address, (error, data)=>{
        if(error){
            return res.send(error)
        }
        weatherStack(data.lat, data.lon, (error, dataWeather)=>{
            if(error){
                return res.send(error)
            }
            res.send({location: data.location, ...dataWeather})
        }) 
    })
})

/*404 handling*/

app.get('*', (req, res)=>{
    res.render('404',{
        message: "404: Page not found",
        name: "Rhiad"
    })
})


app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`)
})