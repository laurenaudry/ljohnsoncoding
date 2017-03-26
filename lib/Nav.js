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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>
          <section className="footer__signInOut">
            <h4 className="footer__heading">
              Want to become a Contributor/Editor?
            </h4>
            <p>
              Log in with your Google account and start writing beautiful blogs, today!
            </p>
            <GoogleLogin
               className="footer__signIn"
               clientId="785808759484-3fu7g97ih8f9bjdvoajefs5cccp6dr15.apps.googleusercontent.com"
               buttonText="Login With Google!"
               ref="signIn"
               onClick={this.responseGoogleHandler}
               onSuccess={responseGoogle}
               onFailure={responseGoogle}/>
            <a href="#"
               ref="signOut"
               onClick={this.signOut}
               className="footer__signOut">
               Sign out
            </a>
            <a href={`#/new-article/${this.state.currentUserID}`}
                  className="footer__linkCreate"
                  ref="createArticle">
                  create
            </a>
          </section>
          <section className="footer__socialMedia">
            <a href="#"
               className="footer__socialMediaLink">
              <i className="fa fa-facebook fa-3x"
                 aria-hidden="true"></i>
            </a>
            <a href="#"
               className="footer__socialMediaLink">
              <i className="fa fa-twitter fa-3x"
                 aria-hidden="true"></i>
            </a>
            <a href="#"
               className="footer__socialMediaLink">
              <i className="fa fa-google fa-3x"
                 aria-hidden="true"></i>
            </a>
          </section>
        </footer>
      </div>
    )
  }
})
