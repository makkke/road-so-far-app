import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FABButton, Icon } from 'react-mdl'
import { Link } from 'react-router'
import { DatePicker } from 'react-mdl-datepicker'
import moment from 'moment'

class CreateFuelPurchasesPage extends Component {
  state = {
    createdAt: moment(),
    password: '',
    loading: false,
    errors: {},
  }

  render() {
    const { createdAt } = this.state

    return (
      <div>
        <h1>Create Fuel Purchase</h1>
        <DatePicker
          label="Date"
          defaultDate={createdAt}
          maxDate={createdAt}
          onChange={(x) => console.log(x)}
        />
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
