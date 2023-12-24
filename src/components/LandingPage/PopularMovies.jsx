import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled'
import Carousel from 'react-elastic-carousel';


const breakPoints = [
    {width:1, itemsToShow:2},
    {width:550, itemsToShow:3},
    {width:768, itemsToShow:4},
    {width:1200, itemsToShow:5},
    
]
const Container = styled.div`
h2{
    color: #df7f81;
    padding: 1.5rem;
}
.rec-arrow {
    background-color:black;
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 80px;
    font-size: 44px;
    &:hover {
        background-color: black; /* Establece el mismo color para mantener la consistencia */
      }
    &:focus {
        background-color: black;
        outline: none; /* Eliminar el contorno de enfoque */
      } 
  }


  .rec-dot {
    /* Oculta los indicadores circulares */
    display: none;
  }
`

const Image = styled.img`
    width: 13rem;
    height: 7rem;
    border-radius: 10px;
`


const PopularMovies = () => {
  const [trending, setTrending] = useState([]);

  const fetchTrending = async () => {
    try {
      const res = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=9b4a53b9c46e8e5ad58cc4b20b76d9ff');
      setTrending(res.data.results.slice(0, 10));  // Limitar a 10 resultados
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <Container>
      
        <h2>Peliculas populares</h2>
           <Carousel breakPoints={breakPoints}>
      {trending.map((element) => (
        <div key={element.id}>
          <Link to={`/movie/${element.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w400/${element.backdrop_path}`}
            alt=""  
          />
          {/* <h1>{element.title}</h1> */}
          </Link>
        </div>
         
      ))}
    </Carousel> 
     
        
    </Container>

  );
};

export default PopularMovies;
