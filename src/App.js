import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchData } from './actions';

const App = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.electricity);

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const totalConsumption = data.totalConsumption?.reduce((sum, val) => sum + val, 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentTime = new Date().toLocaleTimeString();

  const userMessage = new URLSearchParams(window.location.search).get('message') || '';

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Electricity Consumption Dashboard</h1>
      <p>Current time: {currentTime}</p>
      <p>Total Consumption: {totalConsumption}</p>
      {}
      <div innerhtml={{ __html: userMessage }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data.buildings || {}).map(([building, consumption]) => (
          <div key={building} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{building}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={consumption}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
