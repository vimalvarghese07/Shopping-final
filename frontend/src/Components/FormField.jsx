// import React from "react";
// import {useContext}from 'react'
// import {ThemeContext} from '../Helper/ThemeProvider'
import React, { useContext,useState } from "react";
import { ThemeContext } from '../Helper/ThemeProvider';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';

// export default  function TextField({legend,type,height,width,placeholder,fieldProp,border,value}){
//     const theme = useContext(ThemeContext)

//     const TextFieldStyle = {
//         height:'50%',
//         width:`calc(${width} - .3em)`,
//         border:'none',
//         outline:'none',
//         padding:'0',
//         margin:'0',
//         paddingInline:'8rem',
//         backgroundColor:'transparent',
//         color:theme.color2,

//     }
//     const FieldSetStyle = {
//         height:height,
//         width:width,
//         padding:'0',
//         borderRadius:'20px',
//         border:border,

//     }
//     console.log(placeholder)
//     return(
//         <fieldset style={FieldSetStyle} className="FormFields" >
//         <legend>{legend}</legend>
//         <input autoComplete={"off"} type={type} style={TextFieldStyle} placeholder={placeholder} {...fieldProp}/>
//         </fieldset>
//     );
// };
{/* 
usage
<TextField  legend={'Name'} type={'text'} height={'4em'} width={'15em'} placeholder={'Enter Your Name'}/>  */}





const TextField = ({ value,isDisabled,id,customClass,radius,legend,width, height, placeholder, prefixIcon, type,fieldProp,border,onchange,showlegend}) => {
  
    const [showPassword,setShowPassword] = useState(false);
    const theme = useContext(ThemeContext);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    }

    const textFieldStyle = {
    outline:'none',
    border:'none',
    padding:'0.5em',
    width: '100%',
    height: height,
    backgroundColor:'transparent',
    color:'grey',
  };
  const textFieldStyleModern ={
    border:border,
    paddingInline:'0.5em',
    height:height,
    width:width,
    borderRadius:radius || '20px'
  }

  return (
    <fieldset style={textFieldStyleModern} className={`textfield-container ${customClass}`}>
      {showlegend !=='none' && <legend>{legend}</legend>}
      {prefixIcon === 'user' && <span className="prefix-icon"><PersonIcon/></span>}
      {prefixIcon === 'lock' && <span className="prefix-icon"><LockIcon/></span>}
      <input
        defaultValue={value}
        disabled={isDisabled}
        {...fieldProp}
        id={id}
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={placeholder}
        style={textFieldStyle}
        // onChange={onchange}
      />
        {type === 'password' && (
        <span className="password-toggle postfix-icon" onClick={toggleShowPassword}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
      )}
    </fieldset>
  );
};

TextField.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  legend:PropTypes.string,
};


const Select = ({required,value,isDisabled,id,border,type,options,fieldProp,legend,height,width,radius,customClass}) => {
    
    const theme = useContext(ThemeContext);
    const textFieldStyle = {
        outline:'none',
        border:'none',
        padding:'0.5em',
        width: '100%',
        height: height,
        backgroundColor:'transparent',
        color:theme.color2,
      };
      const textFieldStyleModern ={
        border:border,
        paddingInline:'0.5em',
        height:height,
        width:width,
        borderRadius:radius || '20px'
      }

    if (type === 'button') {
        return(
        <fieldset style={textFieldStyleModern} className={`textfield-container ${customClass}`}>
        <legend>{legend}</legend>
            <select
            required={required}
            disabled={isDisabled}
            {...fieldProp}
            style={textFieldStyle}
            >
                {options?.map((option,index) => (
                    <option key={index} defaultValue={option}>{option}</option>
                ))}
            </select>
            </fieldset>
        );
    }

    else{
      return(
        <fieldset style={textFieldStyleModern} className={`textfield-container ${customClass}`}>
        <legend>{legend}</legend>
        <select        
        disabled={isDisabled}
        id={id}
        {...fieldProp}
        defaultValue={value}
        style={textFieldStyle}
        >
            {options?.map((option,index) => (
                <option className={`options ${option==='Select Your Gender' ? 'active':''}`} key={index} value={option}>{option}</option>
            ))}
        </select>
        </fieldset>
    );
    }
}


export  {TextField,Select};