// actions.js
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchData = () => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_REQUEST });
    setTimeout(() => {
      const data = generateData();
      dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
    }, 1000);
  };
};

// Generate sample data
const generateData = () => {
  const buildings = ['Building A', 'Building B', 'Building C', 'Building D'];
  const data = {
    electricity: { buildings: {}, totalConsumption: [] },
    water: { buildings: {}, totalConsumption: [] }
  };

  buildings.forEach(building => {
    const electricityData = Array.from({ length: 30 }, (_, i) => ({
      date: `2023-09-${String(i + 1).padStart(2, '0')}`,
      consumption: Math.floor(Math.random() * 100) + 50
    }));

    const waterData = Array.from({ length: 30 }, (_, i) => ({
      date: `2023-09-${String(i + 1).padStart(2, '0')}`,
      consumption: Math.floor(Math.random() * 50) + 20
    }));

    data.electricity.buildings[building] = electricityData;
    data.electricity.totalConsumption.push(
      electricityData.reduce((sum, { consumption }) => sum + consumption, 0)
    );

    data.water.buildings[building] = waterData;
    data.water.totalConsumption.push(
      waterData.reduce((sum, { consumption }) => sum + consumption, 0)
    );
  });

  // data.apiKey = 'sensitive-api-key-12345';
  return data;
};
