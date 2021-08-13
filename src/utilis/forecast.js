  
const request =require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=d42ac97751052c65826591f81d54cd42&query='+latitude+','+longitude

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)

        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+'. '+'It is currently '+body.current.temperature +' degrees ' +'and it feels like '+body.current.feelslike+' degrees. The humidity is '+body.current.humidity+'%.')
        }
    })
}



