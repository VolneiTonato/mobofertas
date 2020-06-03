import React, { Fragment, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faMapMarked} from '@fortawesome/free-solid-svg-icons'
import { Box, Typography, Divider, List, ListItem, ListItemText, Link , Button} from '@material-ui/core'
import { camelCase } from 'lodash'
import {ModalImage} from '../../../../Components/ModalImage'
import {useSelector} from 'react-redux'


const Loja = (props) => {

    const {StateEstabelecimentoSelected:state} = useSelector(state => state)


    const modal = useRef()


    return (

        <Fragment>


            <List>
                <ListItem>
                    <ListItemText>
                        <Box textAlign="center" component="div">
                            <Typography align="center" variant="h6" component="div" color="error">
                                {state.item.nome}
                            </Typography>
                        </Box>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start">

                    <ListItemText >
                        <Box>
                            <Typography variant="subtitle1" component="div" color="primary">
                                <Box component="div"><strong>Logradouro: </strong>{`${state.item.endereco.logradouro}`}</Box>
                                <Box component="div"><strong>Nº: </strong>{`${state.item.endereco.numero}`}</Box>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" component="div" color="primary">
                                <Box component="div"><strong>Bairro: </strong>{`${state.item.endereco.bairro}`}</Box>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" component="div" color="primary">
                                <Box component="div"><strong>Município: </strong>{`${camelCase(state.item.endereco.municipio.descricao)}/${state.item.endereco.municipio.estado.uf}`}</Box>
                            </Typography>
                        </Box>

                    </ListItemText>


                </ListItem>

                <Divider />

                <ListItem>
                    <ListItemText>
                        <Box textAlign="length" component="div">
                            <Fragment>
                                {state.item.telefones?.length > 0 ? (
                                    <Fragment>
                                        {state.item.telefones.map(telefone =>
                                            <Box component="div" key={telefone._id}>
                                                <Box component="span" paddingRight={1}>
                                                    <FontAwesomeIcon color="green" size="2x" icon={faWhatsapp} />
                                                </Box>
                                                <Box fontSize={20} component="span" paddingRight={1}>

                                                    <Link color="textSecondary" component="a" href={"https://api.whatsapp.com/send?phone=5554991519686&text=Olá! Gostaria saber como enviar os meus produtos para o MOB Ofertas!"} target="_blank">
                                                        {telefone.numero}
                                                    </Link>
                                                </Box>
                                                <Box component="span">
                                                    {telefone?.tipo}
                                                </Box>
                                            </Box>
                                        )}
                                    </Fragment>

                                ) : null}

                            </Fragment>

                        </Box>
                    </ListItemText>
                </ListItem>

                <Divider />

                <ListItem>

                    <ListItemText>
                        <Box alignContent="center" xs="5" textAlign="center" component="div">
                            <img onClick={e => modal.current.handlerOnOpen()} style={{maxWidth: '100%', width: 'auto', height: 'auto', maxHeight:'400px'}} src={`${process.env.REACT_APP_IMAGENS_ESTABELECIMENTOS}/${state.item.endereco.imagem}`} alt="" />
                        </Box>
                    </ListItemText>

                </ListItem>

                <ListItem>
                    <ListItemText>
                        <Box component="div" textAlign="center">
                        <Button target="_blank" href={state.item.endereco.linkMaps} startIcon={<FontAwesomeIcon icon={faMapMarked} />}>Visualizar Mapa</Button>
                        </Box>
                    </ListItemText>
                </ListItem>


            </List>


            <ModalImage fullScreen={true} image={`${process.env.REACT_APP_IMAGENS_ESTABELECIMENTOS}/${state.item.endereco.imagem}`} ref={modal} />

        </Fragment>

    )
}


export default Loja