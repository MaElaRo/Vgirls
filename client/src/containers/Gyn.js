import React, { Component } from "react";
import axios from "axios";
import GynListItem from "./GynListItem";

export default class Gyn extends Component {
  state = {
    gyns: []
  };

  handleClick = gynId => {
    axios
      .put("/like", { id: gynId })
      .then(response => {
        let updatedGyns = this.state.gyns.map(el => {
          if (el._id === response.data._id) return response.data;
          else return el;
        });
        this.setState({ gyns: updatedGyns });
      })
      .catch(err => console.log(err));
  };

  getData = () => {
    axios
      .get("/gyn")
      .then(response => {
        this.setState({
          gyns: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div>
        {/* on 1st render, this.state.gyns is [] */}
        {/* after that, this.state.gyns is populated by the data from the DB */}

        {this.state.gyns.map(gyn => (
          <GynListItem
            gyn={gyn}
            handleClick={this.handleClick}
            user={this.props.user}
          />
        ))}
      </div>
    );
  }
}
