import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TextField } from '../FormField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';





export default function AddressForm({formik}) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField customClass={'legend2'}
            placeholder ="firstName"
            legend={"First name"}
            fieldProp={formik.getFieldProps('firstname')}
          />
          {formik.errors.firstname && 
          <span className='error-text'>{formik.errors.firstname}</span>
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField customClass={'legend2'}
            placeholder ="lastName"
            legend={"Last name"}
            fieldProp={formik.getFieldProps('lastname')}
          />
          {formik.errors.lastname && 
          <span className='error-text'>{formik.errors.lastname}</span>
          }
        </Grid>
        <Grid item xs={12}>
          <TextField customClass={'legend2'}
            placeholder ="address1"
            legend={"Address line 1"}
            fieldProp={formik.getFieldProps('adressline1')}
          />
          {formik.errors.adressline1 && 
          <span className='error-text'>{formik.errors.adressline1}</span>
          }
        </Grid>
        <Grid item xs={12}>
          <TextField customClass={'legend2'}
            placeholder ="address2"
            legend={"Address line 2"}
            fieldProp={formik.getFieldProps('adressline2')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField customClass={'legend2'}
            placeholder ="city"
            legend={"City"}
            fieldProp={formik.getFieldProps('city')}
          />
          {formik.errors.city && 
          <span className='error-text'>{formik.errors.city}</span>
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField customClass={'legend2'}
            placeholder ="state"
            legend={"State/Province/Region"}
            fieldProp={formik.getFieldProps('state')}
          />
          {formik.errors.state && 
          <span className='error-text'>{formik.errors.state}</span>
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField customClass={'legend2'}
            placeholder ="zip"
            legend={"Zip / Postal code"}
            fieldProp={formik.getFieldProps('post')}
          />
          {formik.errors.post && 
          <span className='error-text'>{formik.errors.post}</span>
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField customClass={'legend2'}
            placeholder ="country"
            legend={"Country"}
            fieldProp={formik.getFieldProps('country')}
          />
          {formik.errors.country && 
          <span className='error-text'>{formik.errors.country}</span>
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField customClass={'legend2'}
            placeholder ="Email"
            legend={"Email"}
            fieldProp={formik.getFieldProps('Email')}
          />
          {formik.errors.Email && 
          <span className='error-text'>{formik.errors.Email}</span>
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField customClass={'legend2'}
            placeholder ="Phonenumber"
            legend={"Phonenumber"}
            fieldProp={formik.getFieldProps('Phonenumber')}
          />
          {formik.errors.Phonenumber && 
          <span className='error-text'>{formik.errors.Phonenumber}</span>
          }
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label ="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
