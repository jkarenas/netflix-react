import React, { useState } from 'react';
import Search from './Search';
import PopularSeries from './PopularSeries';
import GetTopRating from './GetTopRated';
import PopularMovies from './PopularMovies';
import Portadota from './Portadota';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  h2{
    margin-left:2rem;
  }
  
`;

function Home() {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchResults = (areResultsVisible) => {
    setShowSearchResults(areResultsVisible);
  };

  return (
    <div>
      <Search onSearchResults={handleSearchResults} />
      {!showSearchResults && (
        <Container>
          <div className='all'>
            <Portadota />
            <StyledLink to={`/favorites`}>
              <h2>Ir a Favoritos</h2>
            </StyledLink>
            <PopularMovies />
            <PopularSeries />
            <GetTopRating />
          </div>
        </Container>
      )}
    </div>
  );
}

export default Home;
