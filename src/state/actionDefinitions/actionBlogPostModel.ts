export type blogPostModel = 
{
    _id: string 
    title: string
    author: string
    summary: string
    body: string
    imageUrl: string
    cloudinaryId?:  string
    readTime: number
    tags?: string[]
    //enum: string[] 
    createdAt?: any
    updatedAt?: any
    comments: any[]
}