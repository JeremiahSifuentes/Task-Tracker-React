const tasks = [
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 6th at 2:30pm',
        reminder: true,
    },
    {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true,
    },
    {
        id: 3,
        text: 'Virtual Reality Game Session',
        day: 'Feb 12th at ALL DAY',
        reminder: false,
    }
]

const Tasks = () => {
    return (
        <>
           {tasks.map((task) => (
           <h3 key={task.id}>{task.text}</h3>))} 
        </>
    )
}

export default Tasks
