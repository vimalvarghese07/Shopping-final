import React,{useContext, useState}from 'react'
import {TextField }from '../Components/FormField'
import { useFormik } from 'formik'
import { login } from '../Helper/Helper'
import Button from '../Components/Button'
import Card from '../Components/Card'
import {ThemeContext} from '../Helper/ThemeProvider'
import { useAuth } from '../store/store'
import { useNavigate } from 'react-router-dom'
import toast,{ Toaster } from 'react-hot-toast'
import { validateLogin } from '../Helper/Validate'




function Login() {

  const theme = useContext(ThemeContext);
  const {dispatch} = useAuth();
  const navigate = useNavigate()

  const [tab,setTab] = useState('register')

  const formik = useFormik({
    initialValues:{
      username:'',
      password:'',
    },
    validate:validateLogin,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:values =>{
      console.log(values)
      let registerPromise = login({values:{username:values.username,password:values.password}})
      registerPromise.then((res) =>
      {
        console.log(res)
        dispatch({type:'LOGIN',payload:res});
        navigate('/')
        //dispatch and navigate
      })
      .catch((err) =>
      {
        toast.error(err?.response.data.error)
        console.log(err)})
    }
  })

  return (
    <section className="Register">
      <Toaster position='top-center' reverseOrder={false}/>

      <Card bgcolor={'black'} height={'40vh'} width={'30%'} radius={'25px'} CustomClass={'RegCard'}>
      {tab === 'register' && <>

        <h2 className="head">LOGIN</h2>
        <form className='RegForm' >

          <TextField legend={'User Name'} prefixIcon={'user'} border={`1px solid ${theme.color1}`} placeholder={'Enter your User Name'} type={'text'} fieldProp={formik.getFieldProps('username')}/>
          {formik.errors.username && <span className="error-text">{formik.errors.username}</span> }
          <TextField legend={'Password'} prefixIcon={'lock'} border={`1px solid ${theme.color1}`} placeholder={'Enter your Password'} type={'password'} fieldProp={formik.getFieldProps('password')}/>
          {formik.errors.password && <span className="error-text">{formik.errors.password}</span> }
          <div className="centerAlign">
              <Button text={'LOGIN'} radius={'20px'} type={'submit'} width={'6rem'} customClass={'regButton'} height={'2rem'} onClick={formik.handleSubmit}/>
          </div>  
          <div className="link" onClick={() => setTab('forpwsd')}>Forgot Password?</div>        
      
        </form>
        </>}
        {tab === 'forpwsd' && <ForgetPswd/> }
      </Card>
    </section>

  )
}

export default Login

const ForgetPswd = () => {
  return(
    <div>thth</div>
  );
}