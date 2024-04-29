import React, { useState, useEffect } from 'react';
import * as xwingUtils from '../data/xwing_utils';
import * as xwingData from '../data/xwing_data';
import { useModalSetter } from '../contexts/ModalContext';
import PrintSquadModal from './modals/PrintSquadModal';



interface SquadNamePointsPrintProps {
    onSquadNameChanged: (newName: string) => void;
    squadName: string;
    squad: xwingUtils.SelectedPilot[];
    faction: xwingData.Faction;
}

const SquadNamePointsPrint: React.FC<SquadNamePointsPrintProps> = (props) => {
    const [editingSquadName, setEditingSquadName] = useState(false);
    const setModal = useModalSetter();

    // allows clicking outside the edit name textbox to end editing
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!(event.target.className === 'editSquadName')) {
                console.log("done editing squad!");
                setEditingSquadName(false);
            }
        };

        if (editingSquadName) {
            window.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [editingSquadName]); // Dependency on editingSquadName ensures the listener is managed correctly

    const editSquadClicked = () => {
        setEditingSquadName(true);
    }

    const handleNameChange = (event) => {
        props.onSquadNameChanged(event.target.value);
    }

    const onSquadNameEditKeyDown = (event) => {
        if(event.keyCode == 13) { //they pressed "enter"
            setEditingSquadName(false);
        }
    }

    const showPrintModal = () => {
        setModal({ 
            title: `${props.faction} Squadron (${xwingUtils.getSquadCost(props.squad, xwingData.upgrades)})`, 
            children: <PrintSquadModal squad={props.squad} /> 
        });
    }

    return <div className="squad-name-and-points-row">
        <div>
            { editingSquadName  
                ? <input className='editSquadName' autoFocus={true} type='text' value={props.squadName} onChange={handleNameChange} onKeyDown={onSquadNameEditKeyDown}
                    style={{fontSize:"1.2rem"}}/> 
                : <h2 style={{display: 'inline'}}>{props.squadName}</h2>} 
            <i className="far fa-edit" style={{marginLeft: "5px", fontSize: "1.2rem"}} onClick={editSquadClicked}></i>
        </div>
        <div className="points-display-container">
            <span>Points: { xwingUtils.getSquadCost(props.squad, xwingData.upgrades) }/200 ({200-xwingUtils.getSquadCost(props.squad, xwingData.upgrades)} left)</span>
        </div>
        <div className='printBtn'>
            <button className="btn-info" style={{margin:"5px"}} onClick={showPrintModal}>Print</button>
        </div>
    </div>
}

export default SquadNamePointsPrint;