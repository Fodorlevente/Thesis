import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoodBadTwoToneIcon from '@material-ui/icons/MoodBadTwoTone';
import MoodTwoToneIcon from '@material-ui/icons/MoodTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  smiley: {
    color: '#A2AB2C',
  },
});


export default function NicoNicoTable(props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [niconicos, setNicoNicos] = React.useState([]);

  useEffect(() => {
    fetch(`/api/niconicos/?teamId=${props.userData.teamId}&startDate=${props.startDate}&endDate=${props.endDate}`)
      .then(response => response.json())
      .then(data => {
          filterNiconicosForTeam(data, props.userData.teamId);
      })
      .catch(error => {
          console.log(error)
      })
  }, []);

  function generateTableRows(name,data){
    return(
      Object.keys(data).map(_nicos => (
        <TableRow key={data[_nicos].id}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="left">{data[_nicos].date}</TableCell>
        <TableCell align="left">{addSmiley(data[_nicos].value)}</TableCell>
      </TableRow>
      ))
    )
  }
  
    function addSmiley(value){
      switch(value){
        case("1"): return(<MoodBadTwoToneIcon className={classes.smiley}/>);
        case("3"): return(<FaceTwoToneIcon className={classes.smiley}/>);
        case("5"): return(<MoodTwoToneIcon className={classes.smiley}/>);
      }
    }
  
    function filterNiconicosForTeam(data, _teamId){
      let filtered = data.filter((_user) => {
          return _user.teamId === _teamId;
      })
      setNicoNicos(filtered);
    }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="niconico table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {niconicos.map(_user => (
            generateTableRows(_user.name,_user.NicoNicos)
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}