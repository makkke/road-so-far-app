import React from 'react'
import Layout from '../../components/Layout'
import s from './styles.css'
import { title } from './index.md'

class AboutPage extends React.Component {

  componentDidMount() {
    document.title = title
  }

  render() {
    return (
      <Layout className={s.content}>
        <h1>{title}</h1>
      </Layout>
    )
  }

}

export default AboutPage
