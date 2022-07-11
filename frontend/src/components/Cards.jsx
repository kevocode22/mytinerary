import '../styles/cards.css'
import { useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import error404 from '../assets/404.svg'
import citiesActions from '../redux/actions/citiesActions';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';


const SearchBox = () => {
  const [search, setSearch] = useState("")
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(citiesActions.filterCities(search))
    //eslint-disable-next-line
  }, [search])

  let cityFilter = useSelector(store => store.citiesReducer.filter)
  

  //---------------Map and print of Cards filtered------------------//
  return (
    <>
    <div className="containerCards">
        <div className="input-container">
        <input type='text' className='input-style' placeholder='Search by city...' onKeyUp={e => { setSearch(e.target.value) }} />
      </div>


      {cityFilter.length > 0 ? (
        cityFilter.map((city, index) =>
      <figure className="image-block" key={index}>
	<h1>{city.name}</h1>
	<img src={city.image} alt="" />
	<figcaption>
		<h3>
Description	
	</h3>
		<p>{city.description}</p>
		<LinkRouter to={`/cities/${city._id}`}><button>
			More Info
		</button></LinkRouter>
	</figcaption>
</figure>  )) : (<img src={error404} alt="error404" />)}
</div>
</>

  )
}

export default SearchBox
