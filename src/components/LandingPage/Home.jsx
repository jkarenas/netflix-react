import React, { useState } from 'react';
import Search from './Search';
import PopularSeries from './PopularSeries';
import GetTopRating from './GetTopRated';
import PopularMovies from './PopularMovies';
import Portadota from './Portadota';

function Home() {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchResults = (areResultsVisible) => {
    setShowSearchResults(areResultsVisible);
  };

  return (
    <div>
      <Search onSearchResults={handleSearchResults} />
      {!showSearchResults && (
        <div>
          <Portadota />
          <PopularMovies />
          <PopularSeries />
          <GetTopRating />
        </div>
      )}
    </div>
  );
}

export default Home;
