import React, { FC, useState } from 'react'
import data from '../questions/data.json'
import { newReplyTypes, reply, Comment } from '../../types/types'
import { toast } from 'react-toastify';

const NewReply: FC<newReplyTypes> = ({ question, setQuestions, questions, setIndex, receiver }) => {

    const [reply, setReply] = useState<string>("")


    const sendNewReply = (id: number) => {
        if (reply.length > 230) {
            toast.error('The reply should have less than 230 characters', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (reply.length < 1) {
            toast.error('The reply should have at least 1 character', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const now = new Date()
            const newReply: reply = {
                content: reply,
                createdAt: now,
                likes: [],
                dislikes: [],
                id: Date.now(),
                replyingTo: receiver,
                score: 0,
                user: {
                    image: {
                        png: data.currentUser.image.png,
                        webp: data.currentUser.image.webp
                    },
                    username: data.currentUser.username
                }

            }

            const newQuestions: Comment[] = questions.map(question => {

                if (question.id === id) {
                    if (question.replies === undefined) {
                        const newQuestion = {
                            ...question,
                            replies: [newReply]
                        }
                        return newQuestion
                    } else {
                        const newQuestion = {
                            ...question,
                            replies: [...question.replies, newReply]
                        }
                        return newQuestion
                    }
                } else {
                    return question
                }

            })
            setQuestions(newQuestions)
            setReply("")
            setIndex(0)
        }
    }

    return (
        <div className='customShadow sm:ml-6 sm:w-[280px] md:flex bg-white md:w-[600px] md:ml-[53px] mt-3 md:mb-10 md:p-5 rounded-md '>
            <div className='sm:hidden md:flex'>
                <img className='h-[40px] mr-2' src={data.currentUser.image.png} alt="" />
                <textarea autoFocus onChange={(e) => { setReply(e.target.value) }} className='pl-2 resize-none max-w-[392px]' placeholder='Add a comment...' name="" id="" cols={60} rows={3}></textarea>
                <button onClick={() => { sendNewReply(question.id) }} className='bg-ModerateBlue min-w-[100px] w-[100px] h-[50px] ml-5 text-White rounded-lg hover:bg-LightGrayishBlue'>SEND</button>
            </div>
            <div className='sm:flex sm:flex-col md:hidden sm:h-[190px] '>
                <textarea autoFocus onChange={(e) => { setReply(e.target.value) }} className='pl-2 sm:h-[130px] resize-none max-w-[392px]' placeholder='Add a comment...' name="" id="" cols={60} rows={3}></textarea>
                <div className='sm:flex sm:w-full sm:justify-between sm:items-center sm:p-3'>
                    <img className='h-[40px] mr-2' src={data.currentUser.image.png} alt="" />
                    <button onClick={() => { sendNewReply(question.id) }} className='bg-ModerateBlue min-w-[100px] w-[100px] h-[50px] ml-5 text-White rounded-lg hover:bg-LightGrayishBlue'>SEND</button>
                </div>
            </div>
        </div>
    )
}

export default NewReply