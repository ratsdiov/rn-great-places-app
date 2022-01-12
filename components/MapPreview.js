import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

import ENV from '../env';

const MapPreview = (props) => {
    let imagePreviewUrl;

    if (props.location) {
        // imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
        console.log(`MapPreview using dummy image, real URL would be https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`);
        imagePreviewUrl = 'https://i.stack.imgur.com/HILmr.png';
        // imagePreviewUrl = 'https://www.xda-developers.com/files/2019/06/google-maps-india.jpg';
    }
    return (
        <View style={{ ...styles.mapPreview, ...props.style }}>
            {props.location ? (
                <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
            ) : (
                props.children
            )}
        </View>
    );
};

export default MapPreview;

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%',
    }
});
