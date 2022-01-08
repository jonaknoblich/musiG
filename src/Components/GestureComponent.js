import React from 'react';

class GestureComponent extends React.Component {


        componentDidMount() {
            // const script = document.createElement("script");
            // script.src = "http://js.leapmotion.com/leap-0.6.3.min.js";
            // script.async = true;
        
            // document.body.appendChild(script);
            console.log("HI");
            window.Leap.loop({enableGestures: true}, function(frame){
                
                if(frame.valid && frame.gestures.length > 0){
                  frame.gestures.forEach(function(gesture){
                      switch (gesture.type){
                        case "circle":
                            console.log("Circle Gesture");
                            break;
                        case "keyTap":
                            console.log("Key Tap Gesture");
                            break;
                        case "screenTap":
                            console.log("Screen Tap Gesture");
                            break;
                        case "swipe":
                            console.log("Swipe Gesture");
                            break;
                        default:
                            break;
                      }
                  });
                }
              });
          }

        render(){
            console.log('In render GestureComponent')
           return(
            <div className="container">
               <div className="main-wrapper">
               
                </div>
            </div>
           ); }
}

export default GestureComponent;