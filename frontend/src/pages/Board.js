import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios-service";
import Lists from "../components/List";
import Popup from "../components/popup";
import Button from "../Elements/Button";
import Input from "../Elements/Input";


const CreateList = ({ id, setPopupVisible, getAllData }) => {
    const [title, setTitle] = useState('')
    const handleSubmit = () => {
        axiosInstance.post('/lists',
            {
                list: {
                    title: title,
                    board: id
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
            name="title"
            type={'text'}
            value={title}
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
        />
        <Button
            isDisabled={!title.length}
            onClick={handleSubmit}
            text={'Create List'}
        />

    </div>
}


const Board = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)

    const [data, setData] = useState({
        name: '',
        privacy: '',
        lists: [],
        members: []
    })



    const getAllData = () => {
        axiosInstance.get(`/data/${id}`,)
            .then(res => {
                console.log(res.data)
                if (Object.keys(res.data.results).length) {
                    setData(res.data.results[0])
                } else {
                    navigate('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAllData()
    }, []);

    const { name, privacy, lists, members } = data

    var memberString = ''

    members.length && members.forEach((item, i) => {
        memberString = `${memberString} ${item.username}  ${i + 1 < members.length ? ', ' : '.'}`
    })

    return <div>
        <div className="board-details">
            <h3>{name}</h3>
            <p>Privacy: {privacy}</p>
            <p>Members: {memberString}</p>
        </div>
        <div className="list-section" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            {
                lists.length > 0 && lists.map(list => {
                    return <Lists
                    key={`list-${list.id}`}
                        list_id={list.id}
                        title={list.title}
                        tasks={list.tasks}
                        getAllData={getAllData}
                        board_members={members}
                    />
                })
            }
            <div>
                <Button onClick={() => setVisible(true)} isDisabled={false} text='Add New List' />
            </div>

            {
                visible &&
                <Popup
                    setVisibility={setVisible}
                    title={'Create List'}
                    content={<CreateList id={id} setPopupVisible={setVisible} getAllData={getAllData} />}
                />
            }

        </div>

    </div>
}

export default Board;