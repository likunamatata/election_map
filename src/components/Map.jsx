import React, { Component } from "react";
import { drawMap } from "../services/map";
import votes from '../data/votes.json'

class Map extends Component {
  componentDidMount() {
    drawMap(votes);
  }

  render() {
    return (
      <div>
        <div className="map-container"></div>

        <div className="counters">
          <h3 id="Democrat"></h3>
          <h3 id="Republican"></h3>
        </div>
      </div>
    );
  }
}

export default Map;
