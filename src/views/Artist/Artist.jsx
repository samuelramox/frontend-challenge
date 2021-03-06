import React from 'react'

import { Alert } from 'plurall-ui'

import { AlbumsList, ArtistInfo, Loading, SubHeader } from 'components'
import { SomosClient } from 'utils'

import styles from './Artist.module.css'

class Artist extends React.Component {
  state = {
    albums: [],
    artist: undefined,
    error: {},
    isLoading: true,
  }

  client = new SomosClient()

  componentDidMount() {
    const artistId = this.props.match.params.id

    this.getArtist(artistId)
    this.getAlbums(artistId)
  }

  async getArtist(artistId) {
    const res = await this.client.getArtistById(artistId)
    const hasArtist = res !== undefined

    hasArtist
      ? this.setState({ artist: res, isLoading: false })
      : this.setState({
          error: res.error,
          isLoading: false,
        })
  }

  async getAlbums(artistId) {
    const res = await this.client.getArtistAlbums(artistId)
    const hasAlbum = res !== undefined

    hasAlbum
      ? this.setState({ albums: res.items, isLoading: false })
      : this.setState({
          error: res.error,
          isLoading: false,
        })
  }

  render() {
    const { albums, artist, error, isLoading } = this.state

    return (
      <>
        <SubHeader
          breadcrumb={[{ text: 'Artista' }]}
          heading="Somos Front-end Challenge"
          buttonHref="/search"
        />
        <div className={styles.wrapper}>
          {isLoading && <Loading />}

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
          {!isLoading && artist !== undefined && (
            <div className={styles.container}>
              <ArtistInfo artist={artist} />
              <AlbumsList albums={albums} />
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Artist
