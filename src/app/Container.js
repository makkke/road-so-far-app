import React from 'react'
import Helmet from 'react-helmet'

function Container(props) {
  let children = null
  if (props.children) {
    children = React.cloneElement(props.children, {
      auth: props.route.auth // eslint-disable-line
    })
  }

  return (
    <div>
      <Helmet
        titleTemplate="%s | Road So Far"
        meta={[
          { charset: 'utf-8' },
          {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
        ]}
      />
      {children}
    </div>
  )
}

Container.propTypes = {
  children: React.PropTypes.object.isRequired, // eslint-disable-line
}

export default Container
