import { Alert, Button, Snackbar } from '@mui/material'
import React from 'react'
import { useFomaularioStorage } from '../../storage'


export function notify(title) {
    const setOpenNotify = useFomaularioStorage.getState().dispatch.setOpenNotify
    setOpenNotify({open: false, title: ''});
    setOpenNotify({open: true, title: title})

}
export default function NotifyComp() {

    const setOpenNotify = useFomaularioStorage.getState().dispatch.setOpenNotify
    const { openNotify } = useFomaularioStorage(state => state.dados)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenNotify({open: false, title: ''});
      };
 

    return (
        <div> 
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                open={openNotify.open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={openNotify.title}
            />
        </div>
    )
}
