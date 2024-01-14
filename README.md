# Product App
# Tech
- [Next.js 14] - Next.js is an open-source React framework that enables functionalities like server-side rendering, static site generation, and building web applications optimized for performance and SEO.
- [TypeScript] - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Redux Toolkit] - Redux Toolkit is an official, opinionated, batteries-included toolset for efficient Redux development.
- [Axios] - Promise based HTTP client for the browser and node.js
- [React Paginate] - React Paginate is a React component that is used for creating pagination controls in web applications built using React.js.
- [TailwindCss] - React-infinite-scrol is a popular open-source library for implementing infinite scrolling in React applications.
- [Material UI] - Material UI is a popular open-source library of React components that implement Google's Material Design guidelines
- [Visual Studio Code] - Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.

## Features and Functionality
- The application that lists product from the api.
- The display of product list details like images, brands and models name.
- Adding one or multiple products that you like to cart.
- Adding and deleting 
- Creating an pagination.
- Searching for products in search input.
- Filtering products coming from API in autocomplete.
- Sort products by date and price.
- Saving the products in the cart to local storage even if the page is closed.
- Adding and deleting cards via redux toolkit.
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

- waiting feedback# eteration
