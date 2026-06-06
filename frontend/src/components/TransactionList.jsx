import { useState } from 'react';
import { useGetTransactionsQuery } from '../store/apis/transactionApi';
import Spinner from './Spinner';
import TransactionItem from './TransactionItem';
import { CATEGORIES } from '../constants';

const TransactionList = () => {
    const { data: transactions = [], isLoading, isError, error } = useGetTransactionsQuery();

    // Filtri aktiv: 'all', 'income', 'expense', ose nje emer kategorie
    const [typeFilter, setTypeFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    if (isLoading) return <Spinner />;

    if (isError) {
        console.error('Gabim gjate marrjes se transaksioneve:', error);
        return <p className="error">Gabim gjate marrjes se transaksioneve.</p>;
    }

    // Filtrojme transaksionet ne frontend - pa thirrur perseri serverin
    const filtered = transactions.filter((t) => {
        const typeOk = typeFilter === 'all' || t.type === typeFilter;
        const catOk = categoryFilter === 'all' || t.category === categoryFilter;
        return typeOk && catOk;
    });

    return (
        <section className='content'>
            <div className='filters'>
                <div className='filter-row'>
                    <button
                        className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setTypeFilter('all')}
                    >Te gjitha</button>
                    <button
                        className={`filter-btn ${typeFilter === 'income' ? 'active' : ''}`}
                        onClick={() => setTypeFilter('income')}
                    >Te ardhura</button>
                    <button
                        className={`filter-btn ${typeFilter === 'expense' ? 'active' : ''}`}
                        onClick={() => setTypeFilter('expense')}
                    >Shpenzime</button>
                </div>

                <div className='filter-row'>
                    <select
                        className='filter-select'
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value='all'>Te gjitha kategorite</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filtered.length > 0 ? (
                <div className='transactions'>
                    {filtered.map((transaction) => (
                        <TransactionItem key={transaction._id} transaction={transaction} />
                    ))}
                </div>
            ) : (
                <p>Nuk ka transaksione per te shfaqur.</p>
            )}
        </section>
    );
};
export default TransactionList;
