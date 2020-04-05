import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

@inject('UIStore')
@observer
class Avatar extends Component {
  @observable photo = "https://cl.ly/55da82beb939/download/avatar-default.jpg";

  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(response => {
        this.photo =response.results[0].picture.medium;
        this.props.UIStore.setName(`${response.results[0].name.first} ${response.results[0].name.last}`);
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
