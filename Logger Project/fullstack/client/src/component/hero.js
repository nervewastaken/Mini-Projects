import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Hero = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    applyFilters(status, startDate, endDate);
  };

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    applyFilters(statusFilter, date, endDate);
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);
    applyFilters(statusFilter, startDate, date);
  };

  const applyFilters = (status, start, end) => {
    let filtered = logs;

    if (status !== 'all') {
      filtered = filtered.filter(log => log.status === status);
    }

    if (start) {
      const startTime = new Date(start).getTime();
      filtered = filtered.filter(log => new Date(log.logtime).getTime() >= startTime);
    }

    if (end) {
      const endTime = new Date(end).getTime();
      filtered = filtered.filter(log => new Date(log.logtime).getTime() <= endTime);
    }

    setFilteredLogs(filtered);
  };

  const formatDataForChart = (data) => {
    return data.map(log => ({
      logtime: new Date(log.logtime).toLocaleString(),
      posx: log.posx,
      posy: log.posy,
      status: log.status,
    }));
  };

  return (
    <div className="app-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="controls-container">
        <button className="refresh-button" onClick={fetchLogs}>Refresh Data</button>
        <select className="status-filter" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="all">All Data</option>
          <option value="active">Active</option>
          <option value="idle">Idle</option>
          <option value="charging">Charging</option>
        </select>
        <div className="date-filters">
          <label className="date-label">Start Date:</label>
          <input className="date-input" type="datetime-local" value={startDate} onChange={handleStartDateChange} />
          <label className="date-label">End Date:</label>
          <input className="date-input" type="datetime-local" value={endDate} onChange={handleEndDateChange} />
        </div>
      </div>

      <table className="logs-table">
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

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatDataForChart(filteredLogs)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="logtime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="posx" stroke="#8884d8" name="Position X" />
            <Line type="monotone" dataKey="posy" stroke="#82ca9d" name="Position Y" />
            <Line type="monotone" dataKey="status" stroke="#ffc658" name="Status" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Hero;
