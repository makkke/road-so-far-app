import React from 'react'
import moment from 'moment'

const styles = {
  item: {
    width: '95%',
    height: '75px',
    margin: 'auto auto 2px',
    backgroundColor: '#5B6382',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pair: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  dateTop: {
    color: '#AFAFC1',
    alignSelf: 'center',
  },
  dateBottom: {
    fontSize: 12,
    alignSelf: 'center',
  },
  bottom: {
    color: '#81879C',
  },
}

function FuelPurchaseItem(props) {
  let item = null
  if (props.item) {
    item = props.item
  }

  const createdAt = moment(parseInt(item.createdAt, 10))

  return (
    <div style={styles.item}>
      <div style={styles.pair}>
        <span style={styles.dateTop}>
          {createdAt.format('D')}
        </span>
        <span style={{ ...styles.bottom, ...styles.dateBottom }}>
          {createdAt.format('MMM').toUpperCase()}
        </span>
      </div>
      <div style={styles.pair}>
        <span style={styles.dateTop}>
          {item.city}
        </span>
        <span style={{ ...styles.bottom, ...styles.dateBottom }}>
          {item.region}
        </span>
      </div>
      <div style={styles.pair}>
        <span style={styles.dateTop}>
          {item.city}
        </span>
        <span style={{ ...styles.bottom, ...styles.dateBottom }}>
          {item.region}
        </span>
      </div>
      <div style={styles.pair}>
        <span style={styles.dateTop}>
          {item.quantity.value}
        </span>
        <span style={{ ...styles.bottom, ...styles.dateBottom }}>
          {item.quantity.unit}
        </span>
      </div>
    </div>
  )
}

FuelPurchaseItem.propTypes = {
  item: React.PropTypes.object.isRequired, // eslint-disable-line
}

export default FuelPurchaseItem
