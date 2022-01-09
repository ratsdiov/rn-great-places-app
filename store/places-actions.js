import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

import { insertPlace, fetchPlaces } from '../helpers/db';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 12.3);
            // console.log(dbResult);
            dispatch({
                type: ADD_PLACE,
                placeData: { id: dbResult.insertId, title: title, image: image }
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