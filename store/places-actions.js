import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const addPlace = (title, image, location) => {
    return async dispatch => {
        /* Stubbed out due to not having api key
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=$(ENV.googleApiKey})`);

        if (!response.ok) {
            throw new Error ('Error in geocoding fetch');
        }

        const resData = await response.json();
        
        if (!resData.results) {
            throw new Error('Error in getting geocoding response');
        }

        const address = resData.results[0].formatted_address;
        */
        const address = `Fake address, ${location.lat}, ${location.lng}`;
        // console.log(address);

        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);
            // console.log(dbResult);
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            });
        } catch (err) {
            console.log("file moe error", err);
        }
    };
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
            // console.log(dbResult);
        } catch (err) {
            throw err;
        }
    };
};