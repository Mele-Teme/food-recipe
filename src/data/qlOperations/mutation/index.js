import { gql } from "graphql-tag";

export const add_recipeQl = gql`
  mutation (
    $title: String!
    $desc: String
    $cover: String
    $cat: String
    $time: String
    $images: String
    $ings: String
    $steps: String
    $uid: uuid
  ) {
    create_recipe(
      args: {
        rtitle: $title
        rdescription: $desc
        rcover_image: $cover
        rcategory: $cat
        rtime: $time
        rimage: $images
        ring: $ings
        rstep: $steps
        ruserid: $uid
      }
    ) {
      id
    }
  }
`;
export const bookmarkToggleQL = gql`
  mutation ($rid: Int, $uid: uuid) {
    add_bookmarks(args: { rid: $rid, uid: $uid }) {
      id
    }
  }
`;

export const likeToggleQl = gql`
  mutation ($rid: Int, $uid: uuid) {
    review_add_like(args: { rid: $rid, uid: $uid }) {
      liked
    }
  }
`;

export const rateRecipeQl = gql`
  mutation ($rid: Int, $uid: uuid, $rateVal: Int) {
    review_add_rate(args: { ratevalue: $rateVal, rid: $rid, uid: $uid }) {
      rate
    }
  }
`;

export const addComment = gql`
  mutation ($comment: String, $rid: Int, $uid: uuid) {
    review_add_comment(args: { commenttext: $comment, rid: $rid, uid: $uid }) {
      comment
    }
  }
`;

export const deleteRecipeQl = gql`
  mutation ($rid: Int) {
    delete_recip(args: { rid: $rid }) {
      id
    }
  }
`;
