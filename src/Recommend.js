import "./Recommend.css";
import { Song } from "./Song.js";
import axios from "axios";
import { useEffect, useState } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import './Queue.css';
import Upload from "./Upload.js";

function Recommend() {
    // const axios=require('axios');
    const [songs, setSongs] = useState([]);
    const [filter, setFilter] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        axios.get("http://localhost:3001/fetchData").then(res => {
            setSongs(res.data);
        });
    }, []);


    useEffect(() => {
        setFilter(songs);

        const filtered = songs.filter((song) => {
            return song.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilter(filtered);

    }, [searchQuery, songs])


    const searchResults = (e) => {
        setSearchQuery(e.target.value);
    }

    const [songLink, setSongLink] = useState("");
    const [last, setLast] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [current, setCurrent] = useState(["Song", "Artist", "https://t4.ftcdn.net/jpg/03/93/23/51/360_F_393235111_ygEWm52rXjI72T7pyJUOcsDRvf8rY3ON.jpg"]);

    useEffect(() => {
        const song = new Audio(songLink);

        if (isPlaying) {
            song.play();
        }
        else if (last !== songLink && last !== "") (
            setIsPlaying(true)
        )
        else {
            song.pause();
        }

        return () => {
            song.pause();
        };
    }, [isPlaying, songLink]);




    return (
        <div className="main">

            <div className="search">
                <input type="text" placeholder="Search here for songs" value={searchQuery} onChange={searchResults}></input>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '1.7%' }}>
                    <h1>Recommendation for you</h1>
                    <h3 style={{ color: '#DE631F', fontFamily: 'arial', fontWeight: '100', fontSize: '15px' }}>See all</h3>
                </div>
                <div className="choice" style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1.7%', paddingLeft: '10px', paddingRight: '200px' }}>
                    <button>Popular</button>
                    <button>Songs</button>
                    <button>Artists</button>
                    <button>Album</button>
                    <button>Genre</button>
                </div>
            </div>


            <div className="songs">

                {filter.map((song) => {

                    return (<div style={{ display: "flex", flexDirection: "column" }} onClick={() => {
                        setIsPlaying(!isPlaying);

                        setLast(songLink);

                        setSongLink(song.accessToken);
                        setCurrent([song.name, song.auth, song.image])
                    }}>

                        <Song
                            auth={song.auth}
                            name={song.name}
                            image={song.image}
                            current={current}
                            isPlaying={isPlaying}
                        />
                    </div>)
                })}

            </div>


            <div className="Player">

                <div className="topchart">
                    <h1>Top chart</h1>

                    <div style={{ height: '150px', overflowY: 'scroll' }}>

                        {songs.map((song) => {
                            return (
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{overflow: 'hidden' }}>
                                        <img src={song.image} width='25px' borderRadius= '12.5px' height='25px' alt="songArt" />
                                    </div>
                                    <div style={{ fontSize: "smaller", marginLeft: '15px' }}>
                                        {song.name}<br />
                                        <div style={{ fontSize: '10px', color: '#AAA6A6' }}>{song.auth}</div>
                                    </div>
                                    <div style={{ marginLeft: "auto" }}>
                                        <PlayCircleIcon sx={{ color: '#B65959', background: 'white', borderRadius: '50%' }} />
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="liked">
                    <h1>Liked Songs</h1>
                    <div style={{ display: 'flex', padding: '5px', overflow: 'scroll', maxWidth: '50vw' }}>
                        {songs.map((song) => {
                            return (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px' }}>
                                    <div style={{ padding: '10px' }}>
                                        <div style={{ borderRadius: '50%', width: '60px', height: '60px', overflow: 'hidden' }}>
                                            <img src={song.image} width='60px' height='60px' alt="songArt" />
                                        </div>
                                    </div>
                                    <div style={{ fontSize: "smaller" }}>
                                        {song.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>

            <div className="queue">
                <div className="Q">

                    <div className="topp" style={{ display: "flex" }}>
                        <IconButton sx={{ color: "white", borderRadius: "50%" }}>
                            <ChatIcon />
                        </IconButton>
                        <IconButton sx={{ color: "white", borderRadius: "50%" }}>
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton sx={{ color: "white", borderRadius: "50%" }}>
                            <PersonIcon />
                        </IconButton>
                        <div className="logo">
                            <h1>Harmony</h1>
                        </div>
                    </div>

                    <div className="upl">
                        <Upload />
                    </div>

                    <div className="Lib">
                        <h2>Next on Chillout Playlist</h2>
                        <div className="Library">
                            {songs.map((song) => {
                                return (
                                    <div className="miniList">
                                        <img src={song.image} width={"20%"} height={"20%"} alt="songArt" />
                                        <div style={{ fontSize: "smaller" }}>
                                            {song.name}<br />
                                            {song.auth}
                                        </div>

                                    </div>
                                );
                            })}
                        </div>


                        <div className="nowPlaying">
                            <div className="playimg" style={{ maxHeight: '200px', marginBottom: '20px' }}>
                                <img src={current[2]} width={"100%"} alt="songArt" />
                            </div>

                            <div className="textOverlay" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>{current[0]}</div>
                                <br />
                                <div style={{ marginTop: '-15px' }}>{current[1]}</div>
                                <div>
                                    <IconButton onClick={() => {
                                        if (current.name !== "Song") {
                                            setIsPlaying(!isPlaying)
                                        }
                                    }}
                                    >
                                        {!isPlaying ? <PlayCircleIcon fontSize="large" sx={{ color: "white" }} /> :
                                            <PauseCircleFilledIcon fontSize="large" sx={{ color: "white" }} />}
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Recommend;