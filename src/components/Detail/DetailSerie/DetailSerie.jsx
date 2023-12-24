import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled'
import Search from '../../LandingPage/Search';


const Container = styled.div`
    .bigImage{
        width:100%;
        height:30rem;
    }
    .smallImage{
        position: relative;
        left:5rem;
        top:-19rem;

        img{
            width: 300px; /* Ajusta el ancho de la imagen pequeña */
            height: auto; /* Mantiene la proporción del tamaño */
            display: block;
            border-radius: 10px; /* Agrega bordes redondeados según sea necesario */
        }
    }
    .serieName{
        position: relative;
          color: white;
        top:-23rem;
        font-size:4rem;
    }
    .infoContainer{
        display:flex;
        gap:7rem;


    }
    .overview{
        position: relative;
        top:-15rem;
        color:white;
    }
    .genres {
        display: flex;
        justify-content:center;
        
        
        .circle {
            display: inline-block;
            border-radius: 30%;
            background-color: white;
            color: gray;
            padding: 2px;
            margin: 3px;
        }
    }


`




const DetailSerie = () => {
    const [showSearchResults, setShowSearchResults] = useState(false);

const handleSearchResults = (areResultsVisible) => {
  setShowSearchResults(areResultsVisible);
};
    const [getDetail, setGetDetail] = useState({});
    const { id } = useParams();

    const fetchSerieDetail = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=9b4a53b9c46e8e5ad58cc4b20b76d9ff`);
            console.log('Serie Response:', response.data);
            setGetDetail(response.data);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    useEffect(() => {
        fetchSerieDetail();
    }, [id]); // Agregar 'id' como dependencia para actualizar cuando cambie

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
                <div>
                    <p className='serieName'> {getDetail.name}</p>
                    <p className='overview'>Overview: {getDetail.overview}</p>
                    {/* <h2>{getDetail.id}</h2> */}
                </div>
            </div>


            
        </Container>
        )}
      </div>

        
    );
};

export default DetailSerie;
