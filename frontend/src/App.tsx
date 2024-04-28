import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const text = await response.text();
        setData(text);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>从后端获取的数据:</h1>
      <p>{data}</p>
    </div>
  );
};

export default App;
