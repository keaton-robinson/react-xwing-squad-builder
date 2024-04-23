import React, { ReactElement, useState, createContext, useContext }  from 'react';
import ModalContainer from '../components/modals/ModalContainer';

 
interface ModalConfig {
    title: string;
    children: ReactElement
}

const SetModalContext = createContext<(content: ModalConfig) => void | undefined>(undefined);

export const useModalSetter = () => {
    const context = useContext(SetModalContext);
    if (!context) throw new Error('useModal must be used within a ModalProvider');
    return context;
};


const ModalProvider: React.FC<{children}> = (props) => {
    const [modalToShow, setModalToShow] = useState<ReactElement | null>(null);

    const setModal = (modalConfig: ModalConfig) => {
        const newModalToShow = !modalConfig ? null :
            <ModalContainer handleClose={() => setModalToShow(null)} headerTitle={modalConfig.title}>
                {modalConfig.children}
            </ModalContainer>;

        setModalToShow(newModalToShow);
    };

    return <SetModalContext.Provider value={setModal}>
        {props.children}
        { modalToShow  }
    </SetModalContext.Provider>
} 


export default ModalProvider;