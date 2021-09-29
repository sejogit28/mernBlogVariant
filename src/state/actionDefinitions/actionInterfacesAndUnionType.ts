import { ActionTypes } from './actionTypeEnum';

interface IFetchAllAction 
{
   
    type: ActionTypes.FetchAllBlogPosts,
    payload: any
}

interface IFetchSingleAction 
{
   
    type: ActionTypes.FetchSingleBlogPosts,
    payload: any
}
interface ICreateBlogPost
{
   
    type: ActionTypes.CreateBlogPost,
    payload: any
}

interface IUpdateBlogPost 
{
   
    type: ActionTypes.UpdateBlogPost,
    payload: any
}

interface IDeleteBlogPost 
{
   
    type: ActionTypes.DeleteBlogPost,
    payload: any
}

export type Action = IFetchAllAction | IFetchSingleAction | ICreateBlogPost | IUpdateBlogPost | IDeleteBlogPost 
