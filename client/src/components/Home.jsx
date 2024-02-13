import React from "react"
import { useLocation } from "react-router-dom"

const Home = () => {
  const location = useLocation()
  const user = location.state && location.state.user

  const photoUrl =
    user && user.photo ? `data:${user.photo.contentType};base64,${user.photo.data}` : null

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-60' style={{ width: "30%" }}>
        <p className='text-center' style={{ fontSize: "28px", fontWeight: "bold" }}>
          Welcome to the Home Page,{" "}
          <span style={{ color: "blue" }}>{user ? user.fName : "Guest"}!</span>
        </p>
        <div className='w-40 mb-2'>
          {photoUrl && (
            <img src={photoUrl} alt='User Photo' style={{ width: "100%", height: "auto" }} />
          )}
        </div>

        <div className='w-40 mb-2'>
          <label htmlFor='fName'>
            <strong>First Name :</strong>
          </label>
          <label>
            <strong>{user.fName}</strong>
          </label>
        </div>
        <div className='w-40 mb-2'>
          <label htmlFor='fName'>
            <strong>Last Name :</strong>
          </label>
          <label>
            <strong>{user.lName}</strong>
          </label>
        </div>
        <div className='w-40 mb-2'>
          <label htmlFor='fName'>
            <strong>Mobile Number : </strong>
          </label>
          <label>
            <strong>{user.mNum}</strong>
          </label>
        </div>

        <div className='w-40 mb-2'>
          <label htmlFor='fName'>
            <strong>Email : </strong>
          </label>
          <label>
            <strong>{user.email}</strong>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Home
