import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "../index.css"

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    fName: "",
    lName: "",
    mNum: "",
    email: "",
    password: "",
    cpassword: "",
    photo: null,
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      setNewUser({ ...newUser, [e.target.name]: e.target.files[0] })
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newUser.password !== newUser.cpassword) {
      alert("Passwords do not match")
      return
    }

    const { cpassword, ...finalUser } = newUser

    axios
      .post("https://booking-sys-server-10ffb1575735.herokuapp.com/register", finalUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result)
        alert("Registration Success")
        navigate("/login")
      })

      .catch((err) => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-60'>
        <p className='text-center' style={{ fontSize: "28px", fontWeight: "bold" }}>
          Registration Form
        </p>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='d-flex flex-row flex-wrap'>
            <div className='w-40 mb-2 me-2'>
              <label htmlFor='fName'>
                <strong>First Name</strong>
              </label>
              <input
                type='text'
                placeholder='Enter Your First Name...'
                autoComplete='off'
                name='fName'
                className='form-control rounded-0'
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className='w-40 mb-2'>
              <label htmlFor='lName'>
                <strong>Last Name</strong>
              </label>
              <input
                type='text'
                placeholder='Enter Your Last Name...'
                autoComplete='off'
                name='lName'
                className='form-control rounded-0'
                onChange={handleInputChange}
                required
              ></input>
            </div>
          </div>

          <div className='mb-2'>
            <label htmlFor='mNum'>
              <strong>Mobile Number</strong>
            </label>
            <input
              type='tel'
              placeholder='Enter Your Mobile Number...'
              autoComplete='off'
              name='mNum'
              className='form-control rounded-0'
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Your Email...'
              autoComplete='off'
              name='email'
              className='form-control rounded-0'
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className='d-flex flex-row flex-wrap'>
            <div className='w-40 mb-2 me-2'>
              <label htmlFor='password'>
                <strong>Password</strong>
              </label>
              <input
                type='password'
                autoComplete='off'
                name='password'
                className='form-control rounded-0'
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className='w-40 mb-2'>
              <label htmlFor='cpassword'>
                <strong>Confirm Password</strong>
              </label>
              <input
                type='password'
                autoComplete='off'
                name='cpassword'
                className='form-control rounded-0'
                onChange={handleInputChange}
                required
              ></input>
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='photo'>
              <strong>Photo</strong>
            </label>
            <input
              type='file'
              accept='image/*'
              autoComplete='off'
              name='photo'
              className='form-control rounded-0'
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-success w-80 rounded-20 mx-auto'>
              Register Now...
            </button>
            <p className='text-center mt-2 mb-2' style={{ fontSize: "12px", color: "gray" }}>
              Already a member?
            </p>
          </div>
        </form>
        <div className='text-center'>
          <Link to='/login' className='btn btn-secondary w-80 rounded-20 mx-auto'>
            Log in...
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
