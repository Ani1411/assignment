import { useState } from "react";
import axiosInstance from "../axios-service";
import Button from "../Elements/Button";
import Input from "../Elements/Input";


const BoardForm = ({ users, getBoards, setPopupVisible }) => {
    const [formdata, setFormData] = useState({
        name: '',
        privacy: 'public',
    });
    const { name, privacy } = formdata
    const [members, setMembers] = useState([])

    const onInputChange = (e) => setFormData({ ...formdata, [e.target.name]: e.target.value });

    let user_options = users.map(item => {
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
        axiosInstance.post('/boards',
            {
                board: {
                    name: name,
                    privacy: privacy,
                    members: members
                }
            })
            .then(response => {
                console.log(response.data)
                getBoards()
                setPopupVisible(false)

            }).catch(err => {
                console.log(err.response)
            })
    }


    return <div>
        <Input
            type='text'
            name='name'
            placeholder='name/title'
            value={name}
            onChange={onInputChange}
        /><br />
        <select name='privacy' onChange={onInputChange} value={privacy}>
            <option value='public'>PUBLIC</option>
            <option value='private'>PRIVATE</option>
        </select>
        <br />
        <select multiple={true} value={members} onChange={handleChange} >
            {user_options}
        </select>
        <Button
            isDisabled={!name.length}
            onClick={handleSubmit}
            text={'Create Board'}
        />
    </div>
}

export default BoardForm