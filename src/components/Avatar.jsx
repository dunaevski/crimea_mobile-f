import React, { Component } from "react";
import { observable } from "mobx";
import { inject, observer } from 'mobx-react';
import styled from "styled-components";

@inject('UIStore')
@observer
class Avatar extends Component {
  @observable photo = "https://cl.ly/55da82beb939/download/avatar-default.jpg";

  componentDidMount() {
    fetch("https://uinames.com/api/?ext&region=russia")
      .then(response => response.json())
      .then(response => {
        this.photo = response.photo;
        this.props.UIStore.setName(response.name);
      });
  }

  render() {
    return <Image source={{ uri: this.photo }} />;
  }
}

export default Avatar;

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 20px;
`;
