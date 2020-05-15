import { createMuiTheme } from '@material-ui/core'
import * as colors from '@material-ui/core/colors';


const theme = createMuiTheme({

    overrides: {
        MuiToolbar:{
            root: {backgroundColor: colors.blue[900]}
        },
        MuiBottomNavigation: {
            root: {
                backgroundColor: colors.blue[900]
            }
        },

        MuiBottomNavigationAction: {
            root: {
                color: '#999',
                '&$selected': {
                    color: '#FFF'
                },
                '&:hover': {
                    color: '#FFF'
                }
            }


        },
        /*
        MuiTextField: {
            root: {
                '& label.Mui-focused': {
                    color: 'transparent',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'transparent',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                        borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'transparent',
                    },
                }
            }

        }*/
    }

})

export default theme