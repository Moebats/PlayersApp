import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import GeocodingUtil from '../utils/GeocodingUtil';

class LocationButton extends Component {

  constructor(props) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    Alert.alert(
      'Location',
      'Cricket App requires you to set a home location.',
      [
        { text: 'Use Location Service', onPress: () => this.onUseLocationService() },
        { text: 'Manually Enter Location', onPress: () => this.onManuallyEnterLocation() },
        { text: 'Cancel', onPress: () => this.props.onCancelPressed() }
      ],
      { cancelable: false }
    );
  }

  onUseLocationService() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //create a geolocation object using lat, lng values
        const geolocation = { lat: position.coords.latitude,
          lng: position.coords.longitude };

        //update state with obtained geo location.
        this.props.onGeoLocationSuccess(geolocation);

        //Use reverse geocoding to obtain address.
        GeocodingUtil.getCityFromCoords(geolocation)
        .then(city => this.props.onLocationSuccess(city))
        .catch(() => this.onGeoLocationError());
      },
      () => this.onGeoLocationError(),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  onGeoLocationError() {
    Alert.alert(
      'Error',
      'Unable to use the location service on your mobile device.',
      [
        { text: 'Manually Enter Location', onPress: () => this.onManuallyEnterLocation() },
        { text: 'Cancel', onPress: () => this.props.onCancelPressed() }
      ],
      { cancelable: false }
    );
  }

  onManuallyEnterLocation() {
    this.props.onManuallyEnterLocation();
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPressButton}>
          { this.props.children }
      </TouchableOpacity>
    );
  }
}

export default LocationButton;
