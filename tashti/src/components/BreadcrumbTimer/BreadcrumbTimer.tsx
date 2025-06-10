import { Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { BreadProps } from '../../common/types'

function BreadcrumbTimer(props: BreadProps) {
    setInterval(() => props.setOpen(false), 6000)
    return (
        <Snackbar
            dir='rtl'
            open={true}
            autoHideDuration={6000}
            message={props.message}
        // action={action}
        />
    )
}

export default BreadcrumbTimer