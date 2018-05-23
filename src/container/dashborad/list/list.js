import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import GoodsCard from './../../../component/goodsCard/goodsCard'
@connect(
  state => state.user
)

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    this.getGoodsList()
  }
  getGoodsList() {
    axios.get('/goods/list')
      .then(r => {
        r = r.data
        if(r && r.code === 0) {
          this.setState({
            list: r.result
          })
        }
      })
  }
  render() {
    return (
      <div>
        {
          this.state.list.map(v => (
            <GoodsCard {...v} key={v._id}></GoodsCard>
          ))
        }
      </div>
    )
  }
}