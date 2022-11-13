//withRouter not working in react-router v6
//Had to create a custom withRouter components since hooks cannot be used in class based components
import {useLocation, useNavigate, useParams} from "react-router-dom";

export const withRouter = (Component) => {
  return (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        navigate={navigate}
        router={{ location, navigate, params }}
        {...props}
      />
    );
  };
};