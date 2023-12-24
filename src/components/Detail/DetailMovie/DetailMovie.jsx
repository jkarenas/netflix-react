import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Search from '../../LandingPage/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


const Container = styled.div`
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
    const [isWishlist, setIsWishlist] = useState(false); // Estado de la lista de deseos

    const navigate = useNavigate();
    const goBackHandler = () => {
        navigate(-1);
      };
    const toggleWishlist = () => {
        setIsWishlist(!isWishlist); // Cambiar el estado de la lista de deseos al hacer clic en el corazón
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
                            <FontAwesomeIcon>
                                icon={isWishlist ? faHeart : faHeart}
                                style={{ color: isWishlist ? 'red' : 'gray', cursor: 'pointer', fontSize: '40px' }}
                                onClick={toggleWishlist}
                            </FontAwesomeIcon>    
                            
                            <h1 onClick={goBackHandler}>regresar</h1>
                    </div>
                </div>
            </div>


        </Container>
                )}
                </div>
    );
};

export default DetailMovie;
