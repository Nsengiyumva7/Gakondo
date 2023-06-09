import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Top from '../components/Top';
import Dashboard from './Dashboard';
import Users from './Users';
import Disease from './Disease';
import Medecine from './Medecine';
import Activities from './Activities';
import Events from './Events';
import Holidays from './Holidays';
import Accounts from './Accounts';
import Settings from './Settings';

const Home = () => {
  return (
        <div className="container">
            <div className="row">
                <Sidebar />
            </div>
            <div className="row">
                <div className="col">
                    <Top />
                </div>
                <div className="col">
                    <Routes>
                        <Route path='/' element={<Dashboard />}/>
                        <Route path='/users' element={<Users />}/>
                        <Route path='/disease' element={<Disease />}/>
                        <Route path='/medecine' element={<Medecine />}/>
                        <Route path='/activities' element={<Activities />}/>
                        <Route path='/events' element={<Events />}/>
                        <Route path='/holidays' element={<Holidays />}/>
                        <Route path='/accounts' element={<Accounts />}/>
                        <Route path='/settings' element={<Settings />}/>
                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default Home
