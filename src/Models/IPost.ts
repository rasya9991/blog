export type IPost = {
    "slug": "string",
    "title": "string",
    "description": "string",
    "body": "string",
    "tagList": string[],
    "createdAt": "2023-04-07T20:57:02.241Z",
    "updatedAt": "2023-04-07T20:57:02.241Z",
    "favorited": boolean,
    "favoritesCount": number,
    "author": {
        "username": "string",
        "bio": "string",
        "image": "string",
        "following": boolean
    }
}