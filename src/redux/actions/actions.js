import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from "./types";
import  axios from 'axios';



export const addMovie = (movie) => {
    console.log('Adding movie to favorites:', movie)
    return async function (dispatch) {
        try {
            const response = await axios.post("https://servidor-favoritos.onrender.com/movies/create", movie);
            dispatch({
                type: ADD_FAVORITE,
                payload: response.data.data 
            });
            return response;
        } catch (error) {
            console.error('Error adding movie to favorites:', error);
            throw error; 
        }
    }
}

export const deleteMovie = (id) => {
    console.log('Deleting movie from favorites with ID:', id);
    return async function (dispatch) {
        try {
            await axios.delete(`https://servidor-favoritos.onrender.com/movies/delete/${id}`);
            dispatch({
                type: DELETE_FAVORITE,
                payload: id
            });
        } catch (error) {
            console.error('Error deleting movie from favorites:', error);
            throw error; 
        }
    }
}

export const getFavorites = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get('https://servidor-favoritos.onrender.com/movies/read');
            dispatch({
                type: GET_FAVORITES,
                payload: response.data.data 
            });
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error; 
        }
    };
};


