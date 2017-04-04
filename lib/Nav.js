import React from 'react'
import main from './main'
import { Link } from 'react-router'
import $ from 'jquery'
import GoogleLogin from 'react-google-login'
let responseGoogle

export default React.createClass({
  getInitialState() {
    return {
      currentUserID: "",
      loggedIn: false
    }
  },
  responseGoogleHandler(){
    responseGoogle = (response)=>{
    $.ajax({
       type: "GET",
       url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.tokenId}`,
       contentType: "application/json",
       success: (response) => {
         var stringifiedGoogleResponse = JSON.stringify(response)
         $.ajax({
           type: "POST",
           url: "https://tiny-tiny.herokuapp.com/collections/sa_tech_userdata_test4",
           data: stringifiedGoogleResponse,
           contentType: "application/json",
           success: (response) => {
             this.setState({
               currentUserID: response._id,
               loggedIn: true
             })
           }
         })
         $(this.refs.signOut).show()
         $(this.refs.createArticle).show()
       },
     })
   }
  },
  componentWillMount() {
    this.responseGoogleHandler();
  },
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
    })
    this.setState({
      loggedIn: false
    })
    $(this.refs.signOut).hide()
    $(this.refs.signIn).show()
    $(this.refs.createArticle).hide()
  },
  render() {
    return (
      <div>
        <div className="nav__wrapper">
          <nav className="nav">
            <div className="nav__logo">
              <a href="#/" className="nav__logoLink">
                <img src="../assets/images/sa-tech-voices.jpg"
                     alt="SATV logo"
                     className="nav__linkLogo"/>
             </a>
            </div>
            <div className="nav__links">
              <a href="./Aboutme"
                 className="nav__linkAboutUs nav__link">
                About Me
              </a>
            </div>
          </nav>
        </div>
        { this.props.children }
        <footer className="footer">
          <section className="footer__aboutUs"
                   id="aboutUs">
            <h4 className="footer__heading">
              About us
            </h4>
            <p className="footer__aboutText">
              "Like what you see? Lets meet for a cup of coffee! Shoot me an email at Lauren [ @ ]ljohnsoncoding.com"
            </p>
          </section>
        </footer>
      </div>
    )
  }
})
