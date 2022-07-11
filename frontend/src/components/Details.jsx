import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import React from 'react'
import '../styles/details.css'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import itinerariesActions from '../redux/actions/itinerariesActions'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import "../styles/stylesActivities.css"


export default function Details() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [reload, setReload] = useState(false)
    const [edit, setEdit] = useState("")

    const city = useSelector(store => store.citiesReducer.oneCity)
    const oneItinerary = useSelector(store => store.itinerariesReducer.oneItineraryByCity)
    const loginUser = useSelector(store => store.userReducer.user)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const comment = {
            itineraryId: oneItinerary.map(e => e._id),
            comment: edit
        }
        let res = await dispatch(itinerariesActions.addComment(comment))
        setReload(!reload)
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        let res = await dispatch(itinerariesActions.deleteComment(event.target.id))
        setReload(!reload)
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }
    }

    async function modifyComments(event) {
        event.preventDefault()
        const commentData = {
            commentId: event.target.id,
            comment: edit,
        }
        let res = await dispatch(itinerariesActions.modifyComment(commentData))
        setReload(!reload)
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        setEdit(event.target.value)
    }


    useEffect(() => {
        dispatch(citiesActions.getOneCity(id))
        getItinerary()
        //eslint-disable-next-line
    }, [reload, id])

    async function getItinerary() {
        await dispatch(itinerariesActions.getOneItineraryByCity(id))
    }

    async function likeOrDislikes(event) {
        let res = await dispatch(itinerariesActions.likeDislike(event.target.id))
        setReload(!reload)
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }
    }

    return (

        <div className="cardDetailsContainer" key="Details">
            <div className="cityImage" style={{ backgroundImage: `url(${city.image})` }}>
                <h2>{city.name}</h2>
            </div>
            <div className="containerItineraries"><h3 className="subTitle">Itineraries</h3></div>
            {oneItinerary.length > 0 ? (
                oneItinerary.map((tinerary, index) =>
                    <div className='itineraryCard' key={index}>
                        <h4 className="itineraryTitle">{tinerary.itinerary}</h4>
                        <div className="containerAvatar"> <img className="avatarImg" src={tinerary.author.authorimg} alt="avatar" />
                            <h5> {tinerary.author.name}</h5></div>
                        <div className="containerPriceAndDuration"><p className='price'>Price: {tinerary.price}</p>
                            <p className='price'>Duration: {tinerary.duration} hours</p>
                        </div>
                        <div className="likeDislike">
                            {loginUser?.success ?
                                (<div >  {tinerary?.likes.includes(loginUser?.user.id) ?
                                    <span onClick={likeOrDislikes} id={tinerary?._id} style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite</span> :
                                    <span onClick={likeOrDislikes} id={tinerary?._id} style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite_border</span>}</div>)

                                : (<span style={{ fontSize: 30 }} className="material-icons">favorite_border</span>)}

                            <div className="likeDislike">
                                <Typography>{tinerary.likes.length}</Typography>
                            </div>
                            <Typography>{tinerary.hashtags}</Typography>
                        </div>

                        <Accordion>
                            <AccordionSummary className="accordionClass"
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="seeMore">See More</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="containerActivity">
                                    {tinerary.activities.map((c,e) =>

                                        <img src={c.actPhoto} alt="activity" key={e} />)}

                                </div>
                                < div className="containerCom" style={{ padding: 14 }}>
                                    <h3>Comments</h3>

                                    {tinerary.comments.map((com,f )=>
                                        <Paper className="commentBox" style={{ padding: "40px 20px" }} key={f}>
                                            <Grid className="containerBoxComment" container wrap="nowrap"  spacing={1}>
                                                <Grid item>
                                                    <Avatar alt="Remy Sharp" src={com?.userId.photoUser} style={{ margin: 10 }} />
                                                    <p>{com?.userId.firstName}</p>
                                                </Grid>
                                                <Grid item xs zeroMinWidth>
                                                { //eslint-disable-next-line
                                                    loginUser.user?.id ===  com.userId?._id  ? 
                                                    (<p onInput={(event) => setEdit(event.currentTarget.textContent)} contentEditable suppressContentEditableWarning>{com.comment}</p>) :

                                                    (<p onInput={(event) => setEdit(event.currentTarget.textContent)}>{com.comment}</p>)}
                                                    { //eslint-disable-next-line
                                                    loginUser.user?.id ===  com.userId?._id  ? (
                                                            <>
                                                                <span id={com._id} onClick={handleDelete} type="submit" className="material-symbols-outlined">
                                                                    delete_sweep
                                                                </span>
                                                                <span id={com._id} onClick={modifyComments} type="submit" className="material-symbols-outlined">
                                                                    edit
                                                                </span></>) : (null)}
                                                </Grid>
                                            </Grid>
                                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                                        </Paper>)}
                                </div>



                        
                                <div className="flex bg-gray-800 justify-center items-center">

                                    <div className="w-full bg-white p-2 pt-4 rounded shadow-lg">
                                                                             {tinerary.activities.length !== 0 ?
                                            (<form key="formKey">
                                                <div className="mt-3 p-3 w-full">
                                                    <textarea onChange={handleEdit} rows="3" className="border p-2 rounded w-full" placeholder="Write something..."></textarea>
                                                </div>
                                                <div><button onClick={handleSubmit} type='submit' className="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700">Submit</button></div>
                                            </form>) : (true)}
                                        <div className="flex justify-between mx-3">
                                        </div>
                                    </div>
                                </div>

                            </AccordionDetails>
                        </Accordion>
                    </div>

                )) : (<p className='NoItinerariesToShow'>No itineraries to show yet</p>)
            }
            <div key="linkR" className="backButton"><LinkRouter to='/cities'> <button className='backB'>Back To Cities</button></LinkRouter></div>
        </div >
    )
}
