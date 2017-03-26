import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

export default React.createClass({
  getInitialState() {
    return {
      blogData: {
        _id: "",
        author: "admin",
        timeStamp: "",
        content: "",
        title: "",
        user_info: {
          user_id: "",
          user_name: "",
          user_imgSrc: ""
        }
      }
    }
  },
  getArticleData() {
    $.get(`https://tiny-tiny.herokuapp.com/collections/sa_tech_voices_test11/${this.props.params.articleID}`, (response) => {
      this.setState({
        blogData: {
          _id: response._id,
          timeStamp: response.timeStamp,
          content: response.content,
          title: response.title,
          user_info: response.user_info
        }
      })
    })
  },
  componentWillMount() {
    this.getArticleData()
  },
  render() {
    return (
      <main className="articleContainer">
        <header className="article__header">
          <img src={this.state.blogData.user_info.user_imgSrc}
               alt="headshot of author"
               className="article__authorHeadshot"/>
          <h4 className="article__author">
            {this.state.blogData.user_info.user_name}
          </h4>
          <time className="article__timestamp"
                dateTime="2016-09-12">
            {this.state.blogData.timeStamp}
          </time>
        </header>
        <article className="article">
          <h2 className="article__contentTitle">
            {this.state.blogData.title}
          </h2>
          <div className="article__content"
               dangerouslySetInnerHTML={{__html: `${this.state.blogData.content}`}}>
          </div>
          <div className="newArticle__footer">
            <Link to={`edit-article/${this.props.params.articleID}`}
                  className="editor__submit">
                  Edit Post
            </Link>
          </div>
        </article>
      </main>
    )
  }
})
