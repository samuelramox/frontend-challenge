import React from 'react'

import { Alert, TextBox } from 'plurall-ui'

import { ArtistsList, Loading, SubHeader } from 'components'
import { SomosClient } from 'utils'

import styles from './Search.module.css'

class Search extends React.Component {
  state = {
    artists: [],
    error: {},
    isLoading: null,
  }

  client = new SomosClient()

  async onSearch(value) {
    if (value.length > 4) {
      this.setState({ isLoading: true })
      const res = await this.client.getArtists(value)
      const hasArtists = res && res.artists

      hasArtists
        ? this.setState({ artists: res.artists.items, isLoading: false })
        : this.setState({
            error: res.error,
            isLoading: false,
          })
    }
  }

  render() {
    const { artists, error, isLoading } = this.state

    return (
      <>
        <SubHeader
          breadcrumb={[{ text: 'Busca' }]}
          heading="Somos Front-end Challenge"
          buttonHref="/"
        />
        <div className={styles.wrapper}>
          {!isLoading && error.message && (
            <Alert
              name={`Erro ${error.status}`}
              type="error"
              hrefText={error.status === 401 ? 'Clique aqui para renovar' : ''}
              href={error.status === 401 ? '/' : ''}
            >
              {error.message}
            </Alert>
          )}
          <TextBox
            label="Digite o nome do artista"
            placeholder="Buscar um artista"
            onChange={value => this.onSearch(value)}
          />
          {isLoading ? <Loading /> : <ArtistsList artists={artists} />}
        </div>
      </>
    )
  }
}

export default Search
