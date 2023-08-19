import React, { useEffect, useState } from 'react'
import Placeholder from '../Placeholder/Placeholder'

const Users = ({ users, setUsers, setModal, setCurrentUser, setAlert }) => {

  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET'
    })

    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  const openModal = () => {
    setModal(true)
    document.body.style.overflow = 'hidden'
  }

  const handleEditUser = user => {
    setCurrentUser(user)
    openModal()
  }

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
      });
      setUsers(users.filter(user => user.id !== id))
      setAlert({
        show: true,
        msg: 'User deleted successfully.',
        success: true
      })
    }
    catch (error) {
      setAlert({
        show: true,
        msg: 'An error occurred while deleting.',
        success: false
      })
    }
  }

  if (loading) {
    return (
      <main className='margin-x my-4'>
        <Placeholder />
      </main>
    )
  }

  return (
    <main className='margin-x'>
      <div className='d-flex justify-content-between my-4 align-items-end'>
        <h4 className='mb-0'>{`Total Users: ${users.length}`}</h4>
        <button className='btn btn-primary' onClick={openModal}>Add new user</button>
      </div>
      {users.map((user, i) => {
        return (
          <div key={i} className='mb-5' style={{ boxShadow: '#f0f0f0 0px 0px 10px 10px', borderRadius: 15 }}>
            <div className='d-flex p-4 padding-mobile' style={{ backgroundColor: i % 2 === 0 ? '#d7edff' : 'rgb(255 215 215)', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
              <div className='flex-grow-1'>
                <h4>{user.name}</h4>
                <div className='d-flex align-items-center text-secondary'>Username :&nbsp;<h6 className='mb-0 text-dark'>{user.username}</h6></div>
                <div className='d-flex align-items-center text-secondary'>Company :&nbsp;<h6 className='mb-0 text-dark'>{user.company.name}</h6></div>
              </div>

              <div className='d-flex align-items-start' style={{ gap: 20 }}>
                <button type='button' className='rounded-circle' style={{ width: 30, height: 30 }}><i className="fa-solid fa-pen text-primary" onClick={() => handleEditUser(user)} /></button>
                <button type='button' className='rounded-circle' style={{ width: 30, height: 30 }}><i className="fa-solid fa-trash text-danger" onClick={() => handleDeleteUser(user.id)} /></button>
              </div>
            </div>

            <div className='p-4 padding-mobile'>
              <h6 className='mb-1'>Contact details</h6>
              <div>
                <div className='d-flex align-items-center text-secondary' style={{ whiteSpace: 'nowrap' }}>Email :&nbsp;<h6 className='mb-0 text-dark'>{user.email}</h6></div>
                <div className='d-flex align-items-center text-secondary' style={{ whiteSpace: 'nowrap' }}>Phone :&nbsp;<h6 className='mb-0 text-dark'>{user.phone}</h6></div>
                <div className='d-flex align-items-center text-secondary' style={{ whiteSpace: 'nowrap' }}>Address :&nbsp;<h6 className='mb-0 text-dark' style={{ whiteSpace: 'initial' }}>{user.address.suite + ', ' + user.address.street + ', ' + user.address.city + ', ' + user.address.zipcode}</h6></div>
                <div className='d-flex align-items-center text-secondary' style={{ whiteSpace: 'nowrap' }}>Website :&nbsp;<h6 className='mb-0 text-dark'><a href={user.website} target='_blank' rel='noreferrer'>{user.website}</a></h6></div>
              </div>
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default Users