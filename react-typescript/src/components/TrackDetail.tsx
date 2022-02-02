import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'

interface SearchResult {
    duration: number
    id: number
    title: string
    album:{
        duration?: string
        id?: number
        title: string
        cover_medium:string
        type?: string
    }
    artist:{
        id: number;
        name: string;
        picture_medium: string;
    }
}

const TrackDetail = () => {

    const params = useParams()
    const [searchResult, setSearchResult] = useState<SearchResult>()

        const fetchData = async () => {
        try {
            let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${params}`)
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
        fetchData()
    }, [])

    return (
        <>
            <Jumbotron>
                <h1>{searchResult?.title}</h1>
                    <img src={searchResult?.artist.picture_medium} alt="img" />
                <p>{searchResult?.album.title}</p>
            </Jumbotron>
        </>
    )
}

export default TrackDetail