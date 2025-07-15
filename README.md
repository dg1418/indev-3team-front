# Indev-Front Project

This project is a React-based front-end application.

## Project Structure

The project follows a feature-based and role-based hybrid structure for scalability and maintainability.

```
src/
├── api/
│   └── client.js            # API request client (e.g., axios instance)
├── assets/
│   ├── images/
│   └── fonts/
├── components/
│   ├── common/              # Common reusable components (Button, Input, Modal)
│   └── layout/              # Page layout components (Header, Footer, Sidebar)
├── hooks/
│   └── useAuth.js           # Custom hooks (e.g., for authentication, form handling)
├── pages/
│   ├── HomePage.js
│   └── LoginPage.js
├── services/
│   ├── authService.js       # Domain-specific API request functions (e.g., authentication)
│   └── postService.js       # (e.g., for posts)
├── styles/
│   └── global.css           # Global styles
├── utils/
│   └── formatDate.js        # Pure utility functions
├── App.js                   # Main application component for routing and global state
└── index.js                 # Application entry point
```

### Folder Descriptions

*   **`api/`**: Manages the central HTTP client (e.g., `axios`) for communicating with the backend server. Common logic like adding authentication tokens to headers is handled here.
*   **`assets/`**: Stores static files like images and fonts.
*   **`components/`**: Contains UI components.
    *   `common/`: Generic, reusable components like `Button`, `Input`, etc.
    *   `layout/`: Components that define the overall page structure, such as `Header`, `Footer`.
*   **`hooks/`**: Stores custom React hooks that encapsulate and reuse stateful logic.
*   **`pages/`**: Contains components that represent a full page (e.g., `HomePage`, `AboutPage`). These components assemble smaller components from the `components/` directory.
*   **`services/`**: Contains functions that call the backend API, grouped by domain (similar to services in NestJS). They use the client from `api/` to make the actual requests.
*   **`styles/`**: Holds global CSS files, such as `reset.css` or global style definitions.
*   **`utils/`**: For pure, framework-agnostic utility functions (e.g., date formatting, validation).
*   **`App.js`**: The root component, primarily responsible for client-side routing and providing global context.
*   **`index.js`**: The entry point of the application, where the React app is mounted to the DOM.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)