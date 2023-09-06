import React, { useRef, useState } from 'react'

const Index = () => {
  const EmailInput=useRef()
  const CommentInput=useRef()
  const[empty,full]=useState("")
  const [feedbackitem,setfeedbackitem] =useState([])

  function submitFormHandler(event){
    event.preventDefault()

    const enteredEmail=EmailInput.current.value
    const enteredcomment=CommentInput.current.value

    const reqBody={email:enteredEmail,text:enteredcomment}
    fetch('/api/hello',{
      method:'POST',
      body:JSON.stringify(reqBody),
      headers:{
        'content-Type':'application/json'
      }

    })
    // .then((response)=>response.json())
    // .then((data)=>console.log(data))

    

    if(enteredEmail===""){
      alert("enter the email")
      full("enter the email")
    }
    if(enteredcomment===""){
      alert("enter the feedback")
      full("enter the feedback")
    }
  }
  function fileLoader() {
    fetch('/api/hello')
    .then((response)=>response.json())
    .then((data)=>{
      setfeedbackitem(data.feedback)
    })
    
  }
  return (
    <div className='flex justify-center items-center flex-col'>
      <div>{empty}</div>
      <form onSubmit={submitFormHandler}>
      <div className='flex gap-4 mt-10'>
      <label htmlFor="email">email adress</label>
      <input type="text" id='email' ref={EmailInput} className='text-black' />
      </div>
      <div className='flex gap-4 mt-10'>
      <label htmlFor="comment">add comment</label>
      <textarea type="text" id='comment' rows={5} ref={CommentInput} className='text-black'/>
      </div>
      <button className='mt-5 border-2'>submit</button>
      </form>
      <hr />
      <button className='border-2 -mt-7' onClick={fileLoader}>load feedback</button>
      
      <ul>
          {feedbackitem.map(item => <li>{item.id} {item.email}---{item.text}</li>)}
      </ul>
    </div>
  )
}

export default Index
