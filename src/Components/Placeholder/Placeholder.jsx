import React from 'react'

const Placeholder = () => {

    const array = [1, 2, 3]

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-4 bg-primary" style={{ height: 30 }}></span>
            </div>
            {array.map((item, i) => {
                return (
                    <div key={i} className="card my-4" aria-hidden="true">
                        <div className='placeholder' style={{ height: '100px' }} />
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                        </div>
                    </div>
                )
            })
            }
        </>
    )
}

export default Placeholder