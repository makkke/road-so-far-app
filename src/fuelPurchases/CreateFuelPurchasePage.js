import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AppBar, DatePicker } from 'material-ui'
import LocationAutoComplete from '../app/components/LocationAutoComplete'

class CreateFuelPurchasesPage extends Component {
  constructor() {
    super()

    // get user geolocation and prepopulate LocationAutoComplete
    navigator.geolocation.getCurrentPosition((position) => {
      const geocoder = new google.maps.Geocoder

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK') {
          const [address] = results
          if (address) {
            this.setState({ searchText: address.formatted_address })
          }
        }
      })
    })
  }

  state = {
    searchText: '',
    createdAt: new Date(),
    location: {
      address: '',
      city: '',
      region: '',
    },
    loading: false,
    errors: {},
  }

  render() {
    const { createdAt } = this.state

    return (
      <div>
        <AppBar
          title="Create Fuel Purchase"
        />
        <DatePicker
          floatingLabelText="Date"
          autoOk
          maxDate={new Date()}
          value={createdAt}
          onChange={(event, date) => this.setState({ createdAt: date })}
        />
        <LocationAutoComplete
          searchText={this.state.searchText}
          name={'location'}
          floatingLabelText="Location"
          onChange={event => this.setState({ searchText: event.target.value })}
          onNewRequest={(selectedData, searchedText, selectedDataIndex) => console.log(selectedData, searchedText, selectedDataIndex)}
        />
        <TextField
          name="quantity"
          floatingLabelText="Quantity"
          onChange={this.handleInputChange}
        />
        {/* <Autocomplete
          style={{ width: '90%' }}
          onPlaceSelected={(place) => {
            console.log(place)
          }}
          types={['(regions)']}
          componentRestrictions={{ country: ['ca', 'us'] }}
        /> */}
      </div>
    )
  }
}

CreateFuelPurchasesPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    fuelPurchases: PropTypes.array,
  }).isRequired,
}

const MyQuery = gql`
  query MyQuery {
    fuelPurchases {
      id
      quantity {
        value
      }
      createdAt
    }
  }
`

const CreateFuelPurchasesPageWithData = graphql(MyQuery)(CreateFuelPurchasesPage)

export default CreateFuelPurchasesPageWithData
