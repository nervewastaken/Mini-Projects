"use client"
import React,{useEffect, useState} from 'react'
import {UserAuth} from "./context/AuthContext"
import { userAgentFromString } from 'next/server'
import Todo from './components/Todo'
import { collection, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';

const Home = () => {
  const {user} = UserAuth()
  const [loading,setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve,50));
      setLoading(false);
    }
    
      const fetchTasks = async () => {
        const q = query(collection(db, 'tasks'), where('username', '==', user.displayName || user.email));
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
      
    }
    fetchTasks();
    checkAuth();
  }, [user]);

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    setTasks(tasks.filter(task => task.id !== id));
  };

  if (!user) {
    return <p>Please login to view tasks</p>;
  }

  const markAsCompleted = async (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: 'Completed' };
      } else {
        return task;
      }
    });
  
    setTasks(updatedTasks);
    // Update status in Firestore
    await updateDoc(doc(db, 'tasks', id), {
      status: 'Completed'
    });
  };
  return (
    <div className='p-4'>
      {loading ? (<p>
        loading...
      </p>) : user ? (
        <div>
        <p>
          Welcome, {user.displayName} - you are logged in to the profile page
        </p>
        <Todo/>
        <main className="p-4 flex justify-center">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Task Name</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Finish By</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{task.taskName}</td>
              <td className="border px-4 py-2">{task.priority}</td>
              <td className="border px-4 py-2">{task.finishBy}</td>
              <td className="border px-4 py-2">{task.status}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => markAsCompleted(task.id)}>Mark as Completed</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
        </div>
        
      ):
      (<p>Must be logged in to view this page</p>
      )}

      
      
    </div>
  )
}

export default Home