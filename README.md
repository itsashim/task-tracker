# Task Tracker

A modern, responsive task management application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- ✅ **Task Management**: Create, edit, delete, and update tasks
- 🔍 **Advanced Search**: Debounced search across task titles and descriptions
- 📊 **Smart Filtering**: Filter tasks by status (All, Pending, In Progress, Done)
- 📈 **Sorting Options**: Sort by title, due date, priority, or creation date
- 🎨 **Modern UI**: Sleek black and white design with Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 💾 **Data Persistence**: Tasks are saved using json-server mock API
- ⚡ **Performance**: Optimized with React hooks and efficient state management

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **API**: json-server (mock REST API)
- **State Management**: Custom React hooks
- **Icons**: Heroicons (SVG)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
# Start both API and frontend servers
npm run dev:full

# Or start them separately:
# Terminal 1: Start API server
npm run api

# Terminal 2: Start frontend server
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── FilterBar.tsx   # Search and filter controls
│   ├── TaskForm.tsx    # Task creation/editing modal
│   ├── TaskItem.tsx    # Individual task display
│   └── TaskList.tsx    # Task list container
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts  # Debounced search hook
│   ├── useTaskFilters.ts # Filtering and sorting logic
│   └── useTasks.ts     # Task CRUD operations
├── services/           # API service layer
│   └── api.ts         # HTTP client for json-server
├── types/             # TypeScript type definitions
│   └── index.ts       # Task and filter interfaces
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## API Endpoints

The application uses json-server to provide REST API endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Features in Detail

### Task Management
- Create tasks with title, description, due date, and priority
- Edit existing tasks inline or through modal
- Delete tasks with confirmation
- Update task status (Pending, In Progress, Done)

### Search & Filtering
- Real-time search with 300ms debounce
- Filter by task status
- Sort by multiple criteria (title, date, priority)
- Ascending/descending sort order

### User Experience
- Responsive design for all screen sizes
- Loading states and error handling
- Task statistics dashboard
- Overdue task highlighting
- Intuitive modal forms

## Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run api` - Start json-server API
- `npm run dev:full` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality

The project follows modern React and TypeScript best practices:

- Functional components with hooks
- TypeScript for type safety
- Custom hooks for reusable logic
- Component composition
- Responsive design principles

