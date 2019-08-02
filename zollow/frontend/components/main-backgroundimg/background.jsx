import React, {Component} from 'react';

class Example extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: '../../RealEstate.mp4'
        }
    }



    render () {
        return (
          <div className="video-container">
            <video id="background-video" loop autoPlay muted>
              <source src={this.state.videoURL} type="video/mp4" />
              <source src={this.state.videoURL} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) 
    }
};

export default Example;