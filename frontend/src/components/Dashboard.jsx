import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import TransactionForm from './TransactionForm';
import SummaryCards from './SummaryCards';
import CategoryChart from './CategoryChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate])

  return (
    <>
      <section className='heading'>
        <h1>Mire se erdhe, {user && user.name}</h1>
        <p>Ja nje permbledhje e financave te tua</p>
      </section>

      <SummaryCards />

      <CategoryChart />

      <section className='heading' style={{ marginBottom: 20, marginTop: 40 }}>
        <h2>Shto nje transaksion</h2>
      </section>

      <TransactionForm />
    </>
  )
}

export default Dashboard
