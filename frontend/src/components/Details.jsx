import * as React from 'react'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'


export default function Details(){
    const [cities, setCities] = useState([])
    const{ id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:4000/api/cities/${id}`)
            .then(res =>(setCities(res.data.response)))
            // eslint-disable-next-line
    },[])
  
    console.log(cities)
    return (
        <>
      
        </>
    )
}


