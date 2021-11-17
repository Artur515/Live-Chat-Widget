import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalContent from "./ModalContent";
import {io} from "socket.io-client";
import {ENDPOINT} from "../constants";


const PortalModal = ({title, isOpen, setOpenModal}) => {
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState([])
    const [mySocket, setMySocket] = useState(null)
    const greetingMessage = {user: "System", message: "Hi! How can i help you?"}


    useEffect(() => {
        const socket = io(ENDPOINT);
        setMySocket(socket)
        // socket.on("connection", data => {
        //     setMessages(data)
        // });
        socket.on("message:new", data => {
            setMessages(prev => [...prev, data])
        })

    }, []);


    const handleClose = () => {
        setOpenModal(false)
        setMessages([])
    }

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmitMessage = () => {
        if (mySocket && value) {
            const newValue = {message: value, user: 'Artur'}
            mySocket.emit('message:create', newValue)
        }
        setValue('')
    }

    console.log(messages)

    if (!isOpen) return null
    return ReactDOM.createPortal(
        <div className="modal">
            <button onClick={handleClose} className="close_button">&times;</button>
            <div className="modal_content">
                <h1>{title}</h1>
                <ModalContent message={greetingMessage}/>
                {messages && messages.map((message, index) =>
                    <ModalContent key={index} message={message}/>)}
            </div>
            <div className='modal_icon' onClick={handleSubmitMessage}>&#10148;</div>
            <input type="text" value={value} onChange={handleChange} className='modal_input'
                   placeholder='Type your request...'/>
        </div>,
        document.getElementById('live-chat'))
};

export default PortalModal;