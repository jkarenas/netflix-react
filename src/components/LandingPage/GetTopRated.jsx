import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    h2{
        color: #df7f81;
        padding: 1.5rem;   
        display:flex;
        justify-content:center;
    }
}
`
const Images = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 0 4rem 4rem 4rem;
    flex-wrap: wrap;
    
`
const Image = styled.img`
    border-radius: 10px;
`

const GetTopRating = () => {
  const [TopRating, setTopRating] = useState([]);

  const Rating = async () => {
    try {
      const res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=9b4a53b9c46e8e5ad58cc4b20b76d9ff');
      setTopRating(res.data.results.slice(0, 4));  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    Rating();
  }, []); 

  return (
    <Container>
    <h2>Las peliculas mas aclamadas</h2>
    <Images>
           {TopRating.map((element) => (
        <div key={element.id}> 
         <Link to={`/movie/${element.id}`}>
          <Image src={`https://image.tmdb.org/t/p/w200/${element.poster_path}`} alt="" />
         </Link>     
        </div>
      ))}
    </Images>
   
    </Container>
  );
};

export default GetTopRating;
