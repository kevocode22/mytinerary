import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react';
import '../styles/details.css'


export default function Details() {
    const [cities, setCities] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:4000/api/cities/${id}`)
            .then(res => (setCities(res.data.response)))
        // eslint-disable-next-line
    }, [])
    
    console.log(cities)
    return (
        
        <figure class="image-block">
	<h1>The Beach</h1>
	<img src="https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
	<figcaption>
		<h3>
			More Info
		</h3>
		<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
		<button>
			More Info
		</button>
	</figcaption>
</figure>
    
    )
}


