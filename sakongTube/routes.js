
//GLOBAL
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";
const EDIT_Liker = "/:id/like";

//GitHub

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//kakao
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";

//Facebook
const FB = "/auth/facebook"
const FB_CALLBACK = "/auth.facebook/callback"

//API
const API= "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";

//BOARD
const BOARDS= "/board"
const BOARD = "/:page"
const WRITE = "/write";
const BOARD_DETAIL = "/:id/detail"
const DELETE_BOARD = "/:id/delete"
const EDIT_BOARD = "/:id/edit"

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    me: ME,
    search: SEARCH,
    users: USERS,
    userDetail: (id)=>{
        if(id){
            return `/users/${id}`
        }else{
            return USER_DETAIL
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail:(id)=>{
        if(id){
            return `/videos/${id}`
        }else{
            return VIDEO_DETAIL
        }
    },
    editVideo: (id)=>{
        if(id){
            return `/videos/${id}/edit`;
        }else{
            return EDIT_VIDEO;
        }
    },
    editLiker: (id)=>{
        if(id){
            return `/videos/${id}/like`
        }else{
            return EDIT_Liker
        }
    },
    deleteVideo: (id)=>{
        if(id){
            return `/videos/${id}/delete`
        }else{
            return DELETE_VIDEO;
        }
    },
    board: (page)=>{
        if(page){
            return `/board/${page}`
        }else{
            return BOARD; 
        }
    },
    deleteBoard: (id)=>{
        if(id){
            return `/board/${id}/delete`
        }else{
            return DELETE_BOARD;
        }
    },
    editBoard: (id)=>{
        if(id){
            return `/board/${id}/edit`
        }else{
            return EDIT_BOARD;
        }
    },
    boardDetail:(id)=>{
        if(id){
            return `/board/${id}/detail`
        }else{
            return BOARD_DETAIL
        }
    },
    boards: BOARDS,
    write: WRITE,
    delteBoard: DELETE_BOARD,
    gitHub: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    kakao: KAKAO,
    kakaoCallback: KAKAO_CALLBACK,
    facebook: FB,
    facebookCallback: FB_CALLBACK,
    api:API,
    registerview: REGISTER_VIEW,
    addComment: ADD_COMMENT
};
export default routes;
