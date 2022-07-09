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
import 'react-toastify/dist/ReactToastify.css';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";


export default function Details() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [reload, setReload] = useState(false)
    const [edit, setEdit] = useState("")

    const city = useSelector(store => store.citiesReducer.oneCity)
    const oneItinerary = useSelector(store => store.itinerariesReducer.oneItineraryByCity)
    const loginUser = useSelector(store => store.userReducer.user)

    console.log(oneItinerary)


    const handleSubmit = async (event) => {
        event.preventDefault()
        const comment = {
            itineraryId: oneItinerary.map(e => e._id),
            comment: edit
        }
        await dispatch(itinerariesActions.addComment(comment))
        setReload(!reload)
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        await dispatch(itinerariesActions.deleteComment(event.target.id))
        setReload(!reload)
    }

    async function modifyComments(event) {
        const commentData = {
            commentID: event.target.id,
            comment: edit,
        }
        console.log(edit)
        await dispatch(itinerariesActions.modifyComment(commentData))
        setReload(!reload)
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
        await dispatch(itinerariesActions.likeDislike(event.target.id))
        setReload(!reload)
    }


    return (
        <>
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
                                {loginUser.success ?
                                    (<div >  {tinerary?.likes.includes(loginUser?.user.id) ?
                                        <span onClick={likeOrDislikes} id={tinerary?._id} style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite</span> :
                                        <span onClick={likeOrDislikes} id={tinerary?._id} style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite_border</span>}</div>)

                                    : (<span style={{ fontSize: 30 }} className="material-icons">favorite_border</span>)}

                                <div class="likeDislike">
                                    <p>{tinerary.likes.length}</p>

                                </div>
                                <p>{tinerary.hashtags}</p>
                            </div>
                            <>
                                <Accordion>
                                    <AccordionSummary className="accordionClass"
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className="seeMore">See More</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="seeMore">

                                            {tinerary.activities.map(act => <><p>{act.activity}</p>
                                                <img src={act.actPhoto} alt="img" /></>
                                            )}
                                        </Typography>
                                        <div style={{ padding: 14 }} className="App">
                                            <h3>Comments</h3>
                                            {tinerary.comments.map(com =>
                                                <Paper style={{ padding: "40px 20px" }}>
                                                    <Grid container wrap="nowrap" spacing={2}>
                                                        <Grid item>
                                                            <Avatar alt="Remy Sharp" src={""} />
                                                        </Grid>
                                                        <Grid justifyContent="left" item xs zeroMinWidth>
                                                            <h4 style={{ margin: 0, textAlign: "left" }}>{""}</h4>
                                                            <p id={com._id}> {com.comment}</p>
                                                            <span id={com?._id} onClick={handleDelete} type="submit" class="material-symbols-outlined">
                                                                delete_sweep
                                                            </span>
                                                            <span id={com?._id} onClick={modifyComments} class="material-symbols-outlined">
                                                                edit
                                                            </span>


                                                        </Grid>
                                                    </Grid>
                                                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                                                </Paper>)}


                                        </div>

                                        <div class="flex bg-gray-800 justify-center items-center">

                                            <div class="w-full bg-white p-2 pt-4 rounded shadow-lg">
                                                <div class="flex ml-3">
                                                    <div class="mr-3">
                                                        {/* <img src={loginUser?.user.photoUser} alt="" class="rounded-full" /> */}

                                                    </div>
                                                    <div>
                                                        <h1 class="font-semibold">Itay Buyoy</h1>
                                                    </div>

                                                </div>
                                                <form>
                                                    <div class="mt-3 p-3 w-full">
                                                        <textarea onChange={handleEdit} rows="3" class="border p-2 rounded w-full" placeholder="Write something..."></textarea>
                                                    </div>
                                                    <div><button onClick={handleSubmit} type='submit' class="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700">Submit</button></div>                                                </form>
                                                <div class="flex justify-between mx-3">
                                                </div>
                                            </div>
                                        </div>

                                    </AccordionDetails>
                                </Accordion>
                            </>
                        </div>

                    )) : (<p className='NoItinerariesToShow'>No itineraries to show yet</p>)
                }
                <div className="backButton"><LinkRouter to='/cities'> <button className='backB'>Back To Cities</button></LinkRouter></div>
            </div >
        </>
    )
}
