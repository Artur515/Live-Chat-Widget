import React, {useState} from "react";
import PortalModal from "./components/PortalModal";


const App = () => {
    const [openModal, setOpenModal] = useState(false)


    const handleOpenModal = () => {
        setOpenModal(true)
    }

    return (
        <>
            <button className='open_button' onClick={handleOpenModal}>
                Need help?
            </button>
            <PortalModal
                title={'Live chat'}
                isOpen={openModal}
                setOpenModal={setOpenModal}/>
        </>);
}

export default App;
