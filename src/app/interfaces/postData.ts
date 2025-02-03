export interface PostData {
    _id: string,
    title: string,
    body: string,
    image?:string,
    user: User,
    createdAt: string,
    comments: Comment[],
}

export interface User {
    _id:string,
    name:string,
    photo:string,
}

export interface Comment {
    _id:string,
    content:string,
    commentCreator: User,
    createdAt:string,
    post: string,
}

