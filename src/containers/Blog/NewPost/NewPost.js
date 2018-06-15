import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false,
    }

    componentDidMount () {
      // To guard this page
      // If unauth => this.props.history,.replace('/posts');
      // Currently using the ternary condition in Blog.js
    }

    postDataHandler = () => {
        const data = {
          title: this.state.title,
          body: this.state.content,
          author: this.state.author,
        };

        // See index.js for setting default base URLs
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
          .then(response => {
            console.log("NewPost.js", response);
            // Push adds this route to the history, allowing the user to go back
            // Redirect (below) does not keep the exact history, it'll take you to another page
            this.props.history.push('/posts');
            // this.setState({ submitted: true });
          });
    }

    render () {
      let redirect = null;
      if (this.state.submitted) {
        redirect = <Redirect to='/posts' />;
      }
      return (
        <div className="NewPost">
          {redirect}
          <h1>Add a Post</h1>
          <label>Title</label>
          <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
          <label>Content</label>
          <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
          <label>Author</label>
          <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
            <option value="Max">Max</option>
            <option value="Manu">Manu</option>
          </select>
          <button onClick={this.postDataHandler}>Add Post</button>
        </div>
      );
    }
}

export default NewPost;
