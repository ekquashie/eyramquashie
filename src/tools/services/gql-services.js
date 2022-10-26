import {gql} from "@apollo/client";
import {client} from "../../index";

const allProductsRequest = () => client.query({
  query: gql`
  query {
    category {
      name
      products {
        id
        attributes {
          name
        }
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`
});

const productsCategoriesRequest = () => client.query({
  query: gql`
  query {
    categories {
      name
      products {
        id
        attributes {
          name
        }
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`
});

const categoriesNameRequest = () => client.query({
  query: gql`
  query {
    category {
      name
    }
    categories {
      name
    }
  }
`
});

const productAttributesRequest = (item) => client.query({
  query: gql`
  query {
    product(id: "${item}") {            
      name            
      gallery
      prices {
        amount
        currency
      }
    }
  }
`
});

const currenciesRequest = () => client.query({
  query: gql`
  query {
    currencies {
      label
      symbol
    }
  }
`
});

const pricesRequest = () => client.query({
  query: gql`
  query {
    category {
      products {
        id
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`
});

const productRequest = (productId) => client.query({
  query: gql`
  query {
    product(id: "${productId}") {
      name
      inStock
      gallery
      description
      category
      attributes {
        name
        items {
          id
          value
          displayValue
        }
      }
      prices {
        amount
        currency {
          label
          symbol
         }
      }
      brand
    }
  }
`
});

export {
  allProductsRequest,
  productsCategoriesRequest,
  categoriesNameRequest,
  productAttributesRequest,
  currenciesRequest,
  pricesRequest,
  productRequest,
};
