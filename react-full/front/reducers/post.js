import produce from 'immer';

export const initialState = {
  retweetLoading: false,
  retweetLoaded: false,
  hasMorePosts: true,
  imagesLoding: false,
  imagesLoaded: false,
  postLoading: false,
  postLoaded: false,
  postsLoading: false,
  postsLoaded: false,
  postAdding: false,
  postAdded: false,
  postRemoving: false,
  postRemoved: false,
  postLiking: false,
  postLiked: false,
  postUnLiking: false,
  postUnLiked: false,
  commentAdding: false,
  commentAdded: false,
  actionError: null,
  reset: false,
  mainPosts: [],
  imagePaths: [],
  singlePost: null,
  test:[],
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const RESET_MAIN_POST = 'RESET_MAIN_POST';

export const loadPostRequest = (data) => ({ type: LOAD_POST_REQUEST, data });
export const addPostRequest = (data) => ({ type: ADD_POST_REQUEST, data });
export const addCommentRequest = (data) => ({ type: ADD_COMMENT_REQUEST, data });
export const removePostRequest = (data) => ({ type: REMOVE_POST_REQUEST, data });

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data );
        break;

      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetLoaded = false;
        draft.actionError = null;
        break;
      case RETWEET_SUCCESS:
        draft.retweetLoading = false;
        draft.retweetLoaded = true;
        draft.mainPosts.unshift(action.data);
        break;
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetLoaded = false;
        draft.actionError = action.error;
        break;

      case UPLOAD_IMAGES_REQUEST:
        draft.imagesLoding = true;
        draft.imagesLoadded = false;
        draft.actionError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.imagesLoding = false;
        draft.imagesLoadded = true;
        draft.imagePaths = action.data;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.imagesLoding = false;
        draft.imagesLoadded = false;
        draft.actionError = action.error;
        break;

      case LOAD_POST_REQUEST:
        draft.postLoading = true;
        draft.postLoadded = false;
        draft.actionError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.postLoading = false;
        draft.postLoadded = true;
        draft.singlePost = action.data; 
        break;
      case LOAD_POST_FAILURE:
        draft.postLoading = false;
        draft.postLoadded = false;
        draft.actionError = action.error;
        break;

      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.postsLoading = true;
        draft.postsLoadded = false;
        draft.actionError = null;
        break;

      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.postsLoading = false;
        draft.postsLoadded = true;
        draft.mainPosts = draft.mainPosts.concat(action.data); // 무한스크롤링을 구현
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE:
        draft.postsLoading = false;
        draft.postsLoadded = false;
        draft.actionError = action.error;
        break;

      case ADD_POST_REQUEST:
        draft.postAdding = true;
        draft.postAdded = false;
        draft.actionError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.postAdding = false;
        draft.postAdded = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.postAdding = false;
        draft.postAdded = false;
        draft.actionError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.postRemoving = true;
        draft.postRemoved = false;
        draft.actionError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.postRemoving = false;
        draft.postRemoved = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId)
        break;
      case REMOVE_POST_FAILURE:
        draft.postRemoving = false;
        draft.postRemoved = false;
        draft.actionError = action.arror;
        break;

      case LIKE_POST_REQUEST:
        draft.postLiking = true;
        draft.postLiked = false;
        draft.actionError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === parseInt(action.data.postId, 10))
        post.Likers.push({ id: action.data.UserId })
        // draft.test.push(false) reducer돌때에 자료형확인은 이런식으로 확인하자
        // draft.test.push(post)
        draft.postLiking = false;
        draft.postLiked = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.postLiking = false;
        draft.postLiked = false;
        draft.actionError = action.arror;
        break;

      case UNLIKE_POST_REQUEST:
        draft.postUnLiking = true;
        draft.postUnLiked = false;
        draft.actionError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === parseInt(action.data.postId, 10))
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId)
        draft.postUnLiking = false;
        draft.postUnLiked = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.postUnLiking = false;
        draft.postUnLiked = false;
        draft.actionError = action.arror;
        break;

      case ADD_COMMENT_REQUEST:
        draft.commentAdding = true;
        draft.commentAdded = false;
        draft.actionError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.commentAdding = false;
        draft.commentAdded = true;
        break;        
      }
      case ADD_COMMENT_FAILURE:
        draft.commentAdding = false;
        draft.commentAdded = false;
        draft.actionError = action.error;
        break;
      case RESET_MAIN_POST:
        draft.reset = true;
        draft.mainPosts = []
        break;
      default:
        break;
    }
  });
};

export default reducer;