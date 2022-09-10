import React, { useEffect, useState } from 'react'
import data from './data.json'
import { Comment, reply } from '../../types/types'
import NewQuestion from '../NewQuestion/NewQuestion'
import NewReply from '../NewReply/NewReply'
import moment from 'moment'
import CommentsVotes from '../CommentsVotes/CommentsVotes'
import RepliesVotes from '../RepliesVotes/RepliesVotes'
import DeleteAndEditComments from '../DeleteAndEditComments/DeleteAndEditComments'
import DeleteAndEditReplies from '../DeleteAndEditReplies/DeleteAndEditReplies'
import '../../App.css'


const Questions = () => {

    const replyIcon = <svg className='mr-1 fill-current' width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" /></svg>

    const [questions, setQuestions] = useState<Comment[]>(
        JSON.parse(localStorage.getItem("questions") || "[]")
    )
    const [index, setIndex] = useState<number>(0)
    const [overflow, setOverflow] = useState<string>("")
    const [displayEdit, setDisplayEdit] = useState<number>(0)
    const [editContent, setEditContent] = useState<string>("")
    const [save, setSave] = useState<number>(0)
    const [receiver, setReceiver] = useState<string>("")

    useEffect(() => {
        if (questions.length > 0) {

        } else {
            setQuestions(data.comments)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("questions", JSON.stringify(questions))
    }, [questions])


    const handleReply = (id: number, name: string) => {
        if (id === index) {
            setIndex(0)
        } else {
            setIndex(id)
            setReceiver(name)
        }
    }


    return (
        <div className={`sm:flex sm:flex-col sm:min-h-screen sm:w-screen sm:justify-center  sm:box-border sm:items-center bg-VeryLightGray md:min-h-screen  md:m-0 md:p-0 md:min-w-full  md:box-border md:flex  md:flex-col md:items-center ${overflow}`} >
            {questions.length > 0 ?
                questions.map(question => {
                    return (
                        <div key={question.id} className='sm:flex sm:flex-col sm:mb-4 sm:first:mt-5 sm:w-[310px] md:w-[700px] md:flex md:flex-col md:align-middle md:justify-center md:first:mt-[20px]  '>
                            {/* Container */}
                            <div className='sm:flex sm:bg-white md:pl-3 md:flex md:flex-row customShadow md:w-[700px] md:h-auto md:min-h-[150px] md:pr-3 md:justify-center md:items-center md:bg-white rounded-md md:mt-3 '>
                                {/* Vote Container */}
                                <CommentsVotes style={"flex"} style2={"hidden"} question={question} setQuestions={setQuestions} questions={questions} />

                                <div className='md:min-w-[622px] md:max-h-[105px]'>
                                    <div className='md:flex md:justify-between md:items-center md:ml-[-5px] md:max-h-[25px]'>
                                        <div className='sm:flex  sm:items-center sm:p-3md:p-0  md:flex md:h-[20px]  md:items-center md:pb-3 '>
                                            <img className='sm:w-[30px] mr-2md:max-h-[35px] md:mr-2' src={question.user.image.png} alt="" />
                                            <div className='sm:font-bold sm:mr-2 sm:text-[13px] md:font-bold  md:text-center'>{question.user.username}</div>
                                            <div className='sm:text-[13px] md:text-xs md:max-h-[14px] md:ml-2  md:text-center text-GrayishBlue '>{question.createdAt == "1 month ago" ? question.createdAt : moment(question.createdAt).fromNow()}</div>
                                        </div>

                                        {/* PC REPLY */}
                                        <div className='sm:hidden md:flex'>
                                            {
                                                data.currentUser.username === question.user.username ?
                                                    <DeleteAndEditComments save={save} setSave={setSave} setDisplayEdit={setDisplayEdit} editContent={editContent} setEditContent={setEditContent} question={question} setQuestions={setQuestions} questions={questions} setOverflow={setOverflow} overflow={overflow} />
                                                    :
                                                    <div onClick={() => { handleReply(question.id, question.user.username) }} className='md:flex md:z-auto md:items-center md:mr-7 md:pb-3 md:text-ModerateBlue md:hover:text-LightGrayishBlue  md:hover:cursor-pointer md:hover:fill-LightGrayishBlue '> {replyIcon} Reply</div>
                                            }
                                        </div>
                                    </div>
                                    {displayEdit === question.id ? <textarea autoFocus onFocus={e => e.target.select()} className='sm:pl-2 sm:ml-4 sm:max-w-[280px] sm:min-h-[170px] md:pl-2   resize-none md:min-h-[72px] md:max-h-[72px] md:max-w-[472px]' value={editContent} onChange={(e) => { setEditContent(e.target.value) }} placeholder='Add a comment...' name="" id="" cols={60} rows={3}></textarea> : <p className='sm:min-h-[160px] sm:max-w-[290px] sm:text-ellipsis sm:overflow-hidden sm:max-h-[175px] md:ml-[-5px] md:max-w-[650px] sm:px-3 sm:pb-3 sm:mb-3  md:min-h-[72px] md:max-h-[72px]  text-[16px] md:px-1 md:overflow-hidden '>{question.content}</p>}
                                    {/* MOBILE REPLY */}
                                    <div className='sm:flex sm:justify-between sm:items-center sm:p-3 sm:w-full   md:hidden   '>
                                        <CommentsVotes style={"hidden"} style2={"flex"} question={question} setQuestions={setQuestions} questions={questions} />
                                        {
                                            data.currentUser.username === question.user.username ?
                                                <DeleteAndEditComments save={save} setSave={setSave} setDisplayEdit={setDisplayEdit} editContent={editContent} setEditContent={setEditContent} question={question} setQuestions={setQuestions} questions={questions} setOverflow={setOverflow} overflow={overflow} />
                                                :
                                                <div onClick={() => { handleReply(question.id, question.user.username) }} className=' sm:flex sm:items-center md:flex md:z-auto md:items-center md:mr-2 md:pb-3 text-ModerateBlue hover:text-LightGrayishBlue  md:hover:cursor-pointer md:hover:fill-LightGrayishBlue '> {replyIcon} Reply</div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='sm:border-l-2 sm:ml-[5px] sm:mt-2  md:w-[700px] md:mt-2 md:ml-[45px] md:border-l-2'>
                                {question.replies?.map((reply: reply) =>

                                    <div key={reply.id} className=' sm:mt-3  sm:h-[250px] sm:min-h-[310px] sm:ml-5 sm:p-3 customShadow bg-White md:w-[600px] md:ml-[52px] md:mb-3 md:flex md:h-auto md:min-h-[150px]  md:items-center md:pr-3 rounded-md' >
                                        <RepliesVotes style={"flex"} style2={"hidden"} reply={reply} setQuestions={setQuestions} questions={questions} />
                                        <div className=' sm:flex sm:flex-col md:max-h-[105px]'>
                                            <div className='md:flex md:justify-between md:items-center'>
                                                <div className='sm:flex sm:items-center sm:pb-2 md:mt-[-15px] md:flex md:h-[20px] md:items-center md:pb-3 md:w-[360px] '>
                                                    <img className='sm:h-[30px] sm:mr-2 md:max-h-[25px] md:mr-2' src={reply.user.image.png} alt="" />
                                                    <div className=' sm:text-[13px] sm:font-bold md:font-bold  md:text-center'>{reply.user.username}</div>
                                                    <div className='sm:text-[13px] sm:ml-2 md:text-xs md:max-h-[14px] md:ml-2  md:text-center text-GrayishBlue'>{reply.createdAt == "1 month ago" ? reply.createdAt : moment(reply.createdAt).fromNow()}</div>
                                                </div>
                                                {/* PC REPLY */}
                                                <div className='sm:hidden md:flex md:mt-[-10px] md:mb-4 ' >
                                                    {data.currentUser.username === reply.user.username ?
                                                        <DeleteAndEditReplies setEditContent={setEditContent} editContent={editContent} setSave={setSave} save={save} setDisplayEdit={setDisplayEdit} reply={reply} setQuestions={setQuestions} questions={questions} setOverflow={setOverflow} overflow={overflow} />
                                                        :
                                                        <div onClick={() => { handleReply(question.id, reply.user.username) }} className='md:flex md:z-auto md:items-center md:mr-2 md:pb-3 text-ModerateBlue md:hover:text-LightGrayishBlue  md:hover:cursor-pointer md:hover:fill-LightGrayishBlue '> {replyIcon} Reply</div>
                                                    }
                                                </div>
                                            </div>
                                            {displayEdit === reply.id ? <textarea autoFocus onFocus={e => e.target.select()} className='md:pl-2 sm:min-h-[190px] md:mt-[-15px] md:resize-none md:min-h-[85px] md:max-h-[85px] md:overflow-scroll md:max-w-[510px]' value={editContent} onChange={(e) => { setEditContent(e.target.value) }} placeholder='Add a comment...' name="" id="" cols={60} rows={3}> </textarea> : <p className=' sm:min-h-[190px] sm:max-h-[190px] md:h-[72px] md:text-[16px] md:max-h-[120px] overflow-hidden md:mt-[-23px]'> <span className='text-ModerateBlue md:cursor-pointer'>@{reply.replyingTo}</span> {reply.content}</p>}
                                            {/* Mobile Reply */}
                                            <div className='sm:flex sm:w-full sm:justify-between sm:items-center md:hidden sm:mt-3' >
                                                <RepliesVotes style={"hidden"} style2={"flex"} reply={reply} setQuestions={setQuestions} questions={questions} />
                                                {data.currentUser.username === reply.user.username ?
                                                    <DeleteAndEditReplies setEditContent={setEditContent} editContent={editContent} setSave={setSave} save={save} setDisplayEdit={setDisplayEdit} reply={reply} setQuestions={setQuestions} questions={questions} setOverflow={setOverflow} overflow={overflow} />
                                                    :
                                                    <div onClick={() => { handleReply(question.id, reply.user.username) }} className='flex md:z-auto items-center mr-2 md:pb-3 text-ModerateBlue md:hover:text-LightGrayishBlue  md:hover:cursor-pointer md:hover:fill-LightGrayishBlue '> {replyIcon} Reply</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                )}
                                {index === question.id ? <NewReply receiver={receiver} question={question} questions={questions} setQuestions={setQuestions} setIndex={setIndex} /> : <></>}

                            </div>
                        </div>
                    )
                })
                :
                <></>
            }
            <NewQuestion setQuestions={setQuestions} questions={questions} />
        </div>
    )
}

export default Questions