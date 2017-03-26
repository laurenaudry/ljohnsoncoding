import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'


export default React.createClass({
  getInitialState(){
    return {
      blogPosts: [],
      tokenId: ""
    }
  },
  getBlogPosts() {
    $.get("https://tiny-tiny.herokuapp.com/collections/sa_tech_voices_test11", (response) => {
      this.setState({
        blogPosts: response
      })
    })
  },
  onMouseEnterHandler(e) {
    var hiddenDetailEl = e.currentTarget.children[0].children[1]

    $(hiddenDetailEl).slideDown(400)
  },
  onMouseExitHandler(e) {
    var hiddenDetailEl = e.currentTarget.children[0].children[1]
    $(hiddenDetailEl).slideUp(100)
  },
  componentWillMount() {
    this.getBlogPosts()
    window.setInterval(() => {
      this.getBlogPosts()
    }, 15000)
  },
  render() {
    var blogsArr = this.state.blogPosts
    return (
      <div>
        <header className="main__banner">
          <div className="main__bannerOverlay"></div>
          <div className="main__bannerText">
            <h1 className="main__bannerHeader">Lauren Johnson's coding</h1>
            <p className="main__bannerSlogan"> Code and Projects </p>
          </div>
        </header>
        <main className="article__list">
          {
            blogsArr.map((blog, i) => {
              return <a href={`#/article/${blog._id}`}
                           className="article__link"
                           key={i}>
              <article className="article__previews"
                              onMouseEnter={this.onMouseEnterHandler}
                              onMouseLeave={this.onMouseExitHandler}>
                <div className="article__headshotContainer">
                  <img src={blog.user_info.user_imgSrc}
                       alt="headshot"
                       className="article__headshot"/>
                  <span className="article__headshotOverlay">
                  <ul className="headshotOverlay__details">
                    <li className="headshotOverlay__item">
                      {blog.user_info.user_name}
                    </li>
                    <li className="headshotOverlay__item">
                      {blog.timeStamp}
                    </li>
                  </ul>
                 </span>
                </div>
                <div className="article__snippet">
                  <h4 className="article__title">
                    {blog.title}
                  </h4>
                  <div dangerouslySetInnerHTML={{__html: `${blog.content}`.substring(0, 259)}}
                  className="article__blurb">
                  </div>
                  <p className="article__readMore">
                    Read More...
                  </p>
                </div>
              </article>
            </a>
            })
          }
        </main>
      </div>
    )
  }
})
