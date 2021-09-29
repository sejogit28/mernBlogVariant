 import { combineReducers } from "redux";
import { blogPostReducer } from "./blogPostReducer";


const reducers = combineReducers({
    blogPost: blogPostReducer
});

export default reducers;