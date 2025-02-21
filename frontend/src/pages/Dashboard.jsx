import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../components/TaskCard';
import Navbar from '../components/Navbar';
// import { fetchTasks } from '../redux/slices/taskSlice'; 

const Dashboard = () => {
    // const dispatch = useDispatch();
    // const tasks = useSelector((state) => state.tasks.tasks);

    // useEffect(() => {
    //     dispatch(fetchTasks());
    // }, [dispatch]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">Dashboard</div>
        </>
        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //         {tasks.map((task) => (
        //             <TaskCard key={task._id} task={task} />
        //         ))}
        //     </div>
        // </div>
    );
};

export default Dashboard;