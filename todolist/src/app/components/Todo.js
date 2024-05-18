'use client';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db } from '../firebase';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [finishBy, setFinishBy] = useState('');
  const [status, setStatus] = useState('Pending');

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  // Add task to Firestore
  const addTask = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (taskName !== '' && finishBy !== '' && user) {
      const newTask = { taskName, priority, finishBy, status, username: user.displayName || user.email };
      await addDoc(collection(db, 'tasks'), newTask);
      setTasks([...tasks, newTask]);
      setTaskName('');
      setPriority('Low');
      setFinishBy('');
      setStatus('Pending');
    }
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={addTask} className="flex justify-center">
  <div className="w-full max-w-xs py-5">
    <div className="mb-4 flex">
      <label className="mr-2 w-24">Name</label>
      <input 
        type="text" 
        className="flex-1 border border-gray-300 rounded py-2"
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
      />
    </div>
    <div className="mb-4 flex">
      <label className="mr-2 w-24">Priority</label>
      <select 
        className="flex-1 border border-gray-300 rounded px-3 py-2"
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <div className="mb-4 flex">
      <label className="mr-2 w-24">Finish By</label>
      <input 
        type="date" 
        className="flex-1 border border-gray-300 rounded px-3 py-2"
        value={finishBy} 
        onChange={(e) => setFinishBy(e.target.value)} 
      />
    </div>
    <div className="mb-4 flex">
      <label className="mr-2 w-24">Status</label>
      <select 
        className="flex-1 border border-gray-300 rounded px-3 py-2"
        value={status} 
        onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <button 
      type="submit" 
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add Task
    </button>
  </div>
</form>
      
    </div>
  );
};

export default Todo;
