# Product App
# Tech
- [Next.js 14] - Next.js is an open-source React framework that enables functionalities like server-side rendering, static site generation, and building web applications optimized for performance and SEO.
- [TypeScript] - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Redux Toolkit] - Redux Toolkit is an official, opinionated, batteries-included toolset for efficient Redux development.
- [Axios] - Promise based HTTP client for the browser and node.js
- [React Paginate] - React Paginate is a React component that is used for creating pagination controls in web applications built using React.js.
- [TailwindCss] - React-infinite-scrol is a popular open-source library for implementing infinite scrolling in React applications.
- [Material UI] - Material UI is a popular open-source library of React components that implement Google's Material Design guidelines
- [Jest] - Jest is a popular testing framework for JavaScript. It's primarily used for writing unit tests and integration tests in JavaScript and TypeScript applications.
- [Visual Studio Code] - Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.

## Features and Functionality
##### Fetches and Displays Product List: 
The application retrieves product data from an API, displaying details like images, brands, and model names.

##### Cart Functionality: 
Users can add one or multiple products they like to a shopping cart, with options to add and remove items as needed.

##### Pagination:
Includes pagination for efficient navigation through the product list.

##### Product Search:
Features a search input for finding specific products.

##### Autocomplete Filtering: 
Offers an autocomplete function that filters products from the API.

##### Sorting Options: 
Allows users to sort products by date and price.

##### Local Storage of Cart Items:
Saves products in the cart to local storage, preserving the cart contents even if the page is closed.

##### Redux Toolkit for State Management: 
Utilizes Redux Toolkit for managing the state of adding and deleting items in the cart.

##### Unit Testing: 
Includes comprehensive unit tests for critical features, such as the cart's add and delete functionalities, to ensure the application's reliability and performance.







## App Flow

Project Structure
```
project
|-- public
|-- src
|    |-- components
|    |      |-- CheckoutMenu
|    |      |-- FilterPanel
|    |      |-- Header
|    |      |-- Layout
|    |      |-- ProductCart
|    |      |-- ProductList
|    |      |-- ShoppingCart
|    |-- pages
|    |      |-- api
|    |      |-- home
|    |      |-- products
|    |      |     | -- [id].ts
|    |      |-- _app.tsx
|    |      |-- index.tsx
|    |-- service
|    |      | -- apiClient
|    |-- store
|    |      |-- slice
|    |      |     | -- cartSlice
|    |      |-- store.ts
|    |-- styles
|    |      |-- global.css
|    |-- types
|    |      | -- cart
|    |      | -- filter
|    |      | -- product
|    |      | -- search
|    |-- App.tsx
|    |-- index.tsx
|    |-- next-env.d.ts
|-- package.json
`-- README.md
```

## ToDo's

- waiting feedback