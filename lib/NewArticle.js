import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import Nav from './Nav'
import SimpleMDE from 'simplemde'
var simplemde;

export default React.createClass({
  getInitialState() {
    return {
      blogs: {
        timeStamp: "",
        title: "",
        content: "",
        user_info: {}
      }
    }
  },
  componentWillMount() {
    $.ajax({
      type: "GET",
      url: `https://tiny-tiny.herokuapp.com/collections/sa_tech_userdata_test4/${this.props.params.userID}`,
      contentType: "application/json",
      success: (response) => {
        this.setState({
          blogs: {
            user_info: {
              user_author: response.name,
              user_imgSrc: response.picture,
              user_id: response._id
            }
          }
        })
      }
    })
  },
  onSubmitHandler(e){
    e.preventDefault();
    var titleText = this.refs.titleArea.value;

    var textAreaValue = simplemde.options.previewRender(simplemde.value());
    var submitDate = new Date();
    var submitMonth = submitDate.getMonth()+1;
    var submitDay = submitDate.getDate();
    var humanSubmitTime = submitDate.getFullYear() + "." + (submitMonth < 10 ? "0" + submitMonth:submitMonth) + "." + (submitDay < 10 ? "0" + submitDay:submitDay);
    var userInfoObject = {
      user_id: this.state.blogs.user_info.user_id,
      user_name: this.state.blogs.user_info.user_author,
      user_imgSrc: this.state.blogs.user_info.user_imgSrc
    }

    var newMessageStringified = JSON.stringify({
      timeStamp: humanSubmitTime,
      title: titleText,
      content: textAreaValue,
      user_info: userInfoObject
    });
    $.ajax({
      type: "POST",
      url: "https://tiny-tiny.herokuapp.com/collections/sa_tech_voices_test11",
      data: newMessageStringified,
      contentType: "application/json",
      success: (response) => {
        window.location.href = `/#/article/${response._id}`
      }
    })
  },
  componentDidMount(){
    simplemde =  new SimpleMDE();
  },
  render() {
    return (
      <main className="editorContainer">
        <header className="newArticle__header">
          <img src={this.state.blogs.user_info.user_imgSrc}
               alt="headshot of author"
               className="newArticle__authorpic"/>
          <h4 className="newArticle__author">
            {this.state.blogs.user_info.user_author}
          </h4>
        </header>
        <form className="editor"
              action="#"
              method="POST"
              ref="postForm"
              onSubmit={this.onSubmitHandler}>
          <input type="text"
                 className="editor__titleInput"
                 name="title"
                 ref="titleArea"
                 placeholder="Enter blog title here..." />
          <div className="mdeContainer">
            <textarea className="editor__textArea"
                      name="text"
                      placeholder="Write your thoughts..."
                      rows="8"
                      cols="40"
                      ref="markdownTextArea">
            </textarea>
          </div>
          <div className="newArticle__footer">
            <input type="submit"
                   name="Save Post"
                   value="Save Post"
                   className="editor__submit" />
          </div>
        </form>
      </main>
    )
  }
})
