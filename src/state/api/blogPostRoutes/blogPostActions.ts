import BlogPostService from './blogPostAPIRouteFetcher';

interface ActionTypes{
    FetchAll: string;
    FetchSingle: string;
    CreateBlogPost: string;
    UpdateBlogPost: string;
    DeleteBlogPost: string;
    
}



const formateData = (data: any) => ({
    ...data,
    readTime:parseInt(data.readTime?data.readTime:0)
})

export const actionTypes: ActionTypes = 
{   
    FetchAll: 'FetchAll',
    FetchSingle: 'FetchSingle',
    CreateBlogPost: 'Create',
    UpdateBlogPost: 'UPDATE',
    DeleteBlogPost: 'DELETE'
    
}


export const fetchAllBlogPosts = () => (dispatch: (param: any) => void) => 
{
    BlogPostService.getBlogPosts().then(response =>
    {
        dispatch({
            type: actionTypes.FetchAll,
            payload: response.data
        })
    }).catch(err => console.log(err))
}

export const fetchSingleBlogPost = (id: number) => (dispatch: (param: any) => void) => 
{
    BlogPostService.getBlogPost(id).then(response =>
    {
        dispatch({
            type: actionTypes.FetchSingle,
            payload: response.data
        })
    }).catch(err => console.log(err))
}

export const create = (data: FormData, onSuccess:any) => (dispatch: (param: any) => void) => 
{
    data = formateData(data)
    BlogPostService.addBlogPost(data) //not passing data into the create function leads to a 415 error
        .then(res => {
            dispatch({
                type: actionTypes.CreateBlogPost,
                payload: res.data
            })
            onSuccess()
        })
    .catch(err => console.log(err))
}