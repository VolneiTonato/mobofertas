import React, { Fragment, useState, useEffect } from 'react'
import AppBarSettings from './app-bar'
import { Box, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, makeStyles, Divider, NativeSelect, FormControl, InputLabel, FormHelperText } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}))

const Settings = (props) => {


    const [state, setState] = useState({
        age:'',
        name:'hai'
    })

    const classes = useStyles()

    const handleChange = (event) => {
        const name = event.target.name
        
        setState({
            ...state, [name] : event.target.value
        })
    }

    return (
        <Fragment>
            <AppBarSettings {...props} />

            <Box component="div" xs={12} marginTop={14}></Box>

            <Grid container>
                <Grid item xs={12}>
                    <List className={classes.list}>
                        <ListItem button>
                            <ListItemText primary={
                                <Box component="span"></Box>
                            }>

                            </ListItemText>
                            <ListItemSecondaryAction>

                                <FormControl className={classes.formControl}>
                                    <NativeSelect
                                        value={state.age}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-native-helper',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={10}>Ten</option>
                                        <option value={20}>Twenty</option>
                                        <option value={30}>Thirty</option>
                                    </NativeSelect>
                                </FormControl>

                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>
                </Grid>
            </Grid>

        </Fragment>

    )
}

export default Settings