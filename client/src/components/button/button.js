import React from 'react';

import style from './button.module.scss';

const button = ({children, onClick, color, type, block}) => {
    const classNames = [style.basic, style[type], style[color]];
    if(block) classNames.push(style.block);
    return (
        <button className={classNames.join(' ')} onClick={onClick}>
            {children}
        </button>
      );
}
 
export default button;
