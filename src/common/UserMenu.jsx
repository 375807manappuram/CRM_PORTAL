import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div>
            <div className='card'>
                <div className='list-group list-group-flush'>
                    <Link to='/dashboard/user' className='list-group-item list-group-item-action'> Dashboard</Link>
                    <Link to='/dashboard/user/profile' className='list-group-item list-group-item-action'> Profile  </Link>
                    <Link to='/dashboard/user/allcars' className='list-group-item list-group-item-action'>Latest Cars</Link>
                    <Link to='/dashboard/user/incident' className='list-group-item list-group-item-action'>Complaint Register</Link>

                </div>
            </div>
        </div>
    )
}

export default UserMenu
