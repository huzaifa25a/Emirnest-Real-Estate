import axios from 'axios'
import React, {useState} from 'react'
import '../index.css'

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [showMessage, setShowMessage] = useState("");

  const handleInput = (e) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try{
      const sendMessage = await axios.post('http://localhost:3000/api/contact/contactUs', {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      })
      setShowMessage("Message Sent! You will get a reply Shortly.");
      setTimeout(() => {
        setShowMessage("");
      }, 5000);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
    catch(error){
      console.error("Error sending message --->", error);
      setShowMessage("Message could not be sent! Please try contacting through our email.");
      setTimeout(() => {
        setShowMessage("");
      }, 5000);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <h1 className='font-bold text-[24px] mb-10'>Contact Us</h1>
      <div className='flex flex-row justify-center items-start w-full gap-32'>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-6 justify-center items-center'>
          <div className='flex flex-row gap-3'>
            <input
              className='border-[1px] border-gray-400 w-[350px] p-2 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg'
              placeholder='Enter Name'
              type='text'
              name='name'
              value={form.name}
              onChange={handleInput}
              required
            />
          </div>
          <div className='flex flex-row gap-3'>
            <input
              className='border-[1px] border-gray-400 w-[350px] p-2 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg'
              placeholder='Enter Email'
              type='text'
              name='email'
              value={form.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className='flex flex-row gap-3'>
            <input
              className='border-[1px] border-gray-400 w-[350px] p-2 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg'
              placeholder='Enter Subject'
              type='text'
              name='subject'
              value={form.subject}
              onChange={handleInput}
              required
            />
          </div>
          <div className='flex flex-row gap-3'>
            <textarea
              className='border-[1px] border-gray-400 w-[350px] p-2 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg'
              placeholder='Enter Message'
              name='message'
              value={form.message}
              onChange={handleInput}
              rows={6}
              required
            />
          </div>
          <button type='submit' className='rounded-lg bg-[#096da7] shadow-md text-white p-3 w-[150px] hover:bg-[#204d67]  transition-all duration-100'>Send Message</button>
        </form>
        {showMessage === 'Message Sent! You will get a reply Shortly.' ? 
          <div>
            <span className='bg-[#affec6] p-2 rounded-lg h-2 animate-slideMessage'>{showMessage}</span>
          </div>
          :
          showMessage === 'Message could not be sent! Please try contacting through our email.' ?
          <div>
            <span className='bg-[#feafaf] p-2 rounded-lg h-2 animate-slideMessage'>{showMessage}</span>
          </div>
          :
          null
        }
        <div className='flex flex-col gap-2 mb-6'>
          <span><span className='font-bold'>Office address:</span> F2 bulding, Al-Shuwaiheen, Sharjah, UAE</span>
          <span><span className='font-bold'>Phone:</span> +971 50 123 4567</span>
          <span><span className='font-bold'>Email: </span><a href='mailto:help@emirnest.com'>help@emirnest.com</a></span>
        </div>
      </div>
    </div>
  )
}

export default Contact