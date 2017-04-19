/**
 * Created by ezaiuud on 4/18/2017.
 */
import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import fetchSongQuery from '../queries/fetchSongs';

class SongList extends Component {
    render() {
        if (this.props.data.loading) {
            return <div><h5>Loading...</h5></div>;
        }
        return (
            <div>
            <div>
                <ul className="collection">
                {this.renderSongs()}
                </ul>
            </div>
                <div className="right-align">
                <Link to="/songs/new" className="btn-floating red">
                    <i className="material-icons">add</i>
                </Link>
                </div>
            </div>
        );
    }
    onSongDelete(id) {
        this.props.mutate({variables: {id}})
            .then(() => this.props.data.refetch());
    }
    renderSongs() {
        return this.props.data.songs.map(({title,id}) => {
            return (
              <li key={id} className="collection-item">
                  <Link to={`/songs/${id}`}>
                  {title}
                  </Link>
                  <i className="tiny material-icons"
                     onClick={() => this.onSongDelete(id)}
                  >delete</i>
              </li>
            );
        })
    }
}

const mutation = gql`
mutation DeletSong($id: ID) {
   deleteSong(id: $id) {
         id
   }
 }
`;

export default  graphql(mutation)(
    graphql(fetchSongQuery)(SongList)
);