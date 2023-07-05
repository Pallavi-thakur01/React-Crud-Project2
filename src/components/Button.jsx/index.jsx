import React from "react";
import PropTypes from 'prop-types';

const ButtonComponent = ({ text, onClick,  ...rest }) => {
    return (
      <button  onClick={onClick}  {...rest}>
        {text}
      </button>
    );
  };

  ButtonComponent.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };


  export default ButtonComponent;

