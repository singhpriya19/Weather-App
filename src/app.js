const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')

const app=express()
const port=process.env.PORT ||3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Priya Singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Priya Singh'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                 return res.send({error})
             }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
 
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Priya Singh',
        errorMessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
