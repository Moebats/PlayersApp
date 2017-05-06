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

class LocationModal extends Component {

  constructor(props) {
    super(props);
    this.lookupAddress = this.lookupAddress.bind(this);
    this.onLocationSuccess = this.onLocationSuccess.bind(this);
    this.onGeoLocationSuccess = this.onGeoLocationSuccess.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.state = { search: '', loading: false };
    this.createDataSource([]);
  }

  onLocationSuccess(location) {
    return this.props.onLocationSuccess(location);
  }

  onGeoLocationSuccess(location) {
    return this.props.onGeoLocationSuccess(location);
  }

  createDataSource(results) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    console.log(results);
    this.dataSource = ds.cloneWithRows(results);
    this.forceUpdate();
  }

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

class LocationListItem extends Component {

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
