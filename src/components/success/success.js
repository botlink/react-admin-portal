import React, { Component } from 'react'

export default class extends Component {
  componentDidMount() {
    window.bodymovin.loadAnimation({
      container: document.getElementById('done'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/green_check.json',
    });
  }

  render() {
    return (
      <div>
        <h2>
          <span>Flight was sent to Tiler</span> <div id="done" style={{height: 30 + 'px', width: 30 + 'px', display: 'inline-block'}}></div>
        </h2>
      </div>
    );
  }
}