import React, { Component } from 'react';
import './app-container.css';
import { Navbar } from 'react-bootstrap';

class AppContainer extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" fixed="top">
                    <Navbar.Brand align="center">
                        <span class="navbar-brand-name">
                            Slacts
                        </span>
                        <span class="navbar-brand-sub">
                            - selfies of acts worth sharing
                        </span>
                    </Navbar.Brand>
                </Navbar>



                <Navbar bg="dark" fixed="bottom">
                    <Navbar.Brand href="#home">
                        <span>
                            Brand link
                        </span>
                    </Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}

export default AppContainer;