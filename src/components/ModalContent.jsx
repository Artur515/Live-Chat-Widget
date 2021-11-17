import React from 'react';

const ModalContent = ({message}) => {


    return (
        <p className={message.user === 'System' ? "system_message" : "user_message"}>
            {message.user === 'System' && <span>&lArr;</span>}
            {message.message}
            {message.user === 'Artur' && <span>&rArr;</span>}
        </p>
    );
};

export default ModalContent;