import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = () => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        // Above gives a warning, see https://stackoverflow.com/questions/68668152/react-native-expo-permission-deprecated-what-to-use-now
        // const result = await Camera.requestPermissionsAsync(); 
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            // console.log('getlocationhandler', location);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert('Could not fetch location!',
                'Please try again later or pick a location on the map.',
                [{ text: 'Okay' }]);
        }
        setIsFetching(false);
    };
    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {isFetching ? (
                    <ActivityIndicator size='large' color={Colors.primary} />
                ) : (
                    <Text>No location chosen yet!</Text>
                )}
            </MapPreview>
            <Button
                title="Get User Location"
                color={Colors.primary}
                onPress={getLocationHandler}
            />
        </View>
    );
};

export default LocationPicker;

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    }

});
