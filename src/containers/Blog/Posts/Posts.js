import React, { Component } from 'react';
import axios from 'axios';
// import axios from '../../axios';  This imports the axios instance
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount () {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        })
        this.setState({ posts: updatedPosts });
        // was this:
        // this.setState({ posts: response.data });
      })
      .catch(error => {
          console.log(error);
          // this.setState({error: true});
      });
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
    // const posts = this.state.posts.map(post => {
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
      return (
        <Link to={'/' + post.id}>
          <Post
              key={post.id}
              title={post.title}
              author={post.author}
              // {...this.props} this passes along all the props
              clicked={() => this.postSelectedHandler(post.id)} />;
          </Link>
        );
        });
      }
    return (
      <section className="Posts">
          { posts }
      </section>
    )
  }
}

export default Posts;
