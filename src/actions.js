// actions.js
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

/* Todo - Please make this function async */
export const fetchData = () => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_REQUEST });
   /* Todo - Replace setTimeout with async/await to handle async operations more cleanly */ 
    setTimeout(() => {
      const data = generateData();
      dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
    }, 1000);
  };
};

// Generate sample data
const generateData = () => {
  const buildings = ['Building A', 'Building B', 'Building C', 'Building D'];
  const data = {};

  const consumptionArray = [];

  buildings.forEach(building => {
    const buildingData = Array.from({ length: 30 }, (_, i) => ({
      date: `2023-09-${String(i + 1).padStart(2, '0')}`,
      consumption: Math.floor(Math.random() * 100) + 50
    }));
    data[building] = buildingData;
    consumptionArray.push({ building, data: buildingData });
  });
  
  /* Todo - Please avoid putting sensitive data directly in codebase. Use .env file to configure with this key */
  data.apiKey = 'sensitive-api-key-12345';

  return { buildings: data, consumptionArray };
};
