/* global google*/

import React, { Component, PropTypes } from 'react'
import { AutoComplete } from 'material-ui'

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

  componentDidMount() {
    // const { componentRestrictions } = this.props
    // const config = {
    //   componentRestrictions
    // }

    // this.autocomplete = new google.maps.places.Autocomplete(this.refs.input, config);
    //
    // this.autocomplete.addListener('place_changed', this.onSelected.bind(this));

    this.setState({
      autocompleteService: new google.maps.places.AutocompleteService(),
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.onUpdateInput(nextProps.searchText, this.state.dataSource)
      this.handleInputChange(nextProps.searchText)
    }
  }

  updateDatasource(data) {
    if (!data || !data.length) {
      return false
    }

    this.setState({
      dataSource: data.map(place => place.description),
      data,
    })
  }

  onUpdateInput = (searchText, dataSource) => {
    if (!searchText.length || !this.state.autocompleteService) {
      return false
    }

    this.state.autocompleteService.getPlacePredictions({
      input: searchText,
      componentRestrictions: this.props.componentRestrictions,
      location: this.props.location || new google.maps.LatLng(0, 0),
      radius: this.props.radius || 0
    }, data => this.updateDatasource(data))
  }

  onNewRequest = (searchText, index) => {
    // The index in dataSource of the list item selected, or -1 if enter is pressed in the TextField
    if (index === -1) {
      return false
    }

    this.props.onNewRequest(this.state.data[index], searchText, index)
  }

  handleInputChange = (searchText) => {
    this.props.onChange({ target: { value: searchText } })
  }

  render() {
    return (
      <AutoComplete
        {...this.props}
        ref={this.props.getRef}
        filter={AutoComplete.noFilter}
        onUpdateInput={this.handleInputChange}
        dataSource={this.state.dataSource}
        onNewRequest={this.onNewRequest}
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
  getRef: PropTypes.func,
}

export default LocationAutoComplete
