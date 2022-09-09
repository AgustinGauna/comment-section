import React, { FC, useEffect, useState } from 'react'
import { DeleteCommentsTypes } from '../../types/types'
import { toast } from 'react-toastify';


const DeleteAndEditComments: FC<DeleteCommentsTypes> = ({ question, setQuestions, questions, setOverflow, overflow, setDisplayEdit, setEditContent, editContent, save, setSave }) => {
    const deleteIcon = <svg className='fill-current' width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" /></svg>
    const editIcon = <svg className='fill-current' width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" /></svg>
    const [display, setDisplay] = useState<boolean>(false)


    const handleDeleteComment = () => {
        if (overflow === "") {
            setDisplay(true)
            setOverflow('fixed')
        } else {
            setDisplay(false)
            setOverflow("")
        }
    }

    const deleteComment = (id: number) => {
        const newQuestions = questions.filter(question => question.id !== id)
        setQuestions(newQuestions)
        setOverflow("")
        setDisplay(false)
    }


    const handleEditComment = () => {
        setSave(question.id)
        setDisplayEdit(question.id)
        setEditContent(question.content)
    }

    const editComment = (id: number) => {
        if (editContent.length > 230) {
            toast.error('The reply should have less than 230 characters', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (editContent.length < 1) {
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

            const newQuestions = questions.map(question => {
                if (question.id === id) {
                    const newQuestion = {
                        ...question,
                        content: editContent
                    }
                    return newQuestion
                } else {
                    return question
                }
            })
            setQuestions(newQuestions)
            setDisplayEdit(0)
            setSave(0)
        }
    }

    return (
        <div className='md:flex mr-2 pb-3 '>
            {display ?
                <div className="flex  items-center justify-center h-full w-full bg-TransparentGray fixed top-0 left-0">
                    <div className='bg-white sm:w-[300px] sm:h-[250px] md:w-[380px] md:h-[240px] flex flex-col justify-around  p-5 rounded-xl absolute top-40' >
                        <h2 className=' text-xl text-DarkBlue font-bold'>Delete Comment</h2>
                        <p className='text-GrayishBlue'>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
                        <div className='w-[full] flex justify-evenly'>
                            <button onClick={() => { handleDeleteComment() }} className='sm:w-[120px] md:w-[150px] text-white bg-GrayishBlue rounded-lg'>NO, CANCEL</button>
                            <button onClick={() => { deleteComment(question.id) }} className='sm:w-[120px] md:w-[150px] h-[45px] text-white rounded-lg bg-SoftRed'>YES, DELETE</button>
                        </div>
                    </div>
                </div> : <></>}
            <div className='flex sm:w-[200px] sm:h-[30px] sm:items-end sm:justify-end   md:mr-[35px] md:w-[110px] md:justify-between'>
                <div onClick={() => { handleDeleteComment() }} className='sm:mr-3 flex items-center md:mr-2  cursor-pointer text-SoftRed hover:text-LightGrayishBlue '> <div className='mr-1'>{deleteIcon}</div> Delete </div>
                {save === question.id ?
                    <div onClick={() => { editComment(question.id) }} className='flex items-center cursor-pointer text-ModerateBlue hover:text-LightGrayishBlue  '> <div className='mr-1'>{editIcon}</div> <div className='sm:min-w-[38px]'>Save</div> </div>
                    :
                    <div onClick={() => { handleEditComment() }} className='flex items-center  cursor-pointer text-ModerateBlue hover:text-LightGrayishBlue '> <div className='mr-1'>{editIcon}</div> <div className='sm:min-w-[38px]'>Edit</div> </div>
                }
            </div>
        </div>
    )
}

export default DeleteAndEditComments