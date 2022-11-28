
import { useState } from 'react'
import axiosInstance from '../axios-service'
import Button from '../Elements/Button'
import Input from '../Elements/Input'
import './../css/list.css'
import CreateTaskForm from './CreateTaskForm'
import Popup from './popup'
import Task from './Task'


const Lists = ({ list_id, title, tasks, getAllData, board_members }) => {

    const [visible, setVisible] = useState(false)

    const handleDeleteList = () => {
        axiosInstance.delete(`/lists/${list_id}`,)
            .then(res => {
                console.log(res.data)
                getAllData()
            }).catch(err => {
                console.log(err.response)
            })
    }



    return <div className='lists'>
        <div className='task-container'>
            <h3>{title}</h3>
            <div className='tasks-container'>
                {
                    tasks.map(task => {
                        return <Task
                        key={`task-${task.id}`}
                            id={task.id}
                            text={task.text}
                            assigned_to={task.assigned_to}
                            getAllData={getAllData}
                        />
                    })
                }
                <Button
                    isDisabled={!title.length}
                    onClick={() => { setVisible(true) }}
                    text={'Add Task'}
                />
            </div>
        </div>
        {
            visible &&
            <Popup
                setVisibility={setVisible}
                title={'Create Task'}
                content={<CreateTaskForm
                    list_id={list_id}
                    setPopupVisible={setVisible}
                    getAllData={getAllData}
                    board_members={board_members} />
                }
            />
        }

        <div>
            <Button
                isDisabled={false}
                text={'Delete List'}
                onClick={handleDeleteList}
            />
        </div>


    </div>
}

export default Lists;