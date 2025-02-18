# Trello Clone

This is a Trello-inspired application that allows users to create and manage boards, lists, cards, checklists, and checkitems. It features a responsive layout for seamless use across various devices.

## Features

### Boards

- **Display Boards**: View all existing boards.
- **Create New Board**: Add a new board.

### Lists

- **Display Lists**: View all lists within a board.
- **Create New List**: Add a new list to a board.
- **Delete/Archive List**: Remove or archive a list from a board.

### Cards

- **Display Cards**: View all cards within a list.
- **Create New Card**: Add a new card to a list.
- **Delete Card**: Remove a card from a list.

### Checklists

- **Display Checklists**: View all checklists within a card.
- **Create New Checklist**: Add a new checklist to a card.
- **Delete Checklist**: Remove a checklist from a card.

### Checkitems

- **Display Checkitems**: View all checkitems in a checklist.
- **Create New Checkitem**: Add a new checkitem to a checklist.
- **Delete Checkitem**: Remove a checkitem from a checklist.
- **Check/Uncheck Checkitem**: Mark a checkitem as complete or incomplete.

## Technologies Used

- **Frontend**: React.js
- **Styling**: CSS (Responsive Design)
- **API Handling**: Axios
- **Build Tool**: Vite

## Folder Structure

```text
TRELLOCLONE
├── public
├── src
│   ├── api
│   │   ├── AxiosInstance.jsx
│   │   ├── deleteApi.js
│   │   ├── postApi.js
│   │   ├── putApi.js
│   ├── assets
│   ├── components
│   │   ├── CardModal.jsx
│   │   ├── CheckItems.jsx
│   │   ├── CheckList.jsx
│   │   ├── HomeBoardCard.jsx
│   │   ├── LinearProgressWithLabel.jsx
│   │   ├── ListCard.jsx
│   │   ├── Navbar.jsx
│   ├── pages
│   │   ├── BoardPage.jsx
│   │   ├── HomePage.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
```

## Environment Variables

The application requires the following environment variables to function correctly. Define these in the `.env` file:

```text
VITE_API_URL=https://api.trello.com/1/
VITE_API_KEY=<Your API Key>
VITE_API_TOKEN=<Your Token>
```

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yogesh19aggarwal/Trello-Clone-Yogesh
   cd trelloClone
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in the `.env` file.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Login Credentials

Use the following credentials to sign in:

Username: ```user123```
Password: ```password123```

## Future Improvements

- Add user authentication.
