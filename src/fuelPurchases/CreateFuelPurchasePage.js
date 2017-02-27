import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AppBar, DatePicker, TextField, RaisedButton } from 'material-ui'

import { getCurrentLocation } from '../utils/google'
import { isProvince } from './utils'
import LocationAutoComplete from '../app/components/LocationAutoComplete'

class CreateFuelPurchasesPage extends Component {
  constructor() {
    super()
    // TODO: for some reason async is not working here, need to find out why
    getCurrentLocation().then(({ city, region, country }) => {
      this.setState({
        searchText: `${city}, ${region}, ${country}`,
        city,
        region,
      })
    })
  }

  state = {
    searchText: '',
    loading: false,
    errors: {},

    quantity: 0,
    address: '',
    region: '',
    city: '',
    createdAt: new Date(),
  }

  handleInputChange = (event) => {
    const { errors } = this.state
    const value = event.target.value.trim()
    const field = event.target.name

    errors[field] = null
    this.setState({ [field]: value, errors })
  }

  handleCreateButtonClick = () => {
    // validate
    const { errors } = this.state
    const quantity = parseInt(this.state.quantity, 10)

    if (isNaN(quantity)) {
      errors.quantity = 'Should be a number'
      this.setState({ errors })
      return
    } else if (quantity <= 0) {
      errors.quantity = 'Should be positive'
      this.setState({ errors })
      return
    }

    // TODO: should redirect after creation is done or optimictiq ui
    this.props.createFuelPurchase({ ...this.state, quantity })
    this.context.router.push('/fuel-purchases')
  }

  render() {
    const { createdAt, errors } = this.state

    return (
      <div>
        <AppBar title="Create Fuel Purchase" />
        <DatePicker
          floatingLabelText="Date"
          autoOk
          maxDate={new Date()}
          value={createdAt}
          onChange={(event, date) => this.setState({ createdAt: date })}
        />
        <LocationAutoComplete
          searchText={this.state.searchText}
          name="location"
          floatingLabelText="Location"
          onChange={event => this.setState({ searchText: event.target.value })}
          onPlaceChange={({ city, region }) => this.setState({ city, region })}
        />
        <TextField
          name="quantity"
          type="number"
          floatingLabelText="Quantity"
          errorText={errors.quantity}
          onChange={this.handleInputChange}
        />
        <RaisedButton
          fullWidth
          onClick={this.handleCreateButtonClick}
        >Create Fuel Purchase</RaisedButton>
      </div>
    )
  }
}

CreateFuelPurchasesPage.contextTypes = {
  router: PropTypes.object // eslint-disable-line
}

CreateFuelPurchasesPage.propTypes = {
  createFuelPurchase: PropTypes.func.isRequired,
}

const createFuelPurchase = gql`
  mutation createFuelPurchase($input: FuelPurchaseInput!) {
    createFuelPurchase(input: $input) {
      id
    }
  }
`

const CreateFuelPurchasesPageWithData = graphql(createFuelPurchase, {
  props: ({ mutate }) => ({
    createFuelPurchase: (fuelPurchase) => {
      const quantity = {
        value: fuelPurchase.quantity,
        unit: isProvince(fuelPurchase.region) ? 'LITER' : 'GALLON',
      }
      const input = {
        quantity,
        createdAt: fuelPurchase.createdAt,
        region: fuelPurchase.region,
        city: fuelPurchase.city,
      }

      return mutate({ variables: { input } })
    },
  }),
})(CreateFuelPurchasesPage)

export default CreateFuelPurchasesPageWithData
