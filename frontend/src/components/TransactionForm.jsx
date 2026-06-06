import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCreateTransactionMutation } from '../store/apis/transactionApi';
import { CATEGORIES } from '../constants';

const TransactionForm = () => {
    const navigate = useNavigate();
    const [createTransaction, { isLoading }] = useCreateTransactionMutation();

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense',
        category: 'Ushqim',
    });
    const { description, amount, type, category } = formData;

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim() || amount === '') {
            toast.error('Ploteso pershkrimin dhe shumen');
            return;
        }
        try {
            const result = await createTransaction({
                description,
                amount: Number(amount),
                type,
                category,
            });
            if (result.error) {
                toast.error(result.error.data?.message || 'Diçka shkoi keq!');
            } else {
                setFormData({ description: '', amount: '', type: 'expense', category: 'Ushqim' });
                toast.success('Transaksioni u shtua me sukses!');
                navigate('/transactions');
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Diçka shkoi keq!');
        }
    };

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='description'>Pershkrimi</label>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        value={description}
                        placeholder='p.sh. Pazar javor'
                        onChange={onChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='amount'>Shuma (L)</label>
                    <input
                        type='number'
                        id='amount'
                        name='amount'
                        value={amount}
                        placeholder='p.sh. 2500'
                        min='0'
                        step='any'
                        onChange={onChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='type'>Tipi</label>
                    <select id='type' name='type' value={type} onChange={onChange}>
                        <option value='expense'>Shpenzim</option>
                        <option value='income'>Te ardhura</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='category'>Kategoria</label>
                    <select id='category' name='category' value={category} onChange={onChange}>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <button className='btn btn-block' type='submit' disabled={isLoading}>
                        {isLoading ? 'Duke shtuar...' : 'Shto Transaksion'}
                    </button>
                </div>
            </form>
        </section>
    );
};
export default TransactionForm;
