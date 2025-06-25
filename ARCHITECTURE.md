# Architecture Decisions

I have changes the project from jsx to tsx as TSX enables static type checking, which helps catch errors during development instead of at runtime. If we think about scaling the application TypeScript will provide better code completion, refactoring, and documentation in editors, making code more reliable, maintainable.

## Component-Based Structure

The project is organized using React’s component-based architecture. All UI elements (Input, Button, ResultsList, Modal) are built as reusable components. This promotes separation of concerns, reusability, and easier testing.
Created a new Modal component for the alert message.

## Pages Directory

Screens are organized in the `pages/` directory. The main user flow is handled in `SearchPage.tsx`, which composes the UI from components and manages state.

## Custom Hooks for Logic

Reusable logic such as data fetching (`useGetStates`), debouncing input, and handling outside clicks (`useClickOutside`) are abstracted into custom hooks. This keeps components focused on rendering and interaction, while hooks manage side effects and shared logic.

## State Management

Local state is managed using React’s `useState` and `useEffect` hooks. Debounced input is used to optimize performance and reduce unnecessary API calls.

## Constant
- Added constant API url as a const as it allows you to quickly update the URL in one place if it changes—improving consistency and reducing errors

## Testing
- Added testing for filtering logic and that can be extended to any list of data it recieve either suburb or state and you can update the type of the result accordingly 

## Accessibility

Accessibility is a core consideration:

- Inputs are properly labeled and associated with their labels.
- ARIA attributes are used for the autocomplete and results list.
- Keyboard navigation and focus management are supported.
- Modal dialogs are accessible and can be closed with the keyboard.

## API Integration

Data is fetched from an external API using a custom hook. Loading and error states are handled gracefully.
As well as to have updated the vite.config that sets up a development proxy so that requests starting with `/proxy` are forwarded to `http://postcodeapi.com.au`, with `/proxy` removed from the path. This helps bypass CORS issues and lets your frontend easily access the external API during development.

## Extensibility

The architecture allows for easy addition of new features, such as more advanced filtering, additional pages, or improved accessibility.

## Rationale

This structure was chosen to:

- Keep logic and presentation separate.
- Make the codebase easy to navigate and extend.
- Ensure accessibility and performance best practices.
- Facilitate testing and future enhancements.

### Future implementation details that cannot (or should not!) be attempted in the alotted time.

## Comprehensive Unit and Integration Testing:

- Currently we have unit test for helpers but i would add thorough tests for all components, hooks, and user flows using tools like Jest and React Testing Library.

## Improved UI/UX

- Add loading skeletons, animations, and transitions for a more polished user experience. Display retry options or suggestions when the API is down or provide fallback data or offline support if the API is unavailable.

## Advanced Keyboard Navigation:

- Implement arrow key navigation, Home/End, and Escape to close the dropdown.

## Internationalization (i18n) Nice to have:

- Prepare the UI for multiple languages and right-to-left layouts. I would use i18n for that. As ABC is been read by a diverse audience this would be a real help.

## API caching 
- Cache API responses (in memory, localStorage, or IndexedDB) to reduce redundant network requests and improve performance.

## Pagination
- If the API supports it, implement infinite scroll for large result sets


