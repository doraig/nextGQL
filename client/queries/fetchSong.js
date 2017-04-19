/**
 * Created by ezaiuud on 4/18/2017.
 */
import gql from 'graphql-tag';


export  default gql `
query SongQuery($id: ID!){
	song(id: $id) {
    id
    title
    lyrics {
        id
        content
        likes
    }
  }
}
`;