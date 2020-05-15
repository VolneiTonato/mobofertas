import React, { Fragment } from 'react'
import AppBarContato from './app-bar'
import { Box, Grid, Typography, Paper, makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Logo from '../../mobofertas.png'



const useStyles = makeStyles((theme) => ({
    Paper: {
        padding: 10
    }
}))

const Contato = (props) => {
    const classes = useStyles()

    return (
        <Fragment>
            <AppBarContato {...props} />

            <Box component="div" xs={12} marginTop={20}></Box>

            <Grid container justify="center" spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.Paper} variant="elevation" elevation={3}>
                        <Box><img style={{ maxWidth: '100%', width: 'auto', height: 'auto', maxHeight: '400px' }} src={Logo} alt="" /></Box>
                    </Paper>
                </Grid>

                <Grid item xs={10} sm={4}>

                    <Box textAlign="center" marginTop={2}>
                        <Typography variant="body1" component="p" color="primary" style={{fontWeight:"bold"}}>
                            {`Achou interessante para o seu estabelecimento? Entre em contato agora mesmo pelo número de telefone abaixo :)`}
                        </Typography>
                    </Box>



                    <Box textAlign="center" marginTop={2} color="success.main">

                        <Typography display="inline" variant="subtitle1" component="p" style={{fontWeight:"bold"}}>
                            <FontAwesomeIcon icon={faWhatsapp} />
                            <Box component="span" paddingRight={2} />
                            <Box target="_blank" color="success.main" component="a" href={"https://api.whatsapp.com/send?phone=5554991519686&text=Olá! Gostaria saber como enviar os meus produtos para o MOB Ofertas!"}>
                                (54) 9 9151-9686
                            </Box>
                        </Typography>
                    </Box>

                    <Box marginTop={2} textAlign="center">
                        <Typography variant="subtitle1" component="p" color="initial" style={{fontWeight:"bold"}}>
                            {`Bento Gonçalves`}
                        </Typography>
                    </Box>

                </Grid>
            </Grid>




        </Fragment>

    )
}

export default Contato