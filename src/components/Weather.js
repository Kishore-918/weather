import axios from 'axios'
import React, { useState } from 'react';


// api key  -- 86687949c792e3a0bbd77a6bf4476a15

const Weather = () => {

    const API_key = '86687949c792e3a0bbd77a6bf4476a15'; 

    const[country,setCountry] = useState('');
    const[city,setCity] = useState('');

    const[temp_max,setTemp_max] = useState('');
    const[temp_min,setTemp_min] = useState('');
    const[temp,setTemp] = useState('');
    const[description,setDescription] = useState('');
    const[icon,setIcon] = useState('');

    const[showMyComponent,setShowMyComponent] = useState(false);



    const getWeatherData = async(city,country) => {
        await axios({
            method:'GET',
            url:`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
    
        })
        .then(res=>{
            setShowMyComponent(true);
            setTemp((res.data.main.temp-273.15));
            setTemp_max((res.data.main.temp_max-273.15));
            setTemp_min((res.data.main.temp_min-273.15));
            setDescription((res.data.weather[0].description));
            setIcon(res.data.weather[0].icon);
        })
        .then(err=> {
            console.log(err)});

    }

    
    // http://openweathermap.org/img/wn/10d@2x.png  icons 
 

    return (
        <div>
            <h1 className='header'>Weather app</h1>
            <input
                type = "text" 
                placeholder='Enter city' 
                value = {city}  
                onChange = {(e) => setCity(e.target.value)}
                className = 'mx-1 p-1'
            /> 
            <input 
                type = "text" 
                placeholder='Enter country' 
                value = {country}  
                onChange = {(e) => setCountry(e.target.value)}
                className = 'mx-2 p-1'
                
            />
            <button onClick = {()=>getWeatherData(city,country)} className = "btn btn-dark">GetWeather </button>
           
            {showMyComponent &&
                <div className='data_container p-1 my-4'>
                 
                    <div>

                        <h2>{city},{country}</h2>   

                        <div className='my-1'>
                            <img src = { `http://openweathermap.org/img/wn/${icon}@2x.png`} alt ='weather-icon' 
                            style = {{height:200,width:200}}  />
                        
                        </div>
                    
                        {temp && 

                            <>    
                            <h2 style= {{color:'white'}}>{Math.floor(temp)}°C</h2>

                            <h4 className = 'my-4'> 
                                Min: <span > {Math.floor(temp_min)}°C </span> 
                                <span className= 'mx-3'>| </span>
                                Max: <span > {Math.floor(temp_max)}°C </span>
                        
                            </h4>
                            </>
                        }

                        <h2>{description}</h2>
                        <h4>Date:{new Date().toLocaleDateString()}</h4>
                    </div>
                </div>    
            }    
            
        </div>
    )
}

export default Weather
