import { Link } from "gatsby"
// import PropTypes from "prop-types"
import React from "react"
import StripeCheckout from "react-stripe-checkout"

import "./Header.css"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasScrolled: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 50) {
      this.setState({ hasScrolled: true });
    } else {
      this.setState({ hasScrolled: false });
    }
  }

  handlePuchase = token => {
    const amount = 5000
    const description = "My awesome product"
    const bodyObject = {
      tokenId: token.id,
      email: token.email,
      name: token.name,
      description,
      amount
    }

    fetch('http://localhost:9000/stripe-charge', {
      method: 'POST',
      body: JSON.stringify(bodyObject)
    })

  }

  render() {
    return (
      <div className={this.state.hasScrolled ? "Header HeaderScrolled" : "Header"}>
        <div className="HeaderGroup">
          <Link to="/"><img src={require('../images/logo-designcode.svg')} width="30" /></Link>
          <Link to="/courses">Courses</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/workshops">Workshops</Link>
          <StripeCheckout
            amount={5000}
            image="https://cl.ly/0K2f1V3K3h0D/download/Logo.jpg"
            token={this.handlePuchase}
            stripeKey={'pk_test_KgnQlMatJdsBHUVxuoLBZAj900L9lmJ9Pu'}>
          <button>Buy</button>
          </StripeCheckout>
        </div>
      </div>
    )
  }
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
