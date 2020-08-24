import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import './app.css';

import React from 'react'
import Routes from './router'
import Menu from '../template/menu'
export default props =>(
    <div className="container">
        <div className="app">
            <Menu/>
        <   Routes/>
        </div>
    </div>
)
