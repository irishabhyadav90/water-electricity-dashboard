import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchData } from './actions';
import { dashboard_views } from './constants';

const App = () => {
  const dispatch = useDispatch();
  const { ELECTRICITY, WATER } = dashboard_views;
  const { data, loading, error } = useSelector(state =>  state.dashboard);
  const [view, setView] = useState(ELECTRICITY);
  const isDashboardExists = Object.keys(data).length > 0;

  useEffect(() => {
    if (!isDashboardExists) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

  const totalConsumption = data[view]?.totalConsumption?.reduce((sum, val) => sum + val, 0);

  if (loading || !isDashboardExists) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentTime = new Date().toLocaleTimeString();

  const userMessage = new URLSearchParams(window.location.search).get('message') || '';

  const toggleView = () => {
    setView(prevView => (prevView === ELECTRICITY ? WATER : ELECTRICITY));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{`${view?.toUpperCase()} Consumption Dashboard`}</h1>
      <div className='flex flex-row justify-between my-4'>
       <div>
      <p>Current time: {currentTime}</p>
      <p>Total Consumption: {totalConsumption}</p>
       </div>
      <div>
      <button 
        onClick={toggleView} 
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
       {` Switch to ${view === ELECTRICITY ? WATER : ELECTRICITY} View`}
      </button>
      </div>
      </div>
      <div innerhtml={{ __html: userMessage }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data[view] && data[view].buildings && Object.entries(data[view]?.buildings || {}).map(([building, consumption]) => (
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
