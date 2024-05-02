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
    'api/people', async (data:string) => {
        const response = await axios.get('https://www.swapi.tech/api/'+data)        
        return response.data.results
    }
)

export const getData_api = createAsyncThunk(
    'api/getData', async (url:string) => {
        const response = await axios.get(url)
        return response.data.result
    }
)