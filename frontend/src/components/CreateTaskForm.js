import { useState } from "react";
import axiosInstance from "../axios-service";
import Button from "../Elements/Button";
import Input from "../Elements/Input";


const CreateTaskForm = ({ list_id, setPopupVisible, getAllData, board_members }) => {
    const [task, setTask] = useState('');
    const [members, setMembers] = useState([])

    let user_options = board_members.map(item => {
        return <option key={item.username} value={item.id}>{item.username}</option>
    })

    const handleChange = (e) => {
        var options = e.target.options;
        var member = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                member.push(options[i].value);
            }
        }
        setMembers(prevState => {
            return [...prevState, ...member]
        });
    }

    const handleSubmit = () => {
        axiosInstance.post('/tasks',
            {
                task: {
                    text: task,
                    assigned_to: members,
                    list: list_id
                }
            })
            .then(response => {
                console.log(response.data)
                getAllData()
                setPopupVisible(false)

            }).catch(err => {
                console.log(err.response)
            })
    }
    return <div>
        <Input
            name="text"
            type={'text'}
            value={task}
            placeholder="Task"
            onChange={(e) => setTask(e.target.value)}
        />
        <select multiple={true} value={members} onChange={handleChange} >
            {user_options}
        </select>
        <Button
            isDisabled={!task.length}
            onClick={handleSubmit}
            text={'Add Task'}
        />

    </div>
}

export default CreateTaskForm;