import { FaSignInAlt, FaSignOutAlt, FaUser, FaWallet } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../store/slices/userSlice';
import { transactionApi } from '../store/apis/transactionApi';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        // Pastrojme cache-in e transaksioneve qe llogaria tjeter te mos shohe te dhenat e vjetra
        dispatch(transactionApi.util.resetApiState());
        navigate('/login');
    }
    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'><FaWallet /> FinTrack</Link>
            </div>

            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to='/transactions'>Transaksionet</Link>
                        </li>
                        <li>
                            <button className='btn' onClick={handleLogout}>
                                <FaSignOutAlt /> Dil
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Hyr
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Regjistrohu
                            </Link>
                        </li>
                    </>
                )}

            </ul>
        </header>
    )
}
export default Header
