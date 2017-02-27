import React, { Component, PropTypes } from 'react'
import { AutoComplete } from 'material-ui'

import { autocomplete, places, getAddressComponents } from '../../../utils/google'

class LocationAutoComplete extends Component {
  static defaultProps = {
    componentRestrictions: {
      country: ['ca', 'us'],
    },
  }

  state = {
    dataSource: [],
    data: [],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.handleInputChange(nextProps.searchText)
    }
  }

  updateDataSource(data) {
    if (!data || !data.length) {
      return
    }

    this.setState({
      dataSource: data.map(place => place.description),
      data,
    })
  }

  handleNewRequest = (searchText, index) => {
    if (index === -1) {
      return
    }

    const data = this.state.data[index]
    places.getDetails({ placeId: data.place_id }, (address) => {
      this.props.onPlaceChange(getAddressComponents(address))
    })
  }

  handleInputChange = (searchText) => {
    if (!searchText.length) {
      return
    }

    autocomplete.getPlacePredictions({
      input: searchText,
      componentRestrictions: this.props.componentRestrictions,
      types: ['(cities)'],
      location: this.props.location || new google.maps.LatLng(0, 0),
      radius: this.props.radius || 0,
    }, data => this.updateDataSource(data))

    this.props.onChange({ target: { value: searchText } })
  }

  render() {
    return (
      <AutoComplete
        {...this.props}
        filter={AutoComplete.noFilter}
        onUpdateInput={this.handleInputChange}
        dataSource={this.state.dataSource}
        onNewRequest={this.handleNewRequest}
      />
    )
  }
}

LocationAutoComplete.propTypes = {
  searchText: PropTypes.string,
  componentRestrictions: PropTypes.object,
  location: PropTypes.object,
  radius: PropTypes.number,
  onNewRequest: PropTypes.func,
  onPlaceChange: PropTypes.func,
  onChange: PropTypes.func,
}

export default LocationAutoComplete
