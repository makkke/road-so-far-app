import React from 'react'
import Layout from '../../components/Layout'
import s from './styles.css'
import { title } from './index.md'

class HomePage extends React.Component {

  static propTypes = {
  }

  componentDidMount() {
    document.title = title
  }

  render() {
    return (
      <Layout className={s.content}>
        <h4>Articles</h4>
        <p>
          <br /><br />
        </p>
      </Layout>
    )
  }

}

export default HomePage
