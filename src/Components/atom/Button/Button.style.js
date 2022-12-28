import { createUseStyles } from 'react-jss';
import Colors from '../../../utils/colors';


export const useStyles = createUseStyles({
    buttonContainer: {
        width: '100%',
        outline: 'none',
        height: '54px',
        fontSize: '1rem',
        marginTop: '15px',
        backgroundColor: (props) => {
            console.log('css props: ', props);
            if (props.inverted) return 'white';
            if (props.disabled) return Colors.disabled;
            if (props.children === 'Join Now') return Colors.CUSTOM_SECONDARY_COLOR;
            return (props.color || Colors.CUSTOM_SECONDARY_COLOR);
        },
        color: (props) => {
            if (props.disabled) return Colors.disabledText;
            if (props.inverted) return (props.color || Colors.CUSTOM_SECONDARY_COLOR);
            return 'white';
        },
        border: (props) => (props.inverted ? `2px solid ${props.color || Colors.CUSTOM_SECONDARY_COLOR}` : 'none'),
        borderRadius: '60px',
        '&:hover': {
            filter: (props) => (props.inverted || props.disabled ? 'none' : 'brightness(90%)')
        },
        '&:focus': {
            outline: 'none',
        },
        '@media (min-width: 960px)': {
            maxWidth: '200px',
        }
    },
})