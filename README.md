# TaskFlow - Mini Kanban Board

A production-ready Kanban board application built with Angular 17, NgRx, and Angular CDK with AI-powered task prioritization.

## Features

- 📋 **Three-Column Kanban**: To Do, In Progress, Done
- 🔄 **Drag & Drop**: Smooth task movement between columns
- 🤖 **AI Priority Suggestions**: Automatic task priority assignment
- ✏️ **Inline Editing**: Click to edit task titles
- 🎨 **Modern UI**: Glassmorphism design with smooth animations
- 📱 **Responsive**: Works on desktop and mobile devices

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Run tests
ng test
```

## Architecture

The application follows clean architecture principles with clear separation of concerns:

```
src/app/kanban/
├── components/
│   ├── board/           # Main Kanban board
│   └── task-card/       # Individual task cards
├── services/
│   └── kanban.service.ts # Mock AI priority service
└── store/
    ├── actions.ts       # NgRx actions
    ├── reducer.ts       # State management
    ├── selectors.ts     # Data queries
    ├── effects.ts       # Side effects
    └── state.ts         # Type definitions
```

## Technology Stack

- **Angular 17** with standalone components
- **NgRx** for state management
- **Angular CDK** for drag & drop
- **TypeScript** for type safety
- **SCSS** with modern CSS features
- **RxJS** for reactive programming

## AI Integration & Development Process

During development, I strategically used AI tools to accelerate certain aspects while maintaining full control over the architecture and critical logic.

### AI-Assisted Sections

**1. NgRx Store Boilerplate**
- Generated initial action creators and reducer structure
- Created selector patterns for filtering tasks by status
- Provided effects template for async operations

**2. Drag & Drop Implementation**
- Angular CDK integration patterns
- Event handling for cross-column transfers
- Visual feedback during drag operations

**3. SCSS Grid Layout**
- Responsive three-column layout
- CSS animations and transitions
- Glassmorphism styling effects

**4. Unit Testing Patterns**
- Test structure for NgRx reducers
- Component testing with TestBed
- Mock setup patterns

### Specific Prompts Used

**NgRx Effects Setup:**
```
"Create NgRx effects for handling async operations with loading states, 
success and failure actions for fetching AI task priorities from a mock service"
```

**Drag-Drop Handler:**
```
"Implement Angular CDK drag-drop for moving tasks between Kanban columns 
with proper data transfer and status updates in NgRx store"
```

**Responsive Layout:**
```
"Design a responsive three-column CSS grid layout for Kanban board with 
drag-drop visual feedback, loading states, and glassmorphism styling"
```

**Testing Structure:**
```
"Write unit tests for NgRx reducer covering add, update, delete operations 
and async state management with proper TypeScript typing"
```

### Validation & Refinement Process

**Effects Implementation:**
- AI provided basic effect structure, but I had to modify the functional approach for standalone components
- Added proper error handling and loading state management
- Integrated with our specific service interface

**Component Logic:**
- Enhanced AI-generated drag-drop code to correctly map container IDs to task statuses
- Added proper TypeScript typing that AI initially missed
- Implemented inline editing functionality that wasn't in the initial AI output

**Service Design:**
- AI suggested basic Observable patterns, but I added realistic error simulation (10% failure rate)
- Enhanced with proper delay timing for better UX demonstration
- Added console logging for debugging during development

**Testing Coverage:**
- Expanded AI test suggestions to include edge cases and error scenarios
- Added proper mock setup for NgRx testing
- Enhanced assertions beyond basic functionality checks

The key was using AI as a starting point while applying critical thinking to ensure production quality and adherence to our specific requirements.

## Testing

The application includes comprehensive unit tests covering critical functionality:

### Test Coverage
- ✅ NgRx reducer operations (add, update, delete, status changes)
- ✅ Component user interactions (edit, delete, drag-drop)
- ✅ Async state management (loading states, error handling)
- ✅ Selector logic for data filtering

### Running Tests
```bash
# Run all tests
ng test

# Run tests with coverage
ng test --code-coverage

# Run tests in CI mode
ng test --watch=false --browsers=ChromeHeadless
```

## Key Implementation Details

**State Management:**
- Immutable state updates using NgRx patterns
- Optimistic UI updates for better user experience
- Proper loading and error state handling

**AI Priority System:**
- Mock service simulates realistic API delays (500ms)
- 10% error rate for demonstration of error handling
- Automatic priority assignment on task creation

**Drag & Drop:**
- Angular CDK DragDrop with cross-column support
- Visual feedback during drag operations
- Automatic status updates in store

**Performance Considerations:**
- OnPush change detection strategy ready
- Efficient selectors with memoization
- Minimal re-renders through proper state structure

## Development Notes

This project demonstrates modern Angular development practices:
- Standalone components over NgModules
- Functional programming patterns in effects
- Type-safe state management
- Clean component architecture with single responsibility
- Comprehensive error handling

The AI integration shows thoughtful collaboration between human oversight and AI assistance, resulting in production-ready code that maintains high standards while leveraging AI for efficiency.

```
