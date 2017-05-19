const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json';

export default {
  apiKey: null,

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  },

  /**
   * Given an address, returns the geocoordinates.
   * @param {String} address
   * @return {String} geocoordinates
   */
  async getFromLocation(address) {
    if (!this.apiKey) {
      return Promise.reject(new Error('Provided API key is invalid'));
    }

    if (!address) {
      return Promise.reject(new Error('Provided address is invalid'));
    }

    const url = `${googleApiUrl}?key=${this.apiKey}&address=${encodeURI(address)}`;
    const response = await fetch(url).catch(
      () => {
        return Promise.reject(new Error('Error fetching data'));
      }
    );

    const json = await response.json().catch(
      () => {
        return Promise.reject(new Error('Error parsing server response'));
      }
    );

    if (json.status === 'OK') {
      return json;
    }
    return Promise.reject(new Error(`Server returned status code ${json.status}`));
  },
  /**
   * Given geocoordinates, returns a matching address.
   * @param {String} geocoordinates
   * @return {String} address
   */
  async getFromCoords(coords) {
    if (!this.apiKey) {
      return Promise.reject(new Error('Provided API key is invalid'));
    }

    if (!coords) {
      return Promise.reject(new Error('Provided coordinates are invalid'));
    }

    const { lat, lng } = coords;
    const url = `${googleApiUrl}?key=${this.apiKey}&latlng=${lat},${lng}`;
    const response = await fetch(url).catch(
      () => {
        return Promise.reject(new Error('Error fetching data'));
      }
    );

    const json = await response.json().catch(
      () => {
        return Promise.reject(new Error('Error parsing server response'));
      }
    );

    if (json.status === 'OK') {
      return json;
    }
    return Promise.reject(new Error(`Server returned status code ${json.status}`));
  },
  async getCityFromCoords(coords) {
    const response = await this.getFromCoords(coords).catch(
      () => {
        return Promise.reject(new Error('Error fetching data'));
      }
    );
    return this.getCityFromResponse(response);
  },
  async getCityFromResponse(response) {
    let city = '';
    let state = '';
    let country = '';

    try {
      let typeFound = '';
      const components = response.results[0].address_components;

      for (let component of components) {
        const { types } = component;
        for (let type of types) {
          if (type === 'locality') {
            typeFound = 'locality';
            break;
          } else if (type === 'administrative_area_level_1') {
            typeFound = 'administrative_area_level_1';
            break;
          } else if (type === 'country') {
            typeFound = 'country';
            break;
          }
        }
        if (typeFound === 'locality') {
          city = component.long_name;
          typeFound = '';
        } else if (typeFound === 'administrative_area_level_1') {
          state = component.short_name;
          typeFound = '';
        } else if (typeFound === 'country') {
          country = component.short_name;
          typeFound = '';
        }
      }
    } catch (error) {
      return Promise.reject(new Error('No city found in response.'));
    }

    if (city === '') city = 'undefined';
    if (state === '') state = 'undefined';
    if (country === '') country = 'undefined';

    return { city, state, country };
  }
};
