import BlogPostService from '../api/blogPostRoutes/blogPostAPIRouteFetcher';
import { ActionTypes } from '../actionDefinitions/actionTypeEnum';
import { Action } from '../actionDefinitions/actionInterfacesAndUnionType';
import {Dispatch} from 'redux';




const formateData = (data: any) => ({
    ...data,
    readTime:parseInt(data.readTime?data.readTime:0)
})



export const fetchAllBlogPosts = () => (dispatch: Dispatch<Action>) => 
{
    BlogPostService.getBlogPosts().then(res =>
    {
        dispatch({
            type: ActionTypes.FetchAllBlogPosts,
            payload: res.data
        })
    }).catch(err => console.log(err))
}

/* export const fetchSingleBlogPost = (id: string) => (dispatch: Dispatch) => 
{
    BlogPostService.getBlogPost(id).then(response =>
    {
        dispatch({
            type: ActionTypes.FetchSingleBlogPosts,
            payload: response.data
        })
    }).catch(err => console.log(err))
} */



export const create = (data: FormData, onSuccess: any) => (dispatch: Dispatch<Action>) => 
{
    data = formateData(data)
    BlogPostService.addBlogPost(data) //not passing data into the create function leads to a 415 error
        .then(res => {
            dispatch({
                type: ActionTypes.CreateBlogPost,
                payload: res.data
            })
            onSuccess()
        })
    .catch(err => console.log(err))
}