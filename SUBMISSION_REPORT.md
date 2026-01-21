# Assessment Submission

**Candidate Name:** [Muhammad Waqas ]  
**Date:** [21.01.2026]  
**Time Spent:** [Hours]

## Task 1: Task List Component

### Approach
I planned to build a modular, reusable component architecture that would display tasks fetched from the API. I decided to create a custom hook (`useTasks`) to encapsulate the data fetching logic, making it reusable and easier to test. The component structure includes separate components for loading states, error handling, and individual task items to maintain clean separation of concerns.

### Implementation Details
I created a `TaskList` component that uses the `useTasks` hook to fetch tasks from the API. The hook manages loading, error, and data states internally. I built reusable `LoadingSpinner` and `ErrorMessage` components for consistent UI feedback. The `TaskItem` component displays individual tasks with visual indicators for status and priority using Material-UI chips.

I implemented utility functions for date formatting (`dateUtils.js`) and input sanitization (`validation.js`) to ensure security and proper data handling. The task list displays tasks in a clean, single-column layout that's responsive across devices. Each task card shows the title, description, status badge, priority badge, and due date with proper formatting.

### Challenges
One challenge I encountered was ensuring proper cleanup in the `useEffect` hook to prevent memory leaks when components unmount during API calls. I solved this by implementing an `isMounted` flag pattern that checks if the component is still mounted before updating state. Another challenge was maintaining consistent card heights. I addressed this by using CSS line-clamping for text overflow and setting minimum heights for cards.

---

## Task 2: Task Creation Form

### Approach
I designed a form with real-time validation to provide immediate feedback to users. I created a custom `useTaskForm` hook to manage form state, validation logic, and submission handling. This approach keeps the form component clean and makes the validation logic reusable. I planned for controlled components throughout to ensure proper React patterns.

### Implementation Details
The form includes four fields: title (required), description (optional), due date (optional), and priority (optional with default 'medium'). I implemented comprehensive validation using a separate `formValidation.js` utility file. Validation runs in real-time as users type, with error messages displayed below each field.

The form uses Material-UI components for consistent styling. I implemented proper error handling for both client-side validation and API errors. On successful submission, the form displays a success message via a snackbar, resets all fields, and automatically refreshes the task list by calling the `refetch` function passed from the parent component.

The form layout is responsive, fields stack vertically on mobile and use a two-column grid for date and priority on desktop. I ensured all form fields have proper ARIA labels and keyboard navigation support for accessibility.

### Challenges
The main challenge was coordinating the form submission with the task list refresh. I solved this by using a callback pattern where the `TaskList` component exposes its `refetch` function via a ref, which is then passed to the `TaskForm` component. This maintains loose coupling between components while enabling the required functionality.

Another challenge was ensuring the priority dropdown maintains a fixed width regardless of the selected value. I fixed this by adding explicit width constraints and a `renderValue` function to the Select component.

---

## Task 3: Filtering and Status Management

### Approach
I planned to add filtering capabilities directly into the `TaskList` component and enhance the `TaskItem` component to support status updates. I created a separate `TaskFilters` component for the filter dropdowns to keep the code organized. I decided to use dropdown filters rather than buttons for a cleaner interface, and made status chips clickable for intuitive status updates.

### Implementation Details
I enhanced the `useTasks` hook to accept filter parameters and pass them to the API. The `TaskFilters` component provides two dropdowns - one for status (all, pending, in-progress, completed) and one for priority (all, low, medium, high). Filters update the task list in real-time as users make selections.

For status management, I created utility functions in `statusUtils.js` to handle status cycling (pending → in-progress → completed → pending). The status chip in each task card is now clickable and cycles through these states. When clicked, it shows a loading state, calls the API to update the status, and refreshes the filtered list.

I added visual indicators with icons for each status and priority level to make them easily distinguishable. The filters maintain their state when status updates occur, ensuring a smooth user experience. I also added a "Clear Filters" button that appears when filters are active.

### Challenges
One challenge was ensuring the filtered view updates correctly after status changes while maintaining the current filter state. I solved this by having the status update handler call `refetch()` which automatically uses the current filter state. Another challenge was making the status chips visually distinct and clickable without being too intrusive - I achieved this with subtle hover effects and clear visual feedback during updates.

---

## Additional Features

### UI Design System
I implemented a minimalist design system with high-contrast black and white aesthetics. I chose DM Sans as the primary typeface for its distinctive, modern appearance. The design uses CSS variables for consistent theming, layered backgrounds with subtle texture, and purposeful animations that respect user motion preferences.

### Visual Indicators
I enhanced visual indicators throughout the application:
- Status chips with icons (clock for pending, play for in-progress, checkmark for completed)
- Priority chips with icons (arrows for low/medium/high)
- Colored left borders on task cards based on status
- Subtle background tints matching status colors
- Consistent icon usage in filter dropdowns

### Responsive Design
The application is fully responsive with mobile-first approach. All components adapt gracefully to different screen sizes, maintaining usability and visual hierarchy. Touch targets meet accessibility standards (minimum 44px).

---

## Code Quality Notes

I followed React best practices throughout:
- Functional components with hooks
- Custom hooks for reusable logic (`useTasks`, `useTaskForm`)
- Proper separation of concerns (utilities, hooks, components)
- Input sanitization and XSS protection
- Error boundaries and graceful error handling
- Accessibility features (ARIA labels, keyboard navigation, screen reader support)

The codebase is organized with a clear folder structure:
- Components in separate folders with their own CSS files
- Reusable utilities in the `utils` folder
- Custom hooks in the `hooks` folder
- Centralized exports using barrel files

I used Material-UI for consistent, accessible components while customizing the theme to match the brutalist design aesthetic. All form inputs are controlled components, and I implemented proper validation both client-side and server-side.

---

## Testing Notes

I tested the application across different scenarios:

**Task List:**
- Verified loading states display correctly
- Tested error handling with network failures
- Confirmed empty state shows when no tasks exist
- Tested with various task data combinations

**Task Form:**
- Tested all validation rules (empty title, invalid dates, etc.)
- Verified form submission and list refresh
- Confirmed form reset after successful submission
- Tested error handling for API failures

**Filtering and Status:**
- Tested all filter combinations (status, priority, combined)
- Verified status updates cycle correctly through all states
- Confirmed filtered view updates in real-time
- Tested edge cases (no tasks matching filters, rapid status clicks)

**Responsive Design:**
- Tested on mobile devices (iPhone, Android)
- Verified desktop layouts
- Confirmed touch targets are adequate
- Tested keyboard navigation throughout

**Accessibility:**
- Verified ARIA labels are present
- Tested keyboard navigation
- Confirmed screen reader compatibility
- Checked color contrast ratios meet WCAG AA standards

---

## Questions or Comments

The application is fully functional and meets all the requirements specified in the assessment. I focused on creating a clean, maintainable codebase with proper error handling and security considerations. The brutalist design system provides a distinctive visual identity while maintaining excellent usability and accessibility.

All three tasks are integrated seamlessly, and the application provides a smooth user experience for creating, viewing, filtering, and managing tasks.

I have gone for a simple approach but UI/UX can be made better always.
