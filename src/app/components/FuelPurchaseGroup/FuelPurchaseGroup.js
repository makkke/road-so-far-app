import React from 'react'
import moment from 'moment'

import FuelPurchaseItem from './FuelPurchaseItem'

const styles = {
  date: {
    margin: '10px 0 10px 0',
    textAlign: 'center',
    color: '#545D7D',
  },
}

function FuelPurchaseGroup(props) {
  let fuelPurchaseItems = null
  if (props.fuelPurchaseItems) {
    fuelPurchaseItems = props.fuelPurchaseItems
  }

  const date = moment(parseInt(fuelPurchaseItems[0].createdAt, 10)).format('MMMM, YYYY')

  return (
    <div>
      <div style={styles.date}>
        {date.toUpperCase()}
      </div>
      {fuelPurchaseItems.map(item => <FuelPurchaseItem item={item} />)}
    </div>
  )
}

FuelPurchaseGroup.propTypes = {
  fuelPurchaseItems: React.PropTypes.array.isRequired, // eslint-disable-line
}

export default FuelPurchaseGroup
