import { createUseStyles } from "react-jss";
import colors from "../../../utils/colors";

export const useStyles = createUseStyles({
    inputContainer: {
        borderRadius: "5px !important",
        backgroundColor: "#f3f3f4",
        transition: "0.3s ease-in",
        borderBottom: (props) => {
            console.log('props', props)
            let flag = props && props.allErrors && props.allErrors[props && props.name];
            return flag ? `3px solid ${colors.red}` : ""
        },
        "&:hover": {
            borderRadius: "5px",
            boxShadow: "0 0 0 4px rgb(66 133 244 / 10%)",
        },
    },
    errorBorderHighlight: {
        transition: "0.3s ease-in",
        bottomBorder: `2px solid red`,
    },
    error: {
        color: colors.errorRed,
        margin: 0,
        padding: 0,
        paddingLeft: '7px'
    },
});