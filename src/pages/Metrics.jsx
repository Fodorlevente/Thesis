import React, { useContext, useState } from "react";
import UserProvider from "../contexts/UserProvider";
import CompetencyProvider from "../contexts/CompetencyProvider";
import _ from "lodash";
import Smiley from "../components/inputs/Smiley";
import NicoNicoTable from "../components/displays/NicoNicoTable";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CompetencyInputField from '../components/inputs/CompetencyInputField';
import CompetencyTable from "../components/displays/CompetencyTable";
import SliderContainer from "../components/displays/SliderConatiner";
import ChartDisplay from "../components/displays/ChartDisplay";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Metrics = () => {
    const userData = useContext(UserProvider.context);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    function postNicoNico(event, _value) {
        fetch('/api/addNicoNico', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userData.id,
              value: _value
            }),
          }).then(response =>{
            console.log("NicoNico added!");
          });
    }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

    return (
        <div className="page">
            <CompetencyProvider >
                    <AppBar position="static" color="default">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                        <Tab label="Nico Nico" {...a11yProps(0)} />
                        <Tab label="Competencies" {...a11yProps(1)} />
                        <Tab label="Competency Matrix" {...a11yProps(2)} />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction}>
                          <Grid container spacing={3} style={{marginTop: 40}} container spacing={0} direction="column"  alignItems="center" justify="center">
                              <h1 style={{display: 'flex', justifyContent: 'center'}}>What is your mood today?</h1>
                              <Grid item xs={10} container spacing={0} direction="column"  alignItems="center" justify="center">
                                <Smiley postNicoNico={postNicoNico}/>
                              </Grid>
                            </Grid>
                            <NicoNicoTable startDate={startDate} endDate={endDate} userData={userData}/>
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        {userData.rank==="Scrum Master" ? 
                          <div>
                            <CompetencyInputField />
                            <CompetencyTable teamId={userData.teamId}/>
                          </div>
                          :
                          <h1 style={{color: "red"}}>This section is available for Scrum Masters</h1>
                        }
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                          <SliderContainer userData={userData} />
                          <ChartDisplay teamId={userData.teamId} />
                      </TabPanel>
                    </SwipeableViews>
            </CompetencyProvider>
        </div>
    );
};

export default Metrics;