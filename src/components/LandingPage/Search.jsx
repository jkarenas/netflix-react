import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { MdOutlineSearch } from "react-icons/md";
import { MdOutlinePlayArrow } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";
import { PiTag } from "react-icons/pi";
import { PiShareNetwork } from "react-icons/pi";
import { RiLoader4Line } from "react-icons/ri";

const Container = styled.div`
  position: relative; /* Agregar posición relativa */
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color:gray;
`
;

const Form = styled.form`
  position: absolute; /* Cambiar a posición absoluta */
  top:100px; /* Ajustar posición verticalmente */
  left: 50%; /* Ajustar posición horizontalmente */
  transform: translate(-50%, -50%); /* Centrar el formulario */
  z-index: 1; /* Colocar encima de la portada */
 

  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  width:55rem;
  background: rgba(255, 255, 255, 0.3);
`;
const SearchInput = styled.input`
  flex: 1;
  padding: 5px;
  border: none;
  border-radius:  4px 0 0 4px ;
  font-size: 30px;
  background: none;
  color: white;
  &::placeholder {
    color: white; /* Cambiar el color del placeholder a blanco */
  }
`;

const SearchButton = styled.button`
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 30px;
  cursor: pointer;
  background: none;
 
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr ));
  grid-gap: 30px;
  padding-top:200px;
  width:100%;


  .movie-card {
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color:black;
    display:flex;
    flex-direction: column;
    .info{
      padding:9px;
    }


    h1 {
        margin-top:0;
        margin-bottom:0;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color:white;
    }
    h2{
        color:white;
        font-size:7px;

    }
    h3 {
        font-size: 5px;
        margin-bottom: 5px;
        color:gray;
        margin-top:0;
      }
      .icons{
        display:flex;
        font-size:13px;
        color:red;
        justify-content:space-between;
      }
      span{
        border: 1px solid red;
        border-radius:4px;
        font-size:8px;
      }

    img {
      width: 100%;
      height: 50%;
      border-radius: 4px;

      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }
`;

const Spinner = styled(RiLoader4Line)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 30rem;
  transform: translate(-50%, -50%);
  font-size: 150px;
  color: white;
  animation: spin 2s linear infinite; /* Agregar la animación spin */
  
  @keyframes spin {
    from {
      transform: rotate(0deg); /* Rotación inicial */
    }
    to {
      transform: rotate(360deg); /* Rotación completa */
    }
  }
`;

const Search = ({onSearchResults}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setTimeout(async() =>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=9b4a53b9c46e8e5ad58cc4b20b76d9ff`
      );
      setSearchResults(response.data.results);
      setLoading(false);
      },2000)


    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      handleSearch();
      onSearchResults(true)
    }else{
        onSearchResults(false)
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Buscar"
          value={query}
          onChange={handleChange}
        />
        <SearchButton type="submit"><MdOutlineSearch /></SearchButton>
      </Form>
      {loading && <Spinner />}
      <ResultsContainer style={{ paddingTop: searchResults.length > 0 ? '200px' : '0' }}>
        {searchResults.map((movie) => (
          <div key={movie.id} >
            <Link className="movie-card" to={`/movie/${movie.id}`}>
              <img className='movieImg' src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
              <div className='info'>
              <h1>{movie.title}</h1>
              <h3>{`released: ${movie.release_date}  /  language ${movie.original_language}`}</h3>
              <h2>SUMMARY</h2>
              <h3>{movie.overview}</h3>
              <div className='icons'>
                <span><MdOutlinePlayArrow />watch trailer</span>
                <AiFillSave />
                <PiTag />
                <PiShareNetwork />
              </div>
              </div>
            </Link>
          </div>
        ))}
      </ResultsContainer>
    </Container>
  );
};

export default Search;
