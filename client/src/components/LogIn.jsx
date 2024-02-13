import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const LogIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("https://dispencary-booking-app-f391617db2e3.herokuapp.com/login", user)
      .then((result) => {
        navigate("/home", { state: { user: result.data.data } })
      })
      .catch((err) => {
        if (err.response && err.response.status) {
          const status = err.response.status
          if (status === 401) {
            alert("Invalid credentials. Please check your Password.")
          } else if (status === 404) {
            alert("User not found. Please register to create an account.")
          } else if (status === 500) {
            alert("Internal server error. Please try again later.")
          }
        } else {
          console.error(err)
          alert("An error occurred during login.")
        }
      })
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-60' style={{ width: "30%" }}>
        <p className='text-center' style={{ fontSize: "28px", fontWeight: "bold" }}>
          Log In
        </p>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='email'>
              <strong>User Name</strong>
            </label>
            <input
              type='text'
              placeholder='Enter your registered email...'
              autoComplete='off'
              name='email'
              className='form-control rounded-0'
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Your Password...'
              autoComplete='off'
              name='password'
              className='form-control rounded-0'
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-success w-80 rounded-20 mx-auto'>
              Log In...
            </button>
            <p className='text-center mt-2 mb-2' style={{ fontSize: "12px", color: "gray" }}>
              Not a Member yet?
            </p>
          </div>
        </form>
        <div className='text-center'>
          <Link to='/register' className='btn btn-secondary w-80 rounded-20 mx-auto'>
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogIn
