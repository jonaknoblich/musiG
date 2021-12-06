import React from 'react';
import LoginComponent from './LoginComponent';
import MusicPlayerComponent from './MusicPlayerComponent';
class SpotifyAuthorizationComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          token: ''
        };
    }

    async componentDidMount(){
       await this.getToken();
        console.log('Token: ', this.state.token)
    }

     async getToken() {
        const response = await fetch('/auth/token');
        const json = await response.json();
        this.setState({ token: json.access_token });
        //this.state.token = json.access_token;
        //this.render();
      }

    render() {
      let component;
      if(this.state.token === ''){
        component = <LoginComponent/>
      } else{
        component = <MusicPlayerComponent token={this.state.token} />
      }
       return (
        <>
        {component}
        </>
          
        );
      }
    
}
export default  SpotifyAuthorizationComponent;