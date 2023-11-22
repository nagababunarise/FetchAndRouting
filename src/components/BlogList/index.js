import {Component} from 'react'
import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogData()
  }

  getBlogData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formatData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: formatData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader
            type="TailSpin"
            data-testId="loader"
            color="#00BFFF"
            height={50}
            width={50}
          />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}
export default BlogList
