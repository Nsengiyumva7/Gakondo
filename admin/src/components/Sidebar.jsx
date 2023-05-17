import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='s-container'>
      <div className="s-row">
        
        <h2 className="s-logo">BIVUZAGA GUTE?!</h2>
      </div>
      <div className="s-row">
        <div className="s-groups">
          <div className="s-group">
            <NavLink to='/' className='s-link' activeclassName='active'>Dashboard</NavLink>
          </div>

        <div className="s-group">
            <NavLink to='/users' className='s-link' activeclassName='active'>System Users</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/disease' className='s-link' activeclassName='active'>Disease</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/medecine' className='s-link' activeclassName='active'>Medecine</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/activities' className='s-link' activeclassName='active'>ANNOUNCEMENTS</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/events' className='s-link' activeclassName='active'>Events</NavLink>
          </div>
          <div className="s-group">
            <NavLink to='/holidays' className='s-link' activeclassName='active'>Holidays</NavLink>
          </div>
          {/* <div className="s-group">
            <NavLink to='/accounts' className='s-link' activeclassName='active'>AMBULANCES</NavLink>
          </div> */}
      </div>
    </div>
    </div>
  )
}

export default Sidebar
