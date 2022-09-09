
export interface reply {
    content: string,
    createdAt: string | number | Date,
    likes: string[],
    dislikes: string[],
    id: number,
    replyingTo: string,
    score: number,
    user: {
        image: {
            png: string,
            webp: string
        },
        username: string
    }

}

export interface Comment {
    id: number,
    likes: string[],
    dislikes: string[],
    content: string,
    createdAt: string | number | Date,
    replies?: reply[],
    score: number,
    user: {
        image: {
            png: string,
            webp: string
        },
        username: string
    }
}

export interface NewQuestionTypes {
    questions: Comment[],
    setQuestions: React.Dispatch<React.SetStateAction<Comment[]>>
}

export interface CommentVotesTypes {
    question: Comment,
    questions: Comment[],
    setQuestions: React.Dispatch<React.SetStateAction<Comment[]>>,
    style: string,
    style2: string
}
export interface RepliesVotesTypes {

    reply: reply,
    questions: Comment[],
    setQuestions: React.Dispatch<React.SetStateAction<Comment[]>>,
    style: string,
    style2: string
}

export interface newReplyTypes {
    question: Comment,
    questions: Comment[],
    setQuestions: React.Dispatch<React.SetStateAction<Comment[]>>,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    receiver: string
}

export interface DeleteCommentsTypes {
    question: Comment,
    questions: Comment[],
    overflow: string,
    editContent: string,
    save: number,
    setQuestions: React.Dispatch<React.SetStateAction<Comment[]>>,
    setOverflow: React.Dispatch<React.SetStateAction<string>>,
    setDisplayEdit: React.Dispatch<React.SetStateAction<number>>,
    setEditContent: React.Dispatch<React.SetStateAction<string>>,
    setSave: React.Dispatch<React.SetStateAction<number>>

}
export interface DeleteRepliesTypes {
    reply: reply,
    questions: Comment[],
    overflow: string,
    save: number,
    editContent: string,
    setQuestions: React.Dispatch<React.SetStateAction<Comment[]>>,
    setOverflow: React.Dispatch<React.SetStateAction<string>>,
    setDisplayEdit: React.Dispatch<React.SetStateAction<number>>,
    setSave: React.Dispatch<React.SetStateAction<number>>,
    setEditContent: React.Dispatch<React.SetStateAction<string>>,



}