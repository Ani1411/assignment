

import axiosInstance from '../axios-service';
import Button from '../Elements/Button';
import './../css/tasks.css'

export const getIntials = username => username.split(" ").map(n => n[0]).join("").toUpperCase();



const Task = ({ id, text, assigned_to, getAllData }) => {

    const handleDeleteTask = () => {
        axiosInstance.delete(`/tasks/${id}`,)
            .then(res => {
                console.log(res.data)
                getAllData()
            }).catch(err => {
                console.log(err.response)
            })
    }

    return <div className='tasks'>
        <div>
            {text}
        </div>
        <div>
            {assigned_to.map(user => {
                return <span className='user-initials' key={`ini-${user.username}`}>
                    {getIntials(user.username)}
                </span>
            })}
        </div>
        <div>
            <Button
                className='task-delete'
                isDisabled={false}
                text={'🗑️'}
                onClick={handleDeleteTask}

            />
        </div>
    </div>
}

export default Task;