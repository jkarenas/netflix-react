
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled'

const Container = styled.div`
position: relative;
text-align: center;


 h1{
  color: white;
  font-size:5rem;
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
 }

 h2 {
  font-size:2.5rem;
  color: #df7f81;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
}

h3 {
  font-size: 1.5rem;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
}
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;



const Portada = () => {
  const [mostPopular, setMostPopular] = useState(null);

  const getMostPopular = async () => {
    try {
      const res = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=9b4a53b9c46e8e5ad58cc4b20b76d9ff');
      if (res.data.results.length > 0) {
        const sortedByPopularity = res.data.results.sort((a, b) => b.popularity - a.popularity);
        setMostPopular(sortedByPopularity[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getMostPopular();
  }, []);

  return (
    <Container>
      {mostPopular && (
        <div key={mostPopular.id} className='container-poster'> 
          {mostPopular.poster_path && (
            <Image src={`https://image.tmdb.org/t/p/w500/${mostPopular.backdrop_path}`} alt="" />
          )}
          {mostPopular.name && <h1>{mostPopular.name}</h1>}
          <h2>Más popular</h2>
          <h3>⭐⭐⭐⭐⭐</h3>
        

          
        </div>
      )}
    </Container>
  );
};

export default Portada;
