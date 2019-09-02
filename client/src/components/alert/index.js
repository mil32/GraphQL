import React, { Component } from 'react';

import style from './alert.module.scss';

export default class alert extends Component {
    render() {
        return (
            <div className={style.modal}>
                <div className={style.children}>
                    <div className={style.close} onClick={this.props.hide}>X</div>
                    <div className={style.example}>
                        <div className={style.title}> Exito! </div>
                        <div> Producto agregado con exito.</div>
                    </div>
                </div>
                
            </div>
        )
    }
}
