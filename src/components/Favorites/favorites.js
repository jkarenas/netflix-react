import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, getFavorites } from '../../../src/redux/actions/actions';
import styled from '@emotion/styled';


const FavoritesContainer = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  padding:3rem;

  h1{
    color:red;
    display:flex;
  }
`;

const FavoriteCard = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: auto;
  display:flex;
  flex-direction:row;
  gap:1rem;

  h3, span{
    color:white
  }
  
`;

const FavoriteMovies = () => {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.list);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <FavoritesContainer>
        <h1 className='title'>Mis Favoritas</h1>
      {favoritesList.map((movie) => (
        <FavoriteCard key={movie.id}>
            <div>
               <img src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`} alt={movie.title} /> 
            </div>
            <div>
                <h3>{movie.title}</h3>
                 <div onClick={() => handleDelete(movie.id)}>❤️<span>Eliminar de favoritos</span></div>   
            </div>
          
        </FavoriteCard>
      ))}
    </FavoritesContainer>
  );
};

export default FavoriteMovies;
