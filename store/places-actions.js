import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            FileSystem.moveAsync({

            });
        } catch (err) {
            console.log("file moe error", err);
        }
        dispatch({
            type: ADD_PLACE,
            placeData: { title: title, image: image }
        });
    };
};