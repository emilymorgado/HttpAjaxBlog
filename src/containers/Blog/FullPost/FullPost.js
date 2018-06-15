import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
      loadedPost: null,
    };

// Updating state in componentDidUpdate will create an infinite loop
// The component will update, which will trigger componentDidUpdate
// For this reason, we add the if (this.state.loadedPost) condition

// This changed to componentDidMount when we implemented routing
// It is now being added and removed from the DOM

// This isn't getting re-executed on post change
// So we need to implement componentDidUpdate and loadData
    componentDidMount () {
      this.loadData();
    }

    componentDidUpdate () {
      this.loadData();
    }

    loadData () {
      if (this.props.match.params.id){
        // Keep in mind, we are retrieving the id from the route
        // Which is why we do the match.params
        // We've first removed the strict equality because one id is a string, and the other a number
        // Then we converted the string into a number, by putting a + in front of it
        if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
          axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
            .then(response => {
              // console.log(response);
              this.setState({loadedPost: response.data});
            })
        }

      }
    }

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/'  + this.props.match.params.id)
          .then(response => {
            console.log(response);
          })
    }

    render () {
      let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

      if (this.props.match.params.id) {
          post = <p style={{textAlign: 'center'}}>Loading...</p>;
      }
      if (this.state.loadedPost) {
        post = (
            <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                </div>
            </div>
        );
      }
      return post;
      }
}

export default FullPost;
