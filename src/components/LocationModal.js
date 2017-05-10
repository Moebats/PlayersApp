import React, { Component } from 'react';
import {
  View,
  Modal,
  ListView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Card, CardSection, Button, Spinner } from './common';
import GeocodingUtil from '../utils/GeocodingUtil';

/**
  The LocationModal is a component that is hidden by default and sits
  on top of a rendered component. The purpose of this modal is too allow
  a user to manually enter an address and the search results are shown
  inside a listview. The user can then select the address corresponding
  to theirs which will fire the onGeoLocationSuccess callback. See
  SignupForm for its usage. This component is used in conjunction with
  the LocationButton but not necessary.

  User of this component needs to ensure that the 4 required function
  props are passed. These props are:

  visible - show/hide the modal

  onGeoLocationSuccess - Callback function if location service successfully
  obtains the geolocation

  onLocationSuccess - Callback function if a city is successfully retrieved
  using google api based on the geolocation
*/
class LocationModal extends Component {

  /**
    Constructor used to bind the methods with this component. Apparently
    this is best practice for binding for ES6.
  */
  constructor(props) {
    super(props);
    this.lookupAddress = this.lookupAddress.bind(this);
    this.onLocationSuccess = this.onLocationSuccess.bind(this);
    this.onGeoLocationSuccess = this.onGeoLocationSuccess.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  /**
    Called before component is mounted. set the initial state, search input
    set to empty string and loading spinner is disabled. We also set a
    datasource for our listview with an empty array.
  */
  componentWillMount() {
    this.state = { search: '', loading: false };
    this.createDataSource([]);
  }

  /**
    This method is called when a city is successfully obtained from the
    selected address. In turn it calls the prop function onLocationSuccess.
  */
  onLocationSuccess(location) {
    return this.props.onLocationSuccess(location);
  }

  /**
    This method is called when geolocation is successfully obtained from the
    selected address. In turn it calls the prop function onGeoLocationSuccess.
  */
  onGeoLocationSuccess(location) {
    return this.props.onGeoLocationSuccess(location);
  }

  createDataSource(results) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    console.log(results);
    this.dataSource = ds.cloneWithRows(results);
    //force update so that this component is re-rendered even though there
    //is no state change.
    this.forceUpdate();
  }

  /**
    Callback fired when the address 'Search' button is hit. This will cause
    the loading spinner to render while we try to retrieve a list of matching
    addresses using google api. On success, we set our datasource with the
    results. We make sure the loading spinner is disabled afterwards, even
    on an error.
  */
  lookupAddress() {
    this.setState({ loading: true });
    GeocodingUtil.getFromLocation(this.state.search)
    .then((response) => {
      this.createDataSource(response.results);
      this.setState({ loading: false });
    })
    .catch(() => {
      this.setState({ loading: false });
    });
  }

  /**
    Renders search button or spinner depending on the 'loading' state
  */
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.lookupAddress} >
        Search
      </Button>
    );
  }

  /**
    Render a listview row using an inner class component called
    LocationListItem which takes to prop callback funtions and
    the appropriate address related json data.
  */
  renderRow(result) {
    return (
      <LocationListItem
        onLocationSuccess={this.onLocationSuccess}
        onGeoLocationSuccess={this.onGeoLocationSuccess}
        result={result}
      />
    );
  }

  render() {
    const { modal, inputStyle, containerStyle, listView } = styles;

    return (
      <Modal
        animationType={'slide'}
        onRequestClose={() => {}}
        transparent
        visible={this.props.visible}
      >
        <View style={modal}>
          <Card>
            <CardSection>
              <View style={containerStyle}>
                <TextInput
                  autoFocus
                  autoCapitalize={'none'}
                  editable
                  placeholder={'123 Yonge St, ON, Canada'}
                  autoCorrect={false}
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ search: text })}
                  value={this.state.search}
                />
              </View>
            </CardSection>
            <CardSection>
              {this.renderButton()}
            </CardSection>
            <ListView
              style={listView}
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
          </Card>
        </View>
      </Modal>
    );
  }
}

/**
  LocationListItem is an inner class specialized to be used inside the
  LocationModal listview.

  User of this component needs to ensure that the 2 required function
  props are passed. These props are:

  onGeoLocationSuccess - Callback function if location service successfully
  obtains the geolocation

  onLocationSuccess - Callback function if a city is successfully retrieved
  using google api based on the geolocation
*/
class LocationListItem extends Component {

  /**
    This method is invoked when a listview item is selected. The city and
    geolocation values are extracted from the listitem and approproate
    callbacks are fired.
  */
  onRowPress() {
    GeocodingUtil.getCityFromResponse({ results: [this.props.result] })
    .then((city) => {
      this.props.onLocationSuccess(city);
      this.props.onGeoLocationSuccess(this.props.result.geometry.location);
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.rowStyle}>
              {this.props.result.formatted_address}
            </Text>
          </CardSection>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  modal: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  listView: {
    marginTop: 10
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default LocationModal;
