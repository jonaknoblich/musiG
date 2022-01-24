import React from 'react';
class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: props.track,
            
        }
        console.log('Track', this.state.track)
    }

    componentDidMount(){
        console.log('In ComponentDidMount')
        
    }

    leiser(){
        console.log("leiser");
    }

    lauter(){
        console.log("lauter");
        
    }

    render() {
       return (
        <div className="container">
        <div className="main-wrapper">

        <img src={this.state.track.album.images[0].url} 
             className="now-playing__cover" alt="" />

        <div className="now-playing__side">
            <div className="now-playing__name">{
                          this.state.track.name
                            }</div>

            <div className="now-playing__artist">{
                          this.state.track.artists[0].name
                          }</div>

            </div>
        </div>
    </div>
          
        );
      }
    
}
export default TestComponent;