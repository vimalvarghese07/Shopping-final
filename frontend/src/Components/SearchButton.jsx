import React, { useContext,useState } from "react";
import { ThemeContext } from '../Helper/ThemeProvider';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';


const SearchField = ({ value,isDisabled,id,customClass,radius,legend,width, height, placeholder, prefixIcon,postfixIcon, type,fieldProp,border,onchange,showlegend}) => {
  
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
        onChange={onchange}
      />
      {postfixIcon === 'search' && <span className="postfix-icon"><SearchIcon/></span>}
        {type === 'password' && (
        <span className="password-toggle postfix-icon" onClick={toggleShowPassword}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
      )}
    </fieldset>
  );
};

SearchField.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  legend:PropTypes.string,
};

export default SearchField;