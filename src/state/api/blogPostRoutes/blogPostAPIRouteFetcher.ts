const baseUrl : string = "https://localhost:5000/blogPost/";

interface IBlogPostService
{
    getBlogPosts: () => Promise<any>;
    getBlogPostPagi: (pageNum: number) => Promise<any>;
    getBlogPost: (id: number) => Promise<any>;
    addBlogPost: (formData: FormData) => Promise<any>;
    editBlogPostNoPic: (id: number, editedBlogPost: any) => Promise<any>;
    editBlogPostPic: (id: number, editedBlogPostPicFormData: FormData) => Promise<any>;
    deleteBlogPost: (id: number) => Promise<any>;
    addComment: (id: number, newComm: any) => Promise<any>;
    editComment: (id: number, commId: number, newCommBody: any) => Promise<any>;
    deleteComment: (id: number, commId: number) => Promise<any>;

}

const BlogPostService: IBlogPostService = {
        getBlogPosts :  async () =>
        {
            return fetch(`${baseUrl}blogList`)
            .then(response =>
            {
                if (response.status !== 401)
                {
                    return response.json().then(data => data);
                }
                else
                    return {message :{msgError: true, msgBody : "Something Went Wrong"}, }
            });
        }, 

        getBlogPostPagi : async (pageNum) => 
        {
            return fetch(`${baseUrl}blogPagi?page=${pageNum}`)
            .then((res) => res.json())
            
        },

        getBlogPost : async (id) =>
        {
            return fetch(`${baseUrl}${id}`)
            .then(res => 
                {
                    if(res.status !== 401)
                    {
                        return res.json().then(data => data);
                    }
                    else
                        return {message :{msgBody: "UnAuthorized "}}
                })
        },

        addBlogPost : async (formData) => 
        {
            console.log(formData);
          return fetch(`${baseUrl}blogPost/add`, 
          {
              method: "POST",
              body : formData,
              
          }).then(res => 
            {
                if(res.status !== 401)
                {
                    return res.json().then(data => data);
                }
                 else
                        return {message :{msgBody: "UnAuthorized "}, msgError : true};
                });            
        },

        editBlogPostNoPic : async (id, editedBlogPost) =>
        {
            return fetch(`${baseUrl}updateNoPic/${id}`,
            {
              method: "put",
              /*This needed to be specified as a put method, most likely cause thats 
              what it was called in the blogPostRoute. It seems "GET" is the default 
              method */
              body : JSON.stringify(editedBlogPost),
              headers: 
              {
                  'Content-Type' : 'application/json'
              }
            }).then(res => 
            {
                if(res.status !== 401)
                {
                    return res.json().then(data => data);
                }
                 else
                        return {message :{msgBody: "UnAuthorized "}, msgError : true};
                });  
        },

        editBlogPostPic : async (id, editedBlogPostPicFormData) =>
        {
            return fetch(`${baseUrl}updatePic/${id}`,
            {
              method: "PUT",
              body : editedBlogPostPicFormData,           
          }).then(res => 
            {
                if(res.status !== 401)
                {
                    return res.json().then(data => data);
                }
                 else
                        return {message :{msgBody: "UnAuthorized "}, msgError : true};
                });  
        },
        
        deleteBlogPost : async (id) =>
        {
            return fetch(`${baseUrl}delete/${id}`, 
            {
                method: "delete"
            })
            .then(res => 
                {
                    if(res.status !== 401)
                    {
                        return res.json().then(data => data);
                    }
                    else
                        return {message :{msgBody: "Deletion failed at client"}, msgError: true};
                })
        },

        addComment: async (id, newComm) => 
        {
            return fetch(`${baseUrl}update/${id}/addcomm`,
            /*It would appear tha that if you don't put the first "/" 
            (/blogPost/update as opposed to blogPost/update)react assumes 
            that you want everything to the left of the url that is in the 
            browser window "posts/blogPost" example*/
            {
              method: "put",
              body : JSON.stringify(newComm),
              headers: 
              {
                  'Content-Type' : 'application/json'
              }
          }).then(res => 
            {
                if(res.status !== 401)
                {
                    return res.json().then(data => data);
                }
                 else
                        return {message :{msgBody: "UnAuthorized "}, msgError : true};
                });  
        },

        editComment : async (id, commId, newCommBody) => 
        {
            return fetch(`${baseUrl}update/${id}/updatecomm/${commId}` ,
            {
                method: "put",
                body : JSON.stringify(newCommBody),
                headers: 
                {
                    'Content-Type' : 'application/json'
                }
            }).then(res => 
            {
                if(res.status !== 401)
                {
                    return res.json().then(data => data);
                }
                 else
                        return {message :{msgBody: "UnAuthorized "}, msgError : true};
                });  
        },

        deleteComment : async (id, commId) =>
        {
            return fetch(`${baseUrl}update/${id}/deletecomm/${commId}`,
            {
                method: "put"
            }).then(res => 
            {
                if(res.status !== 401)
                {
                    return res.json().then(data => data);
                }
                 else
                        return {message :{msgBody: "UnAuthorized "}, msgError : true};
                });  
        },
}

export default BlogPostService;