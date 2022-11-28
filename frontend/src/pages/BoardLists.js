import { useEffect, useState } from "react";
import axiosInstance from "../axios-service";
import Button from './../Elements/Button'
import Input from './../Elements/Input'
import Popup from './../components/popup/'
import BoardForm from "../components/BoardForm";
import { useNavigate } from 'react-router-dom'

const BoardBox = ({ id, name, getBoards, navigate, privacy }) => {

    const boardboxStyle = {
        width: '100px',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px',
        padding: '5px',
        border: '1px solid #3c4257'

    }
    const handleDelete = () => {
        axiosInstance.delete(`/boards/${id}`,)
            .then(res => {
                console.log(res.data)
                getBoards()
            }).catch(err => {
                console.log(err.response)
            })
    }

    return <div className="board-box" style={boardboxStyle}>
        <div onClick={() => navigate(`${id}`)} style={{cursor:'pointer'}}>
            {name}
        </div>
        <span style={{fontSize: 10}}>{privacy}</span>

        <span style={{ fontSize: 12, cursor: 'pointer', margin: '10px 0' }} onClick={handleDelete}>🗑️</span>
    </div>
}



const BoardLists = () => {
    const [boards, setBoards] = useState([])
    const [popupVisible, setPopupVisible] = useState(false)
    const [users, setusers] = useState([]);

    const navigate = useNavigate()

    const getBoards = () => {
        axiosInstance.get('/boards',)
            .then(res => {
                console.log(res.data)
                setBoards(res.data.results)
            }).catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        getBoards()
        axiosInstance.get('/users',)
            .then(res => {
                console.log(res.data)
                setusers(res.data)
            }).catch(err => {
                console.log(err.response)
            })
    }, []);

    return <div className="boards-section" style={{ position: 'relative', minHeight: '100vh' }}>

        <div style={{ display: 'flex' }}>

            {
                boards.length ?
                    boards.map(board => {
                        return <BoardBox
                        key={`boardbox-${board.id}`}
                            id={board.id}
                            name={board.name}
                            getBoards={getBoards}
                            navigate={navigate}
                            privacy={board.privacy}
                        />
                    })
                    :
                    <span>No Boards found. Get Started by creating a board</span>
            }
        </div>

        <div className="board-box">
            <Button
                text={'Create Board'}
                onClick={() => setPopupVisible(true)}
            />
        </div>

        {
            popupVisible && <Popup
                setVisibility={setPopupVisible}
                title='Create Board'
                content={
                    <BoardForm
                        users={users}
                        getBoards={getBoards}
                        setPopupVisible={setPopupVisible}
                    />
                }
            />
        }

    </div>
}

export default BoardLists;