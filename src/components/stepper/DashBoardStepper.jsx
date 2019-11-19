import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Profile', 'Team', 'IdeaBox', 'RetroSpective', 'Planning', 'Metrics', 'Message Board'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
        return `In this section you can check the datas of your profile, and you can set you as a Scrum Master of a team, if you ara a member of one.`;
    case 1:
        return 'You can create a team easily. Join or leave the team what you selected.';
    case 2:
        return `In this section you can see all the ideas in the company which contains the description of the idea and the responsible.
                Anyone can create delete or set to completed an idea.`;
    case 3:
        return `If you a member of a team, you can create issues on the selected retrospective room of your team. There are
                three section for it: ( Worked well, To be improved, Want to do in next sprint).`;
    case 4:
        return `TODO.`;
    case 5:
        return `In the Metrics page you can set your daily mood which is visile for the whole team. The scrum master is responsible for checkint theese metrics.
                You can create and set knowledges in this section for getting a knowledge matrix for visualizing the knowledge of the team.`; 
    case 6:
        return `If you are a member of a team, you can send messages for the team.`;      
    default:
      return 'Unknown step';
  }
}

export default function DashBoardStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next Section'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed!</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset Stepps
          </Button>
        </Paper>
      )}
    </div>
  );
}