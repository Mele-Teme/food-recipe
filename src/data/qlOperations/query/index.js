import {gql} from 'graphql-tag'
export const bookmarkQl = gql`
  query ($uid: uuid) {
    getbookmark(args: { uid: $uid }) {
      id
      recipe_like_count
      recipe_rate_count
      time
      recipe_comment_count
      cover_image
      title
      description
    }
  }
`;

export const myRecip = gql`
  query ($uid: uuid) {
    my_recipe(args: { myid: $uid }) {
      id
      recipe_like_count
      recipe_rate_count
      time
      recipe_comment_count
      cover_image
      title
      description
    }
  }
`;

export const recipeQuery = gql`
  query ($cat: String, $filter: String, $search: String) {
    search_recipes(args: { categ: $cat, filter: $filter, search: $search }) {
      id
      title
      recipe_like_count
      recipe_rate_count
      time
      recipe_comment_count
      cover_image
      time
      description
    }
  }
`;

export const commentListQl = gql`
  query ($rid: Int) {
    get_review(args: { rid: $rid }) {
      comment
      liked
      rate
      user {
        name
      }
    }
  }
`;

export const reviewUpdateQl = gql`
  query ($rid: Int!, $uid: uuid) {
    recipes_by_pk(id: $rid) {
      recipe_rate_count
      recipe_like_count
      recipe_comment_count
      is_bookamrked(args: { uid: $uid })
      get_my_review(args: { uid: $uid }) {
        liked
        comment
        rate
      }
    }
  }
`;
export const detailRecipeQL = gql`
  query ($rid: Int!) {
    recipe_detail(args: { rid: $rid }) {
      title
      time
      recipe_owner
      cover_image
      images {
        image
      }
      ingredients {
        ingredient
      }
      description
      steps {
        step
      }
    }
  }
`;