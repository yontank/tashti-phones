import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { OwnerStatusFetchProps, Phone } from 'src/common/types';
import Phonecard from '../../components/PhoneCard/Phonecard';
import styles from "./styles.module.css"

function Owner() {
    const { owner } = useParams();
    const [ownerLines, setOwnerLines] = useState<OwnerStatusFetchProps | undefined>(undefined);
    useEffect(() => { window.shaiseAPI.getOwnerLines(parseInt(owner)).then(e => setOwnerLines(e)) }, [])

    if (ownerLines === undefined) return <>Loading</>

    console.log("LINES ARE", ownerLines)

    const lines = ownerLines.Phones
        .map(e => (<Phonecard {...e} />))

    return (
        <div>
            <h1>בעלים: {ownerLines.name}</h1>
            <h3>מיקום: {ownerLines.location}</h3>
            <div className={styles.gridContainer}>
                {lines}
            </div>
        </div>
    )
}

export default Owner    