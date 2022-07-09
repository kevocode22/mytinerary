//importo de librerias externas
import React, {useEffect, useState} from 'react'
import {Box, Typography} from '@mui/material'
import {Link as LinkRouter} from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

//importo los estilos
import '../styles/styles.css'

//importo acciones de redux
import {connect} from 'react-redux'
import tineraryActions from '../redux/actions/tineraryActions'

//se llama en display
//llega como props: tinDat (datos de los itinerarios) y user
function Comments(props) {
    const [comments,setComments] = useState([]) //para guardar los comentarios de la BD
    const [inputText,setInputText] = useState("") //para guardar los comentarios nuevos
    const [modifyCom,setModifyCom] = useState("") //para guardar los comentarios modificados
    const [reload,setReload] = useState(false) //para "recargar" la pagina
    const [newButton,setNewButton] = useState(false) //para prender/apagar el button del comentario a modificar

    useEffect(() => {
        props.oneTinerary(props.tinDat._id)
            .then(response => setComments(response.comments))
            /* .then(console.log(comments)) */
    }, [reload])

    async function toAdd(event) {
        const commentData = {
            tinId: props.tinDat._id,
            comments: {
                comment: inputText,
                userId: props.user.id
            }
        }
        await props.addComment(commentData)
        setInputText("")
        setReload(!reload)
    }
    
    async function toModify(event) {
        const commentData = {
            commentId: event.target.id,
            comments: {
                comment: modifyCom,
                userId: props.user.id
            }
        }
        await props.modifyComment(commentData)
        setNewButton(false)
        setReload(!reload)
    }

    function toChangeInputs(event) {
        setNewButton(true)
    }
    
    async function toDelete(event) {
        await props.deleteComment(event.target.id)
        setReload(!reload)
    }

    return (
        <>
            {comments?.map((comment) =>
                (props.user ?
                    (props.user.id !== comment.userId._id ? 
                        <Box key={comment._id} sx={{margin: '16px', padding: '8px',  display: 'flex', color: 'white', backgroundColor: 'rgb(0, 73, 48)'}}>
                            <div className='divImgComment'>
                                <img className="onlyimgComment" alt={comment.userId.name} src={comment.userId.userPhoto} />
                            </div>
                            <Box sx={{paddingLeft: '8px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Typography variant='subtitle1' sx={{width: '100%', padding: '8px', paddingTop: '0'}} className='fredokaFont smallT'>{comment.userId.email}</Typography>
                                <Typography variant="subtitle2" sx={{width: '100%', display: 'flex', padding: '8px',  color: 'black', backgroundColor: 'rgb(126, 196, 165)'}} className='fredokaFont'>{comment.comment}</Typography>
                            </Box>
                        </Box> :
                        <Box key={comment._id} sx={{margin: '16px', padding: '8px',  display: 'flex', color: 'white', backgroundColor: 'rgb(74, 140, 111)'}}>
                            <div className='divImgComment'>
                                <img className="onlyimgComment" alt={comment.userId.name} src={comment.userId.userPhoto} />
                            </div>
                            <Box sx={{paddingLeft: '8px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Typography variant='h6' sx={{width: '100%', color: 'white'}} className='fredokaFont smallT'>{comment.userId.email}</Typography>
                                <Box sx={{width: '100%', display: 'flex', paddingTop: '8px', paddingLeft: '0'}}>
                                    {newButton ? 
                                    <>
                                        <textarea rows='2' onChange={(event) => setModifyCom(event.target.value)} defaultValue={comment.comment} className='myInputforComment fredokaFont' />
                                        <EditIcon id={comment._id} onClick={toModify} sx={{bgcolor: 'rgb(196, 165, 126)', '&:hover': {bgcolor: 'rgba(196, 165, 126, 0.7)'}, padding: '5px', margin: '5px', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}} />
                                    </> : <>
                                        <textarea rows='2' disabled onChange={(event) => setModifyCom(event.target.value)} defaultValue={comment.comment} className='myInputforComment fredokaFont' />
                                        <EditIcon id={comment._id} onClick={toChangeInputs} sx={{bgcolor: 'rgb(196, 165, 126)', '&:hover': {bgcolor: 'rgba(196, 165, 126, 0.7)'}, padding: '5px', margin: '5px', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}} />
                                    </>
                                    }
                                    <DeleteIcon id={comment._id} onClick={toDelete} sx={{bgcolor: 'rgb(196, 165, 126)', '&:hover': {bgcolor: 'rgba(196, 165, 126, 0.7)'}, padding: '5px', marginTop: '5px', marginBottom: '5px', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}} />
                                </Box>
                            </Box>
                        </Box>
                    ) : 
                    (
                        <Box key={comment._id} sx={{margin: '16px', padding: '8px',  display: 'flex', color: 'white', backgroundColor: 'rgb(0, 73, 48)'}}>
                            <div className='divImgComment'>
                                <img className="onlyimgComment" alt={comment.userId.name} src={comment.userId.userPhoto} />
                            </div>
                            <Box sx={{paddingLeft: '8px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Typography variant='h6' sx={{width: '100%', padding: '8px', paddingTop: '0'}} className='fredokaFont smallT'>{comment.userId.email}</Typography>
                                <Typography variant="subtitle2" sx={{width: '100%', display: 'flex', padding: '8px',  color: 'black', backgroundColor: 'rgb(126, 196, 165)'}} className='fredokaFont'>{comment.comment}</Typography>
                            </Box>
                        </Box> 
                    )
                )
            )}
            {props.user ?
                (<Box sx={{margin: '16px', padding: '8px', display: 'flex', color: 'white', backgroundColor: 'rgb(74, 140, 111)'}}>
                    <div className='divImgComment2'>
                        <img className="onlyimgComment2" alt={props.user.name} src={props.user.userPhoto} />
                    </div>
                    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Box sx={{width: '100%', display: 'flex', paddingLeft: '8px', paddingRigth: '8px'}}>
                            <textarea rows='2' onChange={(event) => setInputText(event.target.value)} value={inputText} className='myInputforComment fredokaFont' />
                            <AddIcon onClick={toAdd} sx={{bgcolor: 'rgb(196, 165, 126)', '&:hover': {bgcolor: 'rgba(196, 165, 126, 0.7)'}, padding: '5px', margin: '5px', marginRigth: '0', color: 'white', width: '30px', height: '30px', borderRadius: '15px'}} />
                        </Box>
                    </Box>
                </Box>
                ) : (
                    <LinkRouter to={'/login'} className='anchor festiveFont violetShadows'>log in to add a comment!</LinkRouter>
                )
            }
        </>
    )
}

const mapDispatchToProps = {
    addComment: tineraryActions.addComment,
    modifyComment: tineraryActions.modifyComment,
    deleteComment: tineraryActions.deleteComment,
    oneTinerary: tineraryActions.oneTinerary
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments)