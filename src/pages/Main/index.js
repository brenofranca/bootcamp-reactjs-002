import React, { Component } from 'react';
import moment from 'moment';

import api from '../../services/api';

import logo from '../../assets/images/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/compare_list';

export default class Main extends Component {
  state = {
    loading: false,
    repositories: [],
    repositoryInput: '',
    repositoryError: false,
  };

  componentDidMount() {
    const repositories = JSON.parse(localStorage.getItem('@appReactJs'));
    if (repositories) {
      this.setState({ repositories });
    }
  }

  handleRepositoryAdd = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositories, repositoryInput } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const repositoryIsAdded = repositories.find(item => item.id === repository.id);

      if (repositoryIsAdded) {
        this.setState({ repositoryError: true });
        return;
      }

      const newRepositories = [...repositories, repository];

      this.setState({
        repositoryInput: '',
        repositoryError: false,
        repositories: newRepositories,
      });

      localStorage.setItem('@appReactJs', JSON.stringify(newRepositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRepositoryRemove = async ({ id }) => {
    const { repositories } = this.state;

    const repositoriesFiltered = repositories.filter(item => item.id !== id);

    this.setState({
      repositories: [...repositoriesFiltered],
    });

    localStorage.setItem('@appReactJs', JSON.stringify(repositoriesFiltered));
  };

  render() {
    const {
      loading, repositoryError, repositoryInput, repositories,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleRepositoryAdd}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          onHandleClick={repository => this.handleRepositoryRemove(repository)}
        />
      </Container>
    );
  }
}
