import { useState } from "react";
import { FaUser } from 'react-icons/fa';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { setUser } from '../store/slices/userSlice';
import { useRegisterMutation } from '../store/apis/userApi';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' })
    const { name, email, password, password2 } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Fjalekalimet nuk perputhen')
        } else {
            const response = await register(formData);
            if (response.error) {
                toast.error(response.error.data?.message || response.error.error || 'Regjistrimi deshtoi');
            } else {
                dispatch(setUser(response.data));
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
                toast.success('Regjistrimi u krye me sukses!');
            }
        }
    }


    return (
        <>
            <section className='heading'>
                <h1><FaUser /> Regjistrohu</h1>
                <p>Krijo nje llogari te re</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type='text' className='form-control' id='name' name='name' value={name} placeholder='Shkruaj emrin' onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <input type='email' className='form-control' id='email' name='email' value={email} placeholder='Shkruaj email-in' onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Shkruaj fjalekalimin' onChange={onChange} />
                    </div >

                    <div className='form-group'>
                        <input type='password' className='form-control' id='password2' name='password2' value={password2} placeholder='Konfirmo fjalekalimin' onChange={onChange} />
                    </div >

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading ? "Te lutem prit..." : "Regjistrohu"}</button>
                    </div >
                </form >
            </section >
        </>
    )
}
export default Register
