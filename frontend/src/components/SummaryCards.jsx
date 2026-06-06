import { useGetSummaryQuery } from '../store/apis/transactionApi';

// Funksion ndihmes per te formatuar numrat si monedhe (p.sh. 85.000 L)
const formatCurrency = (value) =>
    new Intl.NumberFormat('sq-AL', { maximumFractionDigits: 0 }).format(value || 0) + ' L';

const SummaryCards = () => {
    const { data: summary } = useGetSummaryQuery();

    const totalIncome = summary?.totalIncome ?? 0;
    const totalExpense = summary?.totalExpense ?? 0;
    const balance = summary?.balance ?? 0;

    return (
        <div className='summary'>
            <div className='summary-card income'>
                <p className='summary-label'>Te ardhura</p>
                <p className='summary-value'>+{formatCurrency(totalIncome)}</p>
            </div>
            <div className='summary-card expense'>
                <p className='summary-label'>Shpenzime</p>
                <p className='summary-value'>−{formatCurrency(totalExpense)}</p>
            </div>
            <div className='summary-card balance'>
                <p className='summary-label'>Bilanci</p>
                <p className='summary-value'>{formatCurrency(balance)}</p>
            </div>
        </div>
    );
};
export default SummaryCards;
