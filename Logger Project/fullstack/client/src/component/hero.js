import React, {useState,useEffect} from 'react'

const Hero = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sliderValue, setSliderValue] = useState(100);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/log');
      const data = await response.json();
      setLogs(data);
      setFilteredLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleStatusFilterChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    if (status === 'all') {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter(log => log.status === status);
      setFilteredLogs(filtered);
    }
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    const filtered = logs.filter(log => new Date(log.logtime).getTime() >= new Date().getTime() - (value * 86400000)); // Convert days to milliseconds
    setFilteredLogs(filtered);
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>

      {/* Interactive Elements */}
      <div>
        <button onClick={fetchLogs}>Refresh Data</button>
        <select value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="all">All Data</option>
          <option value="active">Active</option>
          <option value="idle">Idle</option>
          <option value="charging">Charging</option>
        </select>
        <label>Filter by days:</label>
        <input type="range" min="1" max="100" value={sliderValue} onChange={handleSliderChange} />
        <span>{sliderValue} days</span>
      </div>

      {/* Table to display logs */}
      <table>
        <thead>
          <tr>
            <th>Power (%)</th>
            <th>Status</th>
            <th>Position X</th>
            <th>Position Y</th>
            <th>Log Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.power}</td>
              <td>{log.status}</td>
              <td>{log.posx}</td>
              <td>{log.posy}</td>
              <td>{log.logtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Hero;