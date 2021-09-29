import { ActionTypes } from '../actionDefinitions/actionTypeEnum';
import {Action} from '../actionDefinitions/actionInterfacesAndUnionType';
import {blogPostModel} from '../actionDefinitions/actionBlogPostModel'

/* interface BlogPostsAction 
{
    type: string,
    payload?: any
}
*/
interface BlogPostsState
{
    blogPosts: blogPostModel[]
}
const initialBlogPostsState: BlogPostsState = 
{
    blogPosts: []
}

export const blogPostReducer = (state = initialBlogPostsState , action: Action) =>
{
    switch(action.type)
    {
        case ActionTypes.FetchAllBlogPosts:
            return{
                ...state,
                blogPosts: [...action.payload]
            }
            case ActionTypes.FetchSingleBlogPosts:
            return{
                ...state,
                blogPosts: [...action.payload]
            }
            case ActionTypes.CreateBlogPost:
            return{
                ...state,
                blogPosts: [...state.blogPosts, action.payload]
            }
           
            case ActionTypes.UpdateBlogPost:
            return{
                ...state,
                blogPosts: state.blogPosts.map(x => x._id == action.payload._id ? action.payload : x)
            }
        
            case ActionTypes.DeleteBlogPost:
            return{
                ...state,
                blogPosts: state.blogPosts.filter(x => x._id != action.payload)
            }
             default:
             return state;
    }

}