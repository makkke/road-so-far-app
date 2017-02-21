import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FloatingActionButton } from 'material-ui'
import { ContentAdd } from 'material-ui/svg-icons'

const styles = {
  button: {
    position: 'fixed',
    right: 24,
    bottom: 24,
  },
}

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
        <Link to="/fuel-purchases/create" style={styles.button}>
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
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
