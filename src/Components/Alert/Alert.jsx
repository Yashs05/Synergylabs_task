import React, { useEffect } from 'react'

const Alert = ({ alert, setAlert }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({
                show: false,
                msg: '',
                success: null
            })
        }, 5000)

        return () => clearTimeout(timeout)
    }, [setAlert])
    return (
        <div className="toast-container position-fixed start-50 translate-middle-x py-3 px-4 bg-white" style={{ bottom: 20, boxShadow: '#f0f0f0 0px 0px 10px 10px', border: '1px solid rgb(209 209 209)', borderRadius: 5 }}>
            <div className='d-flex justify-content-center align-items-center' style={{ gap: 10 }}>
                <i className={alert.success ? "fa-solid fa-check fa-lg text-success" : 'fa-solid fa-circle-exclamation fa-lg text-danger'} />
                <div>{alert.msg}</div>
            </div>
        </div>
    )
}

export default Alert