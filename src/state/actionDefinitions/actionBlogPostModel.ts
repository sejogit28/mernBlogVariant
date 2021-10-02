export type blogPostModel = 
{
    readonly _id?: string 
    title: string
    author: string
    summary: string
    body: string
    imageUrl: string
    cloudinaryId?:  string
    readTime: string
    tags: any[]
    //enum: string[] 
    readonly createdAt?: any
    readonly updatedAt?: any
    comments?: any[]
}