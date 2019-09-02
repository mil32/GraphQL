import React from 'react'
import style from './input.module.scss'

export default function index(props) {
    let {name,type, value, label, required, onChange} = props;
    return (
        <div className={[style.col, style.inputEffect].join('')}>
            <input className={style.effect} placeholder="&nbsp;" name={name} value={value} onChange={onChange} required={required} type={type}
            {...(type==="number" ? {bsStyle: 'success'} : {})}
            />
            <label>{label}</label>
            <span className={style.focusBg} > </span>
        </div>
    )
}
