import {Component} from "react";
import {connect} from "react-redux";
import s from "./nav-currency-button.module.css";
import {changeCurrency} from "../../../../redux/product/actions/currency-action"
import {currenciesRequest} from "../../../services/gql-services";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

class NavCurrencyButton extends Component {
  state = {
    showModal: false, currencies: [],
  };

  componentDidMount() {
    window.addEventListener("click", this.handleClose);
    currenciesRequest().then((response) => {
      this.setState({currencies: response.data.currencies});
    })
  }

  handleClose = (e) => {
    if(e.path.every((el) => el.id !== "currency")){
      this.setState({showModal: false});
    }
  }

  onModalClose = () => {
    this.setState((prev) => {
      return {showModal: !prev.showModal};
    });
  };

  selectCurrency = (currency) => {
    const {onChangeCurrency} = this.props;
    onChangeCurrency(currency.symbol);
    this.setState({
      showModal: false,
    });
  };

  render() {
    const {showModal, currencies} = this.state;
    const {currency} = this.props;
    return (<div>
      <button id="currency" className={s.select} onClick={this.onModalClose} type="button">
        {currency} {showModal ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}
      </button>
      {showModal && (<div className={s.options}>
        {currencies.map((currency, index) => {
          return (<button
            key={index}
            id={currency}
            className={s.option}
            onClick={() => this.selectCurrency(currency)}
          >
            {currency.symbol + " " + currency.label}
          </button>);
        })}
      </div>)}
    </div>);
  }
}

const mapStateToProps = (state) => ({
  currency: state.products.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  onChangeCurrency: (currency) => dispatch(changeCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavCurrencyButton);
