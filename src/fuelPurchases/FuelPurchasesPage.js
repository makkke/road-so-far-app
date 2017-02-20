import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FABButton, Icon } from 'react-mdl'
import { Link } from 'react-router'

class FuelPurchasesPage extends Component {
  state = {}

  render() {
    const { fuelPurchases = [] } = this.props.data
    return (
      <div>
        <h1>Fuel Purchases</h1>
        <ul>
          {fuelPurchases.map(x => <li key={x.id}>{x.quantity.value} Liters</li>)}
        </ul>
        <Link to="/fuel-purchases/create">
          <FABButton colored>
            <Icon name="add" />
          </FABButton>
        </Link>
      </div>
    )
  }
}

FuelPurchasesPage.propTypes = {
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

const FuelPurchasesPageWithData = graphql(MyQuery)(FuelPurchasesPage)

export default FuelPurchasesPageWithData
