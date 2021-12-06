import React from 'react';
class TestComponent extends React.Component {
    constructor(props) {
        super(props);
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
           <div>
               <button onClick={() => this.leiser()}>Leiser</button>
               <button onClick={() => this.lauter()}>Lauter</button>
           </div>
          
        );
      }
    
}
export default TestComponent;