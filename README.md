# Information Management System (IMS)
The Information Management System (IMS) is a specialized and advanced software solution designed to streamline, enhance, and optimize communication between an organization and its employees. This system serves as a dedicated platform for delivering critical notifications, updates, and relevant information to employees in a timely and efficient manner, fostering effective internal communication and engagement.

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [React](https://reactjs.org/) for building modern web applications.

## Getting Started

1. **Clone the repository:**

2. **Prerequisites**
    - [Node.js 18](https://nodejs.org/en) and [yarn](https://yarnpkg.com) installed.

3. **Install Dependencies**
    ```bash
    yarn install
    yarn prepare
    ```

4. **Setup environment variable**
  - Create file .env.local
  - Prepare google auth client ID

    ```
    VITE_CLIENT_GOOGLE_OAUTH={googleAuthClientId}
    VITE_REACT_APP_BASE_URL={BE_API_URL}
    VITE_REACT_APP_PORT=5173
    ```
5. **Start Development Server**

    ```bash
    yarn local
    ```

## Deployment with Nginx

1. Build project

    ```bash
    yarn build:prod 
    ```
    Build file on folder `dist`

2. Install Nginx

    ```bash
    sudo apt install nginx
    ```

    Open NGINX configuration file for editing. The file location may vary depending on your system:

    - Ubuntu/Debian: /etc/nginx/nginx.conf
    - CentOS/RHEL: /etc/nginx/nginx.conf
    - macOS (Homebrew): /usr/local/etc/nginx/nginx.conf

    Add a new server block to the configuration to serve your Vite project. Replace your-domain.com with your actual domain name or IP address:

    ```bash
    server {
      listen 80;
      server_name your-domain.com;

      root /path/to/your/vite/project/dist;
      index index.html;

      location / {
        try_files $uri $uri/ /index.html;
      }
    }
    ```
3. Test NGINX configuration and start NGINX

    ```bash
    sudo nginx -t
    sudo systemctl start nginx
    sudo systemctl enable nginx
    ```

## Available Scripts
In the project directory, you can run:
- `yarn dev-mock`: Starts the development server with mock API
- `yarn lint`: Lints the code using ESLint.
- `yarn build:prod`: Build production with environment variable on file `env.prod`

## Project Structure

  ```
  ncc-erp-imsv2-fe
  ├── README.md
  ├── index.html
  ├── package.json
  ├── public
  │   ├── mockServiceWorker.js
  │   └── static
  ├── src
  │   ├── App.css
  │   ├── App.tsx
  │   ├── api
  │   ├── assets
  │   ├── components
  │   ├── context
  │   ├── enums
  │   ├── features
  │   ├── index.css
  │   ├── index.tsx
  │   ├── layouts
  │   ├── pages
  │   ├── route
  │   ├── store
  │   ├── themes
  │   ├── types
  │   ├── utils
  │   └── vite-env.d.ts
  ├── test
  │   ├── basic.test.ts
  │   ├── setup.ts
  │   └── test-utils
  ├── tsconfig.json
  ├── tsconfig.node.json
  ├── vite.config.ts
  └── yarn.lock
  ```

## Documentation
Please visit this link: [Google Docs](bit.ly/3LJdqy0)

## License
The MIT License (MIT)

Copyright (c) <year> NCC Plus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.