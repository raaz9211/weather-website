const path = require('path')
const express = require('express')
const hbs  = require('hbs')


const app = express()

const port = process.env.PORT || 3000


const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')




//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>
{
    res.render('index',{
        title : 'Weather',
        name :'Raj'
    })
})


app.get('/about',(req,res) =>
{
    res.render('about',{
        title : 'About me',
        name : 'Raj'
    })
}) 


app.get('/help',(req,res) =>
{
    res.render('help',{
        message : 'We are here to help you',
        title : 'Help',
        name : 'Raj'
    })
})
  


app.get('/weather',(req,res) =>
{
   
    if(!req.query.address)
    {
         return res.send({
            error : 'Address must provide search'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>
    {
        if(error)
            return  res.send({error})
        
        forecast(longitude,latitude,(error,forecateData) => 
        {
            if(error)
                return  res.send({error})
        
            return res.send( {
                forecast : forecateData.first,
                temp : forecateData.second,
                humidity : forecateData.humidity,
                location ,
                address :req.query.address
                
            })
            
        })
    })
    // res.send({
    //     forecasr : "snow",
    //     location:'doeghar',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
         return res.send({
            error : 'You must provide search'
        })
    }
    console.log (req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{

        title:'404',
        errorMessage:'help artical not found',
        name:'Raj'
    })
})

app.get('*',(req,res) =>{

    res.render('404',{
        title:'404',
        errorMessage:'Page not found',
        name:'Raj'
    })
})


app.listen(port,()=>
{
    console.log(`server is up on  port ${ port}`)
})