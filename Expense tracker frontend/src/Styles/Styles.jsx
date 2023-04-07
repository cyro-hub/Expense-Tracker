
import Pagination from '@mui/material/Pagination';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';

export const CustomizedPagination = styled(Pagination)`
margin:1em auto;
  button{
    color:#ffffffbf;
    border-color:#ffffffbf;
  }

  button:hover {
    color: #ffffff80;
  }
`;

const CustomizedAppBar = styled('AppBar')`
background-color:transparent;
color:#ffffffbf;
width:100%;
font-family: Ravi Prakash;
`;

const Search = styled('div')`

`;

const StyledInputBase = styled(InputBase)`

`;


export default function SearchAppBar() {
  return (
      <Box sx={{
          flexGrow: 1, width:'100%' }}>
      <CustomizedAppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
          >
            Transactions
          </Typography>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </CustomizedAppBar>
    </Box>
  );
}