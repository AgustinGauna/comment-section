import React, { FC } from 'react'
import { CommentVotesTypes } from '../../types/types'
import data from '../questions/data.json'

const CommentsVotes: FC<CommentVotesTypes> = ({ question, setQuestions, questions, style, style2 }): JSX.Element => {

    const handleCommentUpVote = (id: number) => {

        const newQuestions = questions.map(question => {
            if (question.id === id) {
                if (question.likes.includes(data.currentUser.username)) {
                    const newQuestion = {
                        ...question,
                        score: question.score - 1,
                        likes: question.likes.filter(like => like !== data.currentUser.username)
                    }
                    return newQuestion
                } else {
                    if (question.dislikes.includes(data.currentUser.username)) {
                        const newQuestion = {
                            ...question,
                            score: question.score + 2,
                            likes: [...question.likes, data.currentUser.username],
                            dislikes: question.dislikes.filter(dislike => dislike !== data.currentUser.username)
                        }
                        return newQuestion

                    } else {
                        const newQuestion = {
                            ...question,
                            score: question.score + 1,
                            likes: [...question.likes, data.currentUser.username]
                        }
                        return newQuestion
                    }
                }
            } else {
                return question
            }
        })
        setQuestions(newQuestions)
    }

    const handleCommentDownVote = (id: number) => {
        const newQuestions = questions.map(question => {
            if (question.id === id) {
                if (question.dislikes.includes(data.currentUser.username)) {
                    const newQuestion = {
                        ...question,
                        score: question.score + 1,
                        dislikes: question.dislikes.filter(dislike => dislike !== data.currentUser.username)
                    }
                    return newQuestion
                } else {
                    if (question.likes.includes(data.currentUser.username)) {
                        const newQuestion = {
                            ...question,
                            score: question.score - 2,
                            dislikes: [...question.likes, data.currentUser.username],
                            likes: question.dislikes.filter(like => like !== data.currentUser.username)
                        }
                        return newQuestion

                    } else {
                        const newQuestion = {
                            ...question,
                            score: question.score - 1,
                            dislikes: [...question.likes, data.currentUser.username]
                        }
                        return newQuestion
                    }
                }
            } else {
                return question
            }
        })
        setQuestions(newQuestions)
    }




    return (
        <div className={` sm:${style2} md:${style}  sm:h-[40px] sm:flex sm:w-[80px] items-center sm:justify-between sm:p-2   md:ml-4  md:mr-5 md:flex md:flex-col md:justify-around rounded-md  bg-LightGray md:h-[80px] md:w-[150px]`}>
            <svg onClick={() => { handleCommentUpVote(question.id) }} className='' width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path className='cursor-pointer' d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill={question.likes.includes(data.currentUser.username) ? 'hsl(238, 40%, 52%)' : "#C5C6EF"} /></svg>
            <div className='text-[14px] w-[25px] text-center  text-ModerateBlue font-bold'>{question.score}</div>
            <svg onClick={() => { handleCommentDownVote(question.id) }} className='' width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path className='cursor-pointer' d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill={question.dislikes.includes(data.currentUser.username) ? 'hsl(238, 40%, 52%)' : "#C5C6EF"} /></svg>
        </div>
    )
}

export default CommentsVotes