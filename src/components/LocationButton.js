import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import GeocodingUtil from '../utils/GeocodingUtil';

/**
 The LocationButton is to be used as a Button wrapper on a component
 that will open an Alert dialog with three options:

 - Use Location service
 - Manually Enter Location
 - Cancel

 Usage of this component is in the SignupForm.

 User of this component needs to ensure that the 4 required function
 props are passed. These props are:

 onCancelPressed - Callback function if cancel is pressed

 onGeoLocationSuccess - Callback function if location service successfully
 obtains the geolocation

 onLocationSuccess - Callback function if a city is successfully retrieved
 using google api based on the geolocation

 onManuallyEnterLocation - Callback function if user selects the
 'Enter Location Manually' onPositionChange
*/
class LocationButton extends Component {

  constructor(props) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
  }

  /**
    This is called when LocationButton is pressed. An non-cancellable
    Alert is presented with 3 options for the user.
  */
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

  /**
    This method is called when the user selects the 'User Location Service'
    option. It's responsible to use the geo location service of the mobile
    device to obtain the current position. If the position is successfully
    acquired, google api is used to obtain the city from the geocoordinates.
    If things go smooth callback props onGeoLocationSuccess and
    onLocationSuccess are successfully fired. In case of a failure,
    onGeoLocationError() is called.
  */
  onUseLocationService() {
    const locationTimeout = setTimeout(() => this.onGeoLocationError(), 2000);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(locationTimeout);
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
      () => {
        clearTimeout(locationTimeout);
        this.onGeoLocationError();
      },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
  }

  /**
    Called when an error is encountered using the location service of the
    mobile device. An Alert is presented to the user with only 2 options.
    The user can choose to Manually Enter their location or press cancel.
  */
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

  /**
    The onManuallyEnterLocation callback is triggered if the user selects
    the 'Manually Enter Location' option.
  */
  onManuallyEnterLocation() {
    this.props.onManuallyEnterLocation();
  }

  /**
    LocationButton is rendered as a TouchableOpacity
  */
  render() {
    return (
      <TouchableOpacity onPress={this.onPressButton}>
          { this.props.children }
      </TouchableOpacity>
    );
  }
}

export default LocationButton;
