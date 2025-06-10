import React from 'react'
import styles from "./styles.module.css"
import { Link } from 'react-router-dom'
import { OwnerStatusFetchProps, Phone } from 'src/common/types'
import { Tooltip } from '@mui/material'
function Phonecard(props: Phone) {
  return (
    <div className={styles.cardContainer} >
      <Link to={"/line/" + props.lineNumber}><h2>{props.lineNumber}</h2></Link>
      <p>סוג קו : {props.lineType}</p>
      <p>מצב : {props.isOccupied ? "תפוס" : "פנוי"}</p>
      <Tooltip title="מימין לשמאל, זגיף זוג בלוק.">
        <p>{props.zakif + " - " + props.block + " - " + props.zug}</p>
      </Tooltip>
    </div>
  )
}

export default Phonecard