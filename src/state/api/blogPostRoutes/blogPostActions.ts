import BlogPostService from './blogPostAPIRouteFetcher';

interface ActionTypes{
    FETCH_ALL: string;
    FETCH_SINGLE: string;
    CREATEBLOGPOST: string;
    UPDATEBLOGPOST: string;
    DELETEBLOGPOST: string;

}



const formateData = (data: any) => ({
    ...data,
    readTime:parseInt(data.readTime?data.readTime:0)
})

export const actionTypes: ActionTypes = 
{   
    FETCH_ALL: 'FETCH_ALL',
    FETCH_SINGLE: 'FETCH_SINGLE',
    CREATEBLOGPOST: 'CREATE',
    UPDATEBLOGPOST: 'UPDATE',
    DELETEBLOGPOST: 'DELETE',
}


export const fetchAllBlogPosts = () => (dispatch: (param: any) => void) => 
{
    BlogPostService.getBlogPosts().then(response =>
    {
        dispatch({
            type: actionTypes.FETCH_ALL,
            payload: response.data
        })
    }).catch(err => console.log(err))
}

export const fetchSingleBlogPost = (id: number) => (dispatch: (param: any) => void) => 
{
    BlogPostService.getBlogPost(id).then(response =>
    {
        dispatch({
            type: actionTypes.FETCH_SINGLE,
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
                type: actionTypes.CREATEBLOGPOST,
                payload: res.data
            })
            onSuccess()
        })
    .catch(err => console.log(err))
}