import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const dashboard_api = createAsyncThunk(
    'dashboard', async () => {
        const response = await axios.get('https://www.swapi.tech/api')        
        return response.data.result
    }
)

export const film_api = createAsyncThunk(
    'api/films', async () => {
        const response = await axios.get('https://www.swapi.tech/api/films')        
        return response.data.result
    }
)

export const people_api = createAsyncThunk(
    'api/people', async () => {
        const response = await axios.get('https://www.swapi.tech/api/people')        
        return response.data.results
    }
)

export const getData_api = createAsyncThunk(
    'api/getData', async (url:string) => {
        const response = await axios.get(url)
        return response.data.result
    }
)
export const planets_api = createAsyncThunk(
    'api/people', async () => {
        const response = await axios.get('https://www.swapi.tech/api/planets')        
        return response.data.results
    }
)
export const species_api = createAsyncThunk(
    'api/species', async () => {
        const response = await axios.get('https://www.swapi.tech/api/species/')
        return response.data.results
    }
)
export const starships_api = createAsyncThunk(
    'api/starships', async () => {
        const response = await axios.get('https://www.swapi.tech/api/starships')        
        return response.data.results
    }
)
export const vehicles_api = createAsyncThunk(
    'api/vehicles', async () => {
        const response = await axios.get('https://www.swapi.tech/api/vehicles')        
        return response.data.results
    }
)