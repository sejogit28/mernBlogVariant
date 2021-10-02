 import { combineReducers } from "redux";
import { blogPostReducer } from "./blogPostReducer";


const reducers = combineReducers({
    blogPostState: blogPostReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>