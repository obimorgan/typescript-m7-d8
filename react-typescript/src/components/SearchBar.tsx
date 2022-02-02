
import { ChangeEvent, useEffect, useState } from "react"
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap"
import {Link } from 'react-router-dom'

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

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("")
    const [searchResult, setSearchResult] = useState<SearchResult[]>([])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    const fetchData = async () => {
        try {
            let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchInput}`)
            if (response.ok) {
                let tracks = await response.json()
                console.log(tracks)
                setSearchResult(tracks.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [searchInput])
    return (
        <Container>
            <Row>
                <Col className="mt-5 mb-2">
                    <Form >
                        <Form.Group controlId="formBasicEmail">
                            <h3>Search tracks</h3>
                            <Form.Control
                                type="text"
                                placeholder="Search tracks"
                                value={searchInput}
                                onChange={handleInput}
                            />
                            <Form.Text className="text-muted">
                           Goodluck with your search
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                {searchResult.slice(0, 6).map(result => (
                    <Col className="my-1 mx-1">
                        <Link to={`/trackdetail/${result.id}`}>
                        <Card key={result.id}border="danger" style={{ width: '18rem' }}>
                            <Card.Header>{result.title }</Card.Header>
                            <Card.Body>
                            <Card.Title>{result.artist.name}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk
                                of the card's content.
                                </Card.Text>
                                <img src={result.artist.picture_medium} alt="img" />
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default SearchBar
