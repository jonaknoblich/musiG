import React from 'react';
class MusicPlayerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.weiter = this.weiter.bind(this);
        this.gestures = this.gestures.bind(this);
        this.state = {
            token : props.token,
            player : '',
            currentPalmPosition : -1

        }
    }


    componentDidMount(){
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
        
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(this.state.token); },
            volume: 0.5
        });

        this.state.player = player;

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.connect();
        
          console.log('Player: ', player)
          
          player.addListener('player_state_changed', ( state => {
            if (!state) {
                return;
            }
            console.log("Track: ", state.track_window.current_track);
        
        }));

    };

    /** Gestures */
    window.Leap.loop({enableGestures: true}, this.gestures);
    }

    gestures(frame){ 
      
        if(frame.valid && frame.gestures.length > 0){
          frame.gestures.forEach((gesture)=>{
              switch (gesture.type){
                case "circle":
                    //this.lauter();
                    console.log("Circle Gesture");
                    break;
                case "keyTap":
                    console.log("Key Tap Gesture");
                    break;
                case "screenTap":
                    console.log("Screen Tap Gesture");
                    break;
                case "swipe":
                      //Classify swipe as either horizontal or vertical
                      var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                      //Classify as right-left or up-down
                      if (isHorizontal) {
                          if (gesture.direction[0] > 0) {
                              //swipeDirection = "right";
                              this.weiter();
                          } else {
                              //swipeDirection = "left";
                              this.zurueck();
                          }
                        }
                    console.log("Swipe Gesture");
                    break;
                default:
                    break;
              }
          });
        }

        if(frame.hands.length > 0){
            console.log("das ist eine Hand");
            frame.hands.forEach((hand)=>{
                if(hand.type === "right"){
                    if(hand.palmPosition[1] >= this.state.currentPalmPosition){
                        this.lauter();
                        console.log("LAUTER!");
                        this.setState({
                            currentPalmPosition: hand.palmPosition[1]
                          });
                        
                    }
                    else{
                        this.leiser();
                        console.log("LEISER!");
                        this.setState({
                            currentPalmPosition: hand.palmPosition[1]
                          });
                    }
                    console.log("ID: " + frame.id + "Palm Position: " + hand.palmPosition[1]);
                }
            })
        }
      }

    leiser(){
        console.log("leiser");
        let volume_percentage;
        this.state.player.getVolume().then(volume => {
            //volume_percentage = volume * 100;
            //console.log(`The volume of the player is ${volume_percentage}%`);
            if((volume-0.01) > 0){
                this.state.player.setVolume(volume-0.01).then(() => {
                    console.log('Volume' + volume);
                  });
            }
          });
        
    }

    lauter(){
        console.log("lauter");
        this.state.player.getVolume().then(volume => {
            //volume_percentage = volume * 100;
            //console.log(`The volume of the player is ${volume_percentage}%`);
            if((volume+0.01) < 1){
                this.state.player.setVolume(volume+0.01).then(() => {
                    console.log('Volume' + volume);
                  });
            }
          });
    }


    weiter(){
        this.state.player.nextTrack().then(() => {
            console.log('Skipped to next track!');
          });
    }

    zurueck() {
        this.state.player.previousTrack().then(() => {
            console.log('Skipped to next track!');
          });
    }
    

    render(){
        console.log('In render MusikPlayer')
       return(
        <div className="container">
           <div className="main-wrapper">
           
               <button onClick={() => this.leiser()}>Leiser</button>
               <button onClick={() => this.lauter()}>Lauter</button>
               <button onClick={() => this.weiter()}>Weiter</button>
               <button onClick={() => this.zurueck()}>Zurück</button>
            </div>
        </div>
       ); }
}
export default  MusicPlayerComponent;