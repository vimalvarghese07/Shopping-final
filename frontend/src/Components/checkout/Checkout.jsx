import React, { useContext,useEffect,useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useNavigate } from 'react-router-dom';
import { useSelected } from '../../Helper/selectedContext';
import { ThemeContext } from '../../Helper/ThemeProvider';
import NavBar from '../NavBar'
import { useFormik } from 'formik'
import { validateAddressForm } from '../../Helper/Validate';
import RazorpayButton from '../Razorpaybutton';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https:/">
        TimeStore
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Review your order'];

function getStepContent(step,formik,address) {
  switch (step) {
    case 0:
      return <AddressForm  formik={formik}/>;
    // case 1:
    //   return <PaymentForm />;
    case 1:
      return <Review  Address={address}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {

  const[Address,setAddress] = useState()
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const { selectedItem } = useSelected();
  const [activeStep, setActiveStep] = useState(0);


  const formik = useFormik({
    initialValues:{
      firstname:'',
      lastname:'',
      adressline1:'',
      adressline2:'',
      city:'',
      state:'',
      post:'',
      country:'',
      Email:'',
      Phonenumber:'',


    },
    validate:validateAddressForm,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:values =>{
      console.log(values)
      setAddress(values)
      setActiveStep(activeStep + 1);
    }
  })
  
  

  useEffect(() => {
    if (!selectedItem) {
      navigate('/shop');
    }
  },[])

  
  const handleNext = () => {
    formik.handleSubmit()    
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleTitleClick = () => {
    navigate('/')
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar/>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep,formik,Address)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                {activeStep !== steps.length - 1 &&(
                  <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep !== steps.length - 1 &&  'Next'}
                </Button>
                )}
                {activeStep === 1 && (
                  <RazorpayButton 
                  amount={selectedItem?.price} 
                  Name={`${Address?.firstname} ${Address?.lastname} `} 
                  Email={Address?.Email} 
                  Phonenumber={Address?.Phonenumber}
                  Address={`${Address?.adressline1} ${Address?.adressline2}`}
                  text={'place order'}
                  />
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
