import React, { Component } from 'react'

export default class extends Component {
  componentDidMount() {
    window.bodymovin.loadAnimation({
      container: document.getElementById('done'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/switch.json',
    });
  }

  render() {
    return (
      <div>
        <h2>
          <span>Login Screen</span> <div id="done" style={{height: 50 + 'px', width: 50 + 'px', display: 'inline-block'}}></div>
          <button onClick={this.props.onLogin} />
        </h2>
      </div>
    );
  }
}