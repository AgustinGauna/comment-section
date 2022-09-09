import React, { FC } from 'react'
import { RepliesVotesTypes, reply, Comment } from '../../types/types'
import data from '../questions/data.json'

const RepliesVotes: FC<RepliesVotesTypes> = ({ reply, setQuestions, questions, style, style2 }): JSX.Element => {


    const handleReplyUpVote = (id: number) => {

        const newReplies: Comment[] = questions.map(question => {

            const newFullReply = {
                ...question,
                replies: question.replies?.map(reply => {
                    if (reply.id === id) {
                        if (reply.likes.includes(data.currentUser.username)) {
                            const newReply: reply = {
                                ...reply,
                                score: reply.score - 1,
                                likes: reply.likes.filter(like => like !== data.currentUser.username)
                            }
                            return newReply
                        } else {
                            if (reply.dislikes.includes(data.currentUser.username)) {
                                const newReply: reply = {
                                    ...reply,
                                    score: reply.score + 2,
                                    dislikes: reply.dislikes.filter(dislike => dislike !== data.currentUser.username),
                                    likes: [...reply.likes, data.currentUser.username]
                                }
                                return newReply
                            } else {
                                const newReply: reply = {
                                    ...reply,
                                    score: reply.score + 1,
                                    likes: [...reply.likes, data.currentUser.username]
                                }
                                return newReply
                            }
                        }
                    } else {
                        return reply
                    }
                })
            }
            return newFullReply




        })
        setQuestions(newReplies)
    }
    const handleReplyDownVote = (id: number) => {

        const newReplies: Comment[] = questions.map(question => {

            const newFullReply = {
                ...question,
                replies: question.replies?.map(reply => {
                    if (reply.id === id) {
                        if (reply.dislikes.includes(data.currentUser.username)) {
                            const newReply: reply = {
                                ...reply,
                                score: reply.score + 1,
                                dislikes: reply.dislikes.filter(dislike => dislike !== data.currentUser.username)
                            }
                            return newReply
                        } else {
                            if (reply.likes.includes(data.currentUser.username)) {
                                const newReply: reply = {
                                    ...reply,
                                    score: reply.score - 2,
                                    likes: reply.likes.filter(like => like !== data.currentUser.username),
                                    dislikes: [...reply.dislikes, data.currentUser.username]
                                }
                                return newReply
                            } else {
                                const newReply: reply = {
                                    ...reply,
                                    score: reply.score - 1,
                                    dislikes: [...reply.dislikes, data.currentUser.username]
                                }
                                return newReply
                            }
                        }
                    } else {
                        return reply
                    }
                })
            }
            return newFullReply
        })
        setQuestions(newReplies)
    }


    return (
        <div className={` sm:${style2} md:${style} sm:h-[40px] sm:flex sm:w-[80px] sm:justify-between sm:p-2  sm:items-center md:ml-1 md:relative md:mr-3 md:flex md:flex-col md:justify-around rounded-md md:items-center  bg-LightGray md:h-[80px] md:w-[40px]`}>
            <svg onClick={() => { handleReplyUpVote(reply.id) }} className='md:mt-1 md:cursor-pointer md:mb-1' width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill={reply.likes.includes(data.currentUser.username) ? 'hsl(238, 40%, 52%)' : "#C5C6EF"} /></svg>
            <div className='text-[15px] md:w-[30px] md:text-center text-ModerateBlue font-bold'>{reply.score}</div>
            <svg onClick={() => { handleReplyDownVote(reply.id) }} className='sm:pl-1 md:cursor-pointer md:mr-1 md:mt-1 md:mb-1 ' width="16" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill={reply.dislikes.includes(data.currentUser.username) ? 'hsl(238, 40%, 52%)' : "#C5C6EF"} /></svg>
        </div>
    )
}

export default RepliesVotes