import { ButtonBase } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

/**
 * @author Yehonatan <Avrahimi>So the user
 * 
 * tldr;  BACK BUTTON
 */

function BackButton() {
    const navigate = useNavigate();
    return (
        <ButtonBase
            sx={{
                marginTop: '1em',
                marginLeft: '1em',
                position: 'absolute',
                left: '0.2em',
                borderRadius: "50%",
                padding: "0.4em",
                width: "2.5em",
                height: "2.5em",
                zIndex: '2'
            }}
            onClick={() => navigate(-1)}
        >
            <ArrowBack sx={{ cursor: "pointer", width: '1.2em', height: '1.2em' }} />
        </ButtonBase>
    );
}

export default BackButton;
