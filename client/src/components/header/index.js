
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import style from './header.module.scss';
import logoWhite from '../../images/logo-white.svg';

import {container, flex} from '../../css/layout.module.scss';

class Header extends Component {
    state = {  }
    render() { 
        return (
        <header className={style.header}>
            <div className={[container, flex].join(' ')}>
              <div className={style.logo}>
                <img src={logoWhite} alt="Pizza Time"/>
              </div>
              <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    {/* <li>
                      <Link to="/pizza/">Pizza</Link>
                    </li> */}
                  </ul>
              </nav>  
            </div>
        </header>
        );
    }
}
 
export default Header;