### Frontend README

# DevTree Frontend

DevTree is a frontend application for a full-stack web platform that allows developers to share their professional and personal links in one place. This frontend handles user interactions, profile customization, and the display of public user profiles.

---

## Features

### 1. **Home Page**
- Allows users to check the availability of a unique handle (username).

### 2. **Admin Access**
- Admin users can log in to manage their profile and links.
- Admin functionality includes:
  - Adding, editing, or removing links.
  - Changing personal information such as handle, profile picture, and bio.

### 3. **Public Profile Page**
- Each user has a shareable page that showcases their enabled links.
- This page is optimized for public access, making it simple to share professional links with others.

---

## Technologies Used

- **React.js** for building a responsive and interactive user interface.
- **React-Router-Dom** for client-side routing.
- **React-Hook-Form** for form handling and validation.
- **Tailwind CSS** for modern, responsive, and customizable styling.
- **Heroicons** and **HeadlessUI** for seamless UI components and icons.
- **Dnd-Kit** for drag-and-drop capabilities in the admin panel.
- **React-Query** for efficient state management and server data synchronization.
- **Axios** for API requests.

---

## Installation

### Prerequisites

- Node.js and npm installed.

### Setup

1. Navigate to the frontend directory:
```
cd frontend
```
2. Install dependencies:
```
npm install
```
3. Start the development server:
```
npm run dev
```

4.Folder Structure
```
/frontend
├── src
│   ├── components
│   ├── pages
│   ├── hooks
│   └── utils
├── tailwind.config.js
├── vite.config.js
├── package.json
└── tsconfig.json
```

5. Scripts
**npm run dev:** Start the Vite development server.
**npm run build:** Build the application for production.
**npm run preview:** Preview the production build.
**npm run lint:** Run ESLint for code quality checks.

6. Contribution
- Contributions are welcome! Feel free to fork the repository and submit a pull request.

7.License
- This project is licensed under the ISC License.

Author
**Jake Fernandez B**

