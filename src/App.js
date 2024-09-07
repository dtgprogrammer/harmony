import './App.css';
import Recommend from './Recommend';
import SearchIcon from '@mui/icons-material/Search';
import { Icon, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function App() {
  return (
    <div className="App">

      <div className='sidebar'>

        <div className="Icon"style={{ backgroundColor: "#CD5151", borderRadius: "50%", margin: '10px', marginBottom: '50px' }}>
          <IconButton sx={{ color: 'black' }}>
            <MusicNoteIcon />
          </IconButton>
        </div>

        <div className='Home' style={{ borderRadius:'10px 0 0 10px',marginLeft:'11px',marginBottom:'25px',paddingRight:'11px' }}>
          <IconButton>
            <HomeIcon sx={{ color: 'white' }} />
          </IconButton>
        </div>
        <IconButton style={{marginBottom:'10px'}}>
          <SearchIcon sx={{ color: 'white' }} />
        </IconButton>

        <IconButton style={{marginBottom:'15px'}}>
          <FavoriteIcon sx={{ color: 'white' }} />
        </IconButton>

        <IconButton sx={{ color: 'white' }} style={{marginBottom:'15px'}}>
          <MicIcon />
        </IconButton>


        <IconButton sx={{ color: 'white' }} style={{marginBottom:'15px'}}>
          <ArrowDownwardIcon />
        </IconButton>

        <IconButton style={{marginBottom:'15px'}}>
          <AddIcon sx={{ color: 'white' }} />
        </IconButton>

        <IconButton sx={{ color: 'white' }} style={{marginBottom:'15px'}}>
          <SortIcon />
        </IconButton>

      </div>

      <div className='recommend'>
        <Recommend />
      </div>

    </div>
  );
}

export default App;
