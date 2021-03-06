import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookContainer extends React.Component {
  constructor(props){
    super(props)
    this.responseFacebook = this.responseFacebook.bind(this)
  }
    
    responseFacebook(response) {
        console.log(response);
      }
   
    render() {
        return (
          <FacebookLogin
            appId=""
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends,user_actions.books"
            callback={this.responseFacebook}
          />)
    }
}

export default FacebookContainer;