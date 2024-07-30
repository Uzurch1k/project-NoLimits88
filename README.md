# project-NoLimits88 - AquaTrack

Water Tracker is an application designed to monitor and analyze water
consumption. It allows users to log their daily water intake and receive
personalized recommendations for maintaining optimal hydration levels.

## Features

- User registration and profile management.
- Calculation of daily water intake needs based on individual activity levels
  and physical condition.
- Logging water consumption.
- Viewing history of water consumption.

## Installation

1.  Clone the repository
    ```sh
    git clone: https://github.com/Uzurch1k/project-NoLimits88.git
    ```
2.  Install dependencies
    ```sh
    npm install
    ```
3.  Launch the application
    ```sh
    npm run dev
    ```

## Routing

The application utilizes the react-router-dom library for managing routes. The
routes within the app are as follows:

1. / - HomePage

The homepage features the app's logo, background image, and dynamic data on the
total number of users, along with dynamically displayed photos of registered
users. There are links to the registration and login pages.

![](/src/assets/homepage.jpg)

2. /signup - SignUpPage

The registration page allows new users to create an account in the app. The
registration form includes fields for entering an email address and password, as
well as a password visibility toggle to prevent errors when entering the
password. All form fields have validation to ensure that users input correct
information, which is then sent to the database. A button on the page submits
the form data to the server, redirecting users to the water tracker page. If the
user is already registered, there is a link at the bottom of the form to the
login page.

![](/src/assets/signup.jpg)

3. /signin - SignInPage

The login page allows existing users to access their accounts. The login form
includes fields for entering a username and password, along with a button to
submit the data to the server. There is a link to the registration page for
those who do not yet have an account. The form also includes a feature to view
the entered password to avoid mistakes. All form fields are validated to ensure
the accuracy of the entered information.

![](/src/assets/signin.jpg)

4. /tracker - TrackerPage

The tracker page allows users to add, modify, and delete their water intake
records. It features two buttons for adding water, displays the percentage of
today's water goal achieved, and includes a calendar to track water consumption
over previous periods.

Users are greeted with a welcome message that dynamically displays their name.
In the top right corner, there is an account section where users can log out and
edit their account details.

The profile editing form contains fields for entering personal information,
which is validated, and offers the option to upload a photo that will be shown
in the user's profile.

Based on the entered data, the app calculates an individual water intake goal to
enhance the user's health and well-being. However, users can manually adjust
their goal to suit their needs.

![](/src/assets/tracker.jpg)

## Technologies Used

# Front-end

- **HTML/CSS**: Fundamental technologies for creating and styling web pages.
  HTML (HyperText Markup Language) handles the structure of the content, while
  CSS (Cascading Style Sheets) controls its appearance and formatting.

- **Axios**: A library for making HTTP requests in JavaScript. Axios simplifies
  sending requests to servers and handling responses, supports asynchronous
  operations with promises, and includes built-in error handling.

- **React**: A JavaScript library for building user interfaces. React allows
  developers to create components that automatically update, making it easier to
  manage application state and rendering.

- **Redux Toolkit**: The official set of tools for simplifying the use of Redux,
  a popular state management library. Redux Toolkit offers a simpler syntax,
  automatic generation of actions and reducers, and support for asynchronous
  operations.

- **Pagination**: A method for dividing large sets of data into multiple pages,
  making navigation easier and improving the performance of web applications. It
  is commonly used for displaying search results or lists that do not fit on a
  single page.

# Back-end

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine that allows
  developers to run JavaScript on the server side. It is designed for building
  scalable network applications and supports non-blocking, event-driven
  architecture.

- **Express**: A minimal and flexible Node.js web application framework that
  provides a robust set of features for building web and mobile applications. It
  simplifies the process of handling HTTP requests, routing, and middleware
  integration.

- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
  Mongoose provides a schema-based solution to model application data, manage
  MongoDB interactions, and perform data validation.

- **Swagger**: A tool for designing, building, and documenting RESTful APIs.
  Swagger (now known as OpenAPI) provides a standardized way to describe API
  endpoints, request/response formats, and other relevant details, making it
  easier for developers to understand and use APIs.

[Link Swagger](https://aquatrack-backend-bmxm.onrender.com/api-docs/)

## API

[Додаток AquaTrack](https://project-nolimits88.netlify.app/)
