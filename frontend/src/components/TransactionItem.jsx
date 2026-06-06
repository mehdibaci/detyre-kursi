import { useState, useRef, useEffect } from 'react';
import { useDeleteTransactionMutation, useUpdateTransactionMutation } from '../store/apis/transactionApi';
import { toast } from 'react-toastify';
import { MdOutlineEdit, MdOutlineSave, MdOutlineDelete } from "react-icons/md";
import { CATEGORIES } from '../constants';

const formatCurrency = (value) =>
    new Intl.NumberFormat('sq-AL', { maximumFractionDigits: 0 }).format(value || 0) + ' L';

const TransactionItem = ({ transaction }) => {
    const [updateTransaction] = useUpdateTransactionMutation();
    const [deleteTransaction] = useDeleteTransactionMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
    });

    const inputRef = useRef(null);

    const isIncome = transaction.type === 'income';

    const handleDelete = async () => {
        const result = await deleteTransaction(transaction._id);
        if (result.error) {
            toast.error(result.error.data?.message || 'Fshirja deshtoi!');
        } else {
            toast.success('Transaksioni u fshi me sukses!');
        }
    };

    const handleUpdate = async () => {
        if (!edited.description.trim() || edited.amount === '') return;
        const result = await updateTransaction({
            id: transaction._id,
            description: edited.description,
            amount: Number(edited.amount),
            type: edited.type,
            category: edited.category,
        });
        if (result.error) {
            toast.error(result.error.data?.message || 'Perditesimi deshtoi!');
        } else {
            toast.success('Transaksioni u perditesua me sukses!');
            setIsEditing(false);
        }
    };

    const onChange = (e) => {
        setEdited((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    return (
        <div className={`transaction ${isIncome ? 'is-income' : 'is-expense'}`}>
            {isEditing ? (
                <button onClick={handleUpdate} className='edit' aria-label='Ruaj'><MdOutlineSave /></button>
            ) : (
                <button onClick={() => setIsEditing(true)} className='edit' aria-label='Ndrysho'><MdOutlineEdit /></button>
            )}
            <button onClick={handleDelete} className='close' aria-label='Fshi'><MdOutlineDelete /></button>

            {isEditing ? (
                <div className='transaction-edit'>
                    <input
                        ref={inputRef}
                        className='edit-input'
                        type='text'
                        name='description'
                        value={edited.description}
                        onChange={onChange}
                    />
                    <input
                        className='edit-input'
                        type='number'
                        name='amount'
                        value={edited.amount}
                        min='0'
                        onChange={onChange}
                    />
                    <select name='type' value={edited.type} onChange={onChange}>
                        <option value='expense'>Shpenzim</option>
                        <option value='income'>Te ardhura</option>
                    </select>
                    <select name='category' value={edited.category} onChange={onChange}>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <>
                    <span className='transaction-date'>
                        {new Date(transaction.createdAt).toLocaleDateString('sq-AL')}
                    </span>
                    <span className='transaction-category'>{transaction.category}</span>
                    <h2 className='transaction-desc'>{transaction.description}</h2>
                    <p className={`transaction-amount ${isIncome ? 'amount-income' : 'amount-expense'}`}>
                        {isIncome ? '+' : '−'}{formatCurrency(transaction.amount)}
                    </p>
                </>
            )}
        </div>
    );
};
export default TransactionItem;
