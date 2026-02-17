const phases = {
  "phase-1": {
    title: "HTML Fundamentals",
    rubric: {
      understanding: 0.2,
      technical: 0.6,
      solutionUx: 0.2
    },
    categories: {
      understanding: [
        "What is the difference between semantic and non-semantic HTML elements? Give examples.",
        "What is a DOCTYPE and why do we use it at the beginning of an HTML document?",
        "What is HTML and what is it used for in web development?",
        "What are HTML attributes? Give examples.",
        "What is the purpose of the <head> and <body> tags?",
        "What is the difference between <div> and <span>?",
        "What are meta tags and why are they important?",
        "What is the purpose of alt text in images?",
        "How do you create a hyperlink in HTML?",
        "What is the difference between ordered and unordered lists?"
      ],
      technical: [
        "Explain block elements vs inline elements. Give examples of each.",
        "What are the most common semantic tags and what do they represent? (header, nav, main, article, footer, etc.)",
        "How do you create a table in HTML? Explain the basic structure.",
        "What is the difference between <strong> and <b>, or <em> and <i>?",
        "How do you create a form in HTML? What elements are used?",
        "What are input types in HTML forms? Name at least 5.",
        "What is the purpose of the <iframe> tag?",
        "How do you embed a video or audio file in HTML?",
        "What are HTML entities and when would you use them?",
        "What is the difference between id and class attributes?"
      ],
      solutionUx: [
        "Why would you use a <nav> tag instead of just a <div> for navigation?",
        "If you had to structure a blog post page, which semantic tags would you use and where?",
        "How would you make your HTML accessible for users with disabilities?",
        "Why is it important to use proper heading hierarchy (h1, h2, h3)?",
        "How would you structure a contact form to be user-friendly?",
        "What considerations would you make when adding images to a webpage?",
        "How would you organize content on a homepage for better readability?",
        "Why is semantic HTML important for search engines?",
        "How would you make a navigation menu easy to understand?",
        "What would you consider when structuring a multi-page website?"
      ]
    }
  },
  "phase-2": {
    title: "CSS & Responsive Design",
    rubric: {
      understanding: 0.2,
      technical: 0.6,
      solutionUx: 0.2
    },
    categories: {
      understanding: [
        "What is CSS and what is it used for?",
        "What is the difference between a class selector and an ID selector?",
        "What is the CSS box model? Explain its components.",
        "What are the different ways to add CSS to an HTML document?",
        "What is the difference between margin and padding?",
        "What does 'cascading' mean in CSS?",
        "What is CSS specificity and how does it work?",
        "What are pseudo-classes? Give examples.",
        "What is the difference between relative and absolute positioning?",
        "What are CSS variables and how do you use them?"
      ],
      technical: [
        "What are Flexbox and Grid? When would you use each one?",
        "How do you make a website responsive? What is a media query?",
        "How do you center an element horizontally and vertically in CSS?",
        "What are CSS transitions and animations?",
        "How do you make text responsive (change size on different screens)?",
        "What is mobile-first design?",
        "How do breakpoints work in responsive design?",
        "What is the difference between display: none and visibility: hidden?",
        "How do you create a multi-column layout using CSS?",
        "What are CSS frameworks and why would you use them?"
      ],
      solutionUx: [
        "Why would you choose Flexbox for a navigation bar?",
        "How would you design a layout that works on both mobile (320px) and desktop (1200px)?",
        "How would you ensure good contrast between text and background?",
        "Why is consistent spacing important in a design?",
        "How would you make buttons easy to click on mobile devices?",
        "What color considerations would you make for accessibility?",
        "How would you style a form to be user-friendly?",
        "Why is loading speed important and how does CSS affect it?",
        "How would you create a visually appealing card layout?",
        "What font size and line height would you use for readability?"
      ]
    }
  },
  "phase-3": {
    title: "JavaScript & DOM Manipulation",
    rubric: {
      understanding: 0.2,
      technical: 0.6,
      solutionUx: 0.2
    },
    categories: {
      understanding: [
        "What is JavaScript and what can you use it for?",
        "What is the difference between var, let, and const?",
        "What are data types in JavaScript? Name at least 5.",
        "What is the difference between == and === in JavaScript?",
        "What are JavaScript functions and how do you create them?",
        "What is the DOM (Document Object Model)?",
        "What are arrays and how do you use them?",
        "What is an object in JavaScript?",
        "What are JavaScript events?",
        "What is the difference between null and undefined?"
      ],
      technical: [
        "How do you select an HTML element in JavaScript? Give examples.",
        "What happens when you click a button? How does the browser know what to do?",
        "How do you add or remove a class from an element using JavaScript?",
        "What are event listeners and how do you use them?",
        "How do you change the content of an HTML element with JavaScript?",
        "What is form validation and how would you implement it?",
        "How do you create and append new elements to the DOM?",
        "What are loops in JavaScript and when would you use them?",
        "How do you work with conditions (if/else) in JavaScript?",
        "What is the difference between innerHTML and textContent?"
      ],
      solutionUx: [
        "Why would you hide or show an element when a user clicks a button?",
        "How would you validate that a user filled in a form before submitting it?",
        "How would you provide feedback to users when they interact with your page?",
        "Why is it important to handle errors in JavaScript?",
        "How would you make a button disabled until a condition is met?",
        "How would you create a simple image slider or carousel?",
        "Why would you want to dynamically update content without reloading the page?",
        "How would you make a search filter for a list of items?",
        "What user experience improvements does JavaScript enable?",
        "How would you create an interactive navigation menu?"
      ]
    }
  },
  "phase-4": {
    title: "Frontend AI (Gemini Integration)",
    rubric: {
      understanding: 0.2,
      technical: 0.6,
      solutionUx: 0.2
    },
    categories: {
      understanding: [
        "What is an API and why do we need it in web development?",
        "Can you explain what JSON is in simple terms?",
        "What does 'fetch' do in JavaScript?",
        "What is the difference between frontend and backend?",
        "Why do we need to use async/await when calling APIs?",
        "What is a Promise in JavaScript?",
        "What does it mean when we say an API call is asynchronous?",
        "What is the purpose of the Gemini API in web projects?",
        "What is an API key and why should we keep it secret?",
        "What happens when an API request fails?"
      ],
      technical: [
        "Write code to fetch data from an API using the fetch() method.",
        "How would you display API response data on a webpage?",
        "What is the syntax of async/await in JavaScript?",
        "How do you handle errors when making an API call?",
        "Write a simple fetch request and show how to log the response.",
        "What is the difference between .then() and async/await?",
        "How would you send data to an API using POST method?",
        "Write code to check if an API response was successful.",
        "How do you access nested data from a JSON response?",
        "What HTTP status code indicates a successful API request?"
      ],
      solutionUx: [
        "How would you show a loading message while waiting for API data?",
        "Design a simple user interface to display weather data from an API.",
        "What should you show users if an API request fails?",
        "How would you make your app feel responsive during API calls?",
        "Describe how you would build a simple chatbot UI using Gemini API.",
        "What user feedback would you provide during a long API request?",
        "How would you handle showing multiple API responses on one page?",
        "Design a search feature that uses an API to find results.",
        "How would you prevent users from clicking a button multiple times during an API call?",
        "What's a good way to show error messages to users without confusing them?"
      ]
    }
  },
  "phase-5": {
    title: "Full Stack (Frontend + Backend + Gemini)",
    rubric: {
      understanding: 0.2,
      technical: 0.6,
      solutionUx: 0.2
    },
    categories: {
      understanding: [
        "What is the difference between frontend and backend in a web application?",
        "Why do we need a server when building full stack applications?",
        "What does Express.js do in a Node.js application?",
        "Why should API keys never be stored in frontend code?",
        "What is the role of environment variables in backend development?",
        "Can you explain what REST API means in simple terms?",
        "What is the purpose of MongoDB in a full stack application?",
        "What does it mean when we say a server is 'listening' on a port?",
        "Why do we separate routes, controllers, and services in backend code?",
        "What is the request-response cycle in full stack development?"
      ],
      technical: [
        "Write code to create a simple Express server that listens on port 5000.",
        "How would you create an API endpoint that returns JSON data?",
        "Write code to connect to MongoDB using Mongoose.",
        "How do you read environment variables in Node.js?",
        "Write an Express route that receives data from frontend and saves it to database.",
        "How would you handle errors in an Express API endpoint?",
        "Write code to make a fetch request from frontend to your backend API.",
        "How do you send data from backend to frontend as JSON?",
        "What is middleware in Express and how do you use it?",
        "Write code to validate user input before saving to database."
      ],
      solutionUx: [
        "Design the flow of data from user input to AI response in a full stack app.",
        "How would you show loading states when frontend waits for backend response?",
        "What should happen if the backend server is down or unreachable?",
        "Design a simple admin dashboard to view all user sessions.",
        "How would you organize your project folders for frontend and backend?",
        "What user feedback would you provide during database save operations?",
        "Design the architecture for a chatbot that stores conversation history.",
        "How would you handle showing real-time updates from server to frontend?",
        "What's the best way to display error messages from backend API failures?",
        "Design a feature where users can see their past interview results."
      ]
    }
  }
};

module.exports = { phases };
