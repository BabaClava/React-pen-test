import React, {useState, useEffect} from 'react';
import s from "./StatusBar.module.sass";

const Statusbar = (props) => {
    const [status, setStatus] = useState(props.status);
    const [isEdit, editToggler] = useState(false);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    function editStatusStart () {
        if (props.isOwner) editToggler(true);
        else return;
    }
    function editStatusEnd() {
        editToggler(false)
        props.updateStatus(status);
    }
    function onStatusChange(e) {
        setStatus(e.currentTarget.value);
    }
    function handleSubmit(e) {
        if (e.key === 'Enter') {
            e.currentTarget.blur()
        }
    }
    return ( 
        <>
                {
                    isEdit
                    ? <div>
                        <input type="text" 
                            value={status}
                            autoFocus={true}
                            onBlur={editStatusEnd}
                            onChange={onStatusChange}
                            onKeyPress={handleSubmit}
                        />
                      </div>
                    : <div>
                        <span className={s.statusBar}
                            onDoubleClick={editStatusStart}
                        >{status || '===='}</span>
                      </div>
                }
            </>
     );
}
 
export default Statusbar;