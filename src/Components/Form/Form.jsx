import React, { useState } from 'react'
import './form.css'

const Form = ({ users, setUsers, setAlert, setModal, currentUser, setCurrentUser }) => {

  const [details, setDetails] = useState({
    name: currentUser?.name || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    company: currentUser?.company.name || '',
    website: currentUser?.website || '',
    suite: currentUser?.address.suite || '',
    street: currentUser?.address.street || '',
    city: currentUser?.address.city || '',
    zipcode: currentUser?.address.zipcode || ''
  })

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  const handleCancel = () => {
    setModal(false)
    setCurrentUser(null)
    document.body.style.overflow = 'initial'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    for (const property in details) {
      if (details[property] === '') {
        setError('Please fill all the fields.')
        return;
      }
    }

    setLoading(true)

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users${currentUser ? `/${currentUser.id}` : ''}`, {
        method: currentUser ? 'PUT' : 'POST',
        body: JSON.stringify({
          name: details.name,
          username: details.username,
          email: details.email,
          phone: details.phone,
          company: {
            name: details.company
          },
          website: details.website,
          address: {
            suite: details.suite,
            street: details.street,
            city: details.city,
            zipcode: details.zipcode
          }
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const data = await response.json()

      if (currentUser) {
        setUsers(users.map(user => user.id === currentUser.id ? data : user))
      }
      else {
        setUsers([data, ...users])
      }

      setCurrentUser(null)
      setLoading(false)

      setAlert({
        show: true,
        msg: currentUser ? 'User edited successfully.' : 'New user added successfully.',
        success: true
      })

      setModal(false)
      document.body.style.overflow = 'initial'
    }
    catch (err) {
      setLoading(false)
      setError('Unknown error occurred while updating.')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <div className="modal-content">
          <div className="modal-header border-bottom p-3">
            <h1 className="modal-title fs-5">Add new user</h1>
            <button type="button" className="btn-close" onClick={handleCancel}></button>
          </div>
          <div className="modal-body p-3">
            <div className={error ? 'text-danger' : 'text-secondary'} style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>All fields are mandatory.</div>
            <form className="row g-3" id='form' onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" value={details.name} className="form-control" id="inputName" name='name' onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputUsername" className="form-label">Username</label>
                <input type="text" value={details.username} className="form-control" id="inputUsername" name='username' onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input type="email" value={details.email} className="form-control" id="inputEmail" name='email' onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPhone" className="form-label">Phone</label>
                <input type="text" value={details.phone} className="form-control" id="inputPhone" name='phone' onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCompany" className="form-label">Company</label>
                <input type="text" value={details.company} className="form-control" id="inputCompany" name='company' onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputWebsite" className="form-label">Website</label>
                <input type="text" value={details.website} className="form-control" id="inputWebsite" name='website' onChange={handleChange} />
              </div>

              <h5 className='mt-5 mb-0'>Address details</h5>
              <div className="col-md-6">
                <label htmlFor="inputSuite" className="form-label">Suite/Apartment</label>
                <input type="text" value={details.suite} className="form-control" id="inputSuite" name='suite' onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputStreet" className="form-label">Street</label>
                <input type="text" value={details.street} className="form-control" id="inputStreet" name='street' onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">City</label>
                <input type="text" value={details.city} className="form-control" id="inputCity" name='city' onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputZip" className="form-label">Zip-code</label>
                <input type="text" value={details.zipcode} className="form-control" id="inputZip" name='zipcode' onChange={handleChange} />
              </div>
            </form>
            {error ? <div className='text-danger fw-bold' style={{ fontSize: '0.9rem', marginTop: '1rem' }}>{error}</div> : null}

          </div>
          <div className="modal-footer p-3 d-flex" style={{ gap: 15 }}>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" form='form' disabled={loading}>
              {loading ? <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> : null}
              <span>{currentUser ? 'Save changes' : 'Add user'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form