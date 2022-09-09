import React, { FC, useEffect, useState } from 'react'
import data from '../questions/data.json'
import { Comment, NewQuestionTypes } from '../../types/types'
import { toast } from 'react-toastify';

const NewQuestion: FC<NewQuestionTypes> = ({ questions, setQuestions }): JSX.Element => {

    const [comment, setComment] = useState<string>("")





    const handleNewComment = () => {

        if (comment.length > 230) {
            toast.error('The comment should have less than 230 characters', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (comment.length < 1) {
            toast.error('The comment should have at least 1 character', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            const now = new Date()


            const newComment: Comment = {
                id: Date.now(),
                content: comment,
                createdAt: now,
                replies: [],
                likes: [],
                dislikes: [],
                score: 0,
                user: {
                    image: {
                        png: data.currentUser.image.png,
                        webp: data.currentUser.image.webp
                    },
                    username: data.currentUser.username
                }
            }

            setQuestions([...questions, newComment])
            setComment("")

        }

    }

    return (
        <div className='customShadow sm:flex sm:justify-center sm:w-[320px] md:flex bg-white md:min-w-[700px] md:w-[700px] md:my-10 md:p-5 rounded-sm'>
            <div className='sm:hidden md:flex'>
                <img className='md:h-[40px] md:mr-2' src={data.currentUser.image.png} alt="" />
                <textarea onChange={(e) => { setComment(e.target.value) }} value={comment} className='md:pl-2 md:resize-none md:max-w-[472px]' placeholder='Add a comment...' name="" id="" cols={60} rows={3}></textarea>
                <button onClick={() => { handleNewComment() }} className='bg-ModerateBlue md:min-w-[100px] md:w-[100px] md:h-[50px] md:ml-5 text-White rounded-lg hover:bg-LightGrayishBlue'>SEND</button>
            </div>
            <div className='sm:flex sm:flex-col md:hidden sm:pt-3 mb-6'>
                <textarea onChange={(e) => { setComment(e.target.value) }} value={comment} className='md:pl-2 sm:resize-none sm:max-w-[300px]' placeholder='Add a comment...' name="" id="" cols={60} rows={3}></textarea>
                <div className='sm:flex sm:w-[300px] sm:justify-between sm:mt-3'>
                    <img className='sm:h-[35px] md:mr-2' src={data.currentUser.image.png} alt="" />
                    <button onClick={() => { handleNewComment() }} className='bg-ModerateBlue sm:w-[100px] md:min-w-[100px] md:w-[100px] md:h-[50px] md:ml-5 text-White rounded-lg hover:bg-LightGrayishBlue'>SEND</button>
                </div>
            </div>

        </div>
    )
}

export default NewQuestion