import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SignUp1 from '../SU1/SU1'
import SignUp2 from '../SU2/SU2'
import SignUp3 from '../SU3/SU3'
import SignUp4 from '../SU4/SU4'
import SignUp5 from '../SignUpSubmit/SignUpSubmit'
import Header from '../Header/Header'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return [
        'Basic Info',
        'Open Hours',
        'Guests Accepted',
        'Assign tags'
    ];
}

export default function HorizontalLinearStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = step => {
        // return step === 1;
        return false;
    };

    const isStepSkipped = step => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <SignUp1 handleNext={handleNext} />;
            case 1:
                return <SignUp2 handleNext={handleNext} handleBack={handleBack} />;
            case 2:
                return <SignUp3 handleNext={handleNext} handleBack={handleBack} />;
            case 3:
                return <SignUp4 handleNext={handleNext} handleBack={handleBack} />;
            default:
                return 'Unknown step';
        }
    }

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Header
                value1={1}
                value2={2}
                value3={3}
                value4={4}
                value5={'Review'}
                color1={'grey'}
            />
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <SignUp5 handleBack={handleBack} goHome={() => props.history.push('/home')}/>
                        {/* <Button onClick={handleReset} className={classes.button}>
                            Reset
            </Button> */}
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            {/* <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
              </Button>
                                {isStepOptional(activeStep) && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSkip}
                                        className={classes.button}
                                    >
                                        Skip
                </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div> */}
                        </div>
                    )}
            </div>
        </div>
    );
}




