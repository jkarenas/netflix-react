import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Search from '../../LandingPage/Search';
import { useNavigate } from "react-router-dom";
import { getFavorites, deleteMovie, addMovie } from '../../../redux/actions/actions';
import {useDispatch, useSelector} from "react-redux"

const Container = styled.div`
    .add {
        color:gray;
    }
    .comeback{
        color:white;
        background-color:red;
        border-radius:0.7rem;
        padding:6px;
    }

    .bigImage {
        width: 100%;
        height: 30rem;
    }
    .smallImage {
        position: relative;
        left: 5rem;
        top: -19rem;

        img {
            width: 300px;
            height: auto;
            display: block;
            border-radius: 10px;
        }
    }
    .content{
        padding-right:5rem;
    }
    .movieTitle {
        position: relative;
        color: white;
        top: -23rem;
        font-size: 4rem;
    }
    .infoContainer {
        display: flex;
        gap: 7rem;
    }
    .overview {
        position: relative;
        top: -15rem;
        color: white;
    }
    .genres {
        display: flex;
        justify-content: center;

        .circle {
            display: inline-block;
            border-radius: 30%;
            background-color: white;
            color: gray;
            padding: 2px;
            margin: 3px;
        } 

    }
    .heart-comeBack{
        display:flex;
        color:red;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: -190px;
        
    }

`;

const DetailMovie = () => {
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [getDetail, setGetDetail] = useState({});
    const [fav, setFav] = useState(false); 
    
    const favoritesList = useSelector((state) => state.list)
    console.log(favoritesList)
    

    const dispatch = useDispatch();
    

    const navigate = useNavigate();
    const goBackHandler = () => {
        navigate(-1);
      };

    const handleSearchResults = (areResultsVisible) => {
         setShowSearchResults(areResultsVisible);
        };


    
    const { id } = useParams();

    const fetchMovieDetail = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9b4a53b9c46e8e5ad58cc4b20b76d9ff`);
            console.log('Movie Response:', response.data);
            setGetDetail(response.data);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    useEffect(() => {
        fetchMovieDetail();
    }, [id]);

    useEffect(() => {
        dispatch(getFavorites());
      }, [dispatch]);
    
    useEffect(() => {
        if (getDetail.id) { 
            const isMovieInFavorites = favoritesList.some((movie) => movie.id === getDetail.id);
            setFav(isMovieInFavorites);
        }
    }, [getDetail, favoritesList]);


        function handleFavorite(data) {
        const isFavorite = favoritesList.some((movie) => movie.id === data.id);
            // console.log('isFavorite', isFavorite)
        if (!isFavorite) {
            setFav(true)
            dispatch(addMovie(data)); 
            // console.log('Added to favorites:', data);
        } else {
            dispatch(deleteMovie(data.id)); 
            setFav(false)
            // console.log('Removed from favorites:', data.id);
        }
    }
    return (
        <div>
        <Search onSearchResults={handleSearchResults} />
        {!showSearchResults && (
        <Container>
            <div>
                <img className="bigImage" src={`https://image.tmdb.org/t/p/w400/${getDetail.backdrop_path}`} alt="" />
            </div>
            <div className='infoContainer'>
                <div className='smallImage'>
                    <img src={`https://image.tmdb.org/t/p/w400/${getDetail.poster_path}`} alt="" />
                    <div className="genres">
                        {getDetail.genres && (
                            getDetail.genres.map((genre, index) => (
                                <span key={index} className="circle">{genre.name}</span>
                            ))
                        )}
                    </div>
                </div>
                <div className='content'>
                    <p className='movieTitle'> {getDetail.title}</p>
                    <p className='overview'>Overview: {getDetail.overview}</p>
                    <div className='heart-comeBack'>
                            {
                                fav ? (
                                    <div className='add' onClick={() => handleFavorite(getDetail)}>❤️Agregado a favoritos</div>
                                ) : (
                                    <div className='add' onClick={() => handleFavorite(getDetail)}>🩶Agregar a favoritos</div>
                                )
                            }
                            
                            <h2 className='comeback' onClick={goBackHandler}>Regresar</h2>
                    </div>
                </div>
            </div>


        </Container>
                )}
                </div>
    );
};

export default DetailMovie;
