import {actionTypes} from '../api/blogPostRoutes/blogPostActions';

interface BlogPostsState
{
    blogPosts: any[]
}

interface BlogPostsAction
{
    type: string,
    payload?: any
}

const initialBlogPostsState = 
{
    blogPosts: []
}

export const blogPostReducer = (state: BlogPostsState = initialBlogPostsState , action: BlogPostsAction) =>
{
    switch(action.type)
    {
        case actionTypes.FetchAll:
            return{
                ...state,
                blogPosts: [...action.payload]
            }
            case actionTypes.FetchSingle:
            return{
                ...state,
                blogPosts: [...action.payload]
            }
            case actionTypes.CreateBlogPost:
            return{
                ...state,
                blogPosts: [...state.blogPosts, action.payload]
            }
           
            case actionTypes.UpdateBlogPost:
            return{
                ...state,
                blogPosts: state.blogPosts.map(x => x._id == action.payload._id ? action.payload : x)
            }
        
            case actionTypes.DeleteBlogPost:
            return{
                ...state,
                blogPosts: state.blogPosts.filter(x => x._id != action.payload) 
            }
             default:
             return state;
    }

}