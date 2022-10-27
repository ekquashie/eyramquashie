//withRouter not working in react-router v6
//Had to create a custom withRouter components since hooks cannot be used in class based components

import {useNavigate} from 'react-router-dom';

export const withRouter = (Component) => {
  return (props) => {
    const navigate = useNavigate();

    return (
      <Component
        navigate={navigate}
        {...props}
      />
    );
  };
};