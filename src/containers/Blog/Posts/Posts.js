import React, { Component } from 'react';
import axios from 'axios';
// import axios from '../../axios';  This imports the axios instance
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
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
    this.props.history.push({ pathname: '/posts/' + id});
    // this.props.history.push({ '/posts' + id});
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
      return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            // {...this.props} this passes along all the props
            clicked={() => this.postSelectedHandler(post.id)} />
        );
        });
      }
    return (
      <div>
        <section className="Posts">
            { posts }
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    )
  }
}

export default Posts;
