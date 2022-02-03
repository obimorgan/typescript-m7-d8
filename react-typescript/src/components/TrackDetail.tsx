import { useEffect, useState } from "react"
import { useParams } from 'react-router'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { Container } from "react-bootstrap"

interface SearchResult {
    duration: number
    id: number
    title: string
    album:{
        title: string
        cover_medium:string
    }
    artist:{
        id: number;
        name: string;
        picture_medium: string;
    }
}
// interface ParamsId {
//     id: String
// }

const TrackDetail = () => {

    // const trackId = parseInt(useParams<ParamsId>().id)
    const  trackId = useParams()
    // const navigate = useNavigate()
    const [searchResult, setSearchResult] = useState < SearchResult | null>(null)

    const fetchTrack = async () => {
        try {
            let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${trackId}`)
            if (response.ok) {
                let track = await response.json()
                console.log(track)
                setSearchResult(track)
            }
        } catch (error) {
            console.log(error)
        }
    }
        
    useEffect(() => {
        fetchTrack()
    }, [])

    return (
        <>
            <Container>
                {/* <Button variant="primary" onClick={() => navigate("/")}
                >Home</Button> */}
                <Jumbotron>
                    <h1>{searchResult?.title}</h1>
                        <img src={searchResult?.artist.picture_medium} alt="img" />
                    <p>{searchResult?.album.title}</p>
                </Jumbotron>
            </Container>
        </>
    )
}

export default TrackDetail