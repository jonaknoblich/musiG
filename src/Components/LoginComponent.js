import React from 'react';
class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
       return( <div className="App">
            <header className="App-header">
                <a className="btn-spotify" href="/auth/login" >
                    Login with Spotify 
                </a>
                
            </header>
        </div>
       );}
}
export default  LoginComponent;