import React from 'react';
import './Form.css';


const Form = ({onSubmit, username, password, onChange, formTitle, btnText}) => {
    return (
            <div className='form_block'>
                <h3>{formTitle}</h3>
                <form onSubmit={onSubmit} className='register_form'>
                    <input type="text" className='inputForm' name="username" value={username} onChange={onChange} autoComplete='off' placeholder="Username" required autoFocus/>
                    <input type="password" className='inputForm' name='password' value={password} onChange={onChange} autoComplete='off' placeholder="Password" required/>
                    <input className='inputSubmit' type="submit" name="submit" value={btnText}/>
                </form>
            </div>
    );
};


export default Form;