import React, { Component } from 'react';
import api from '../../services/api';

import logo from '../../assets/images/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/compare_list';

export default class Main extends Component {
  state = {
    repositories: [],
    repositoryInput: '',
  };

  handleRepositoryAdd = async (e) => {
    e.preventDefault();

    const { repositories, repositoryInput } = this.state;

    try {
      const { data } = await api.get(`/repos/${repositoryInput}`);

      this.setState({ repositoryInput: '', repositories: [...repositories, data] });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { repositoryInput, repositories } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleRepositoryAdd}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">OK</button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
