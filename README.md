# E-Commerce Admin Dashboard

A modern, feature-rich admin dashboard for e-commerce websites built with Next.js 15, TypeScript, and Tailwind CSS 3.3.


## Features Implemented

### Authentication
- **Login/Logout System**: Secure login with demo credentials for testing
- **Protected Routes**: Dashboard routes are protected from unauthorized access
- **User Context**: Global user state management with React Context

### Dashboard
- **Statistics Overview**: Real-time product, category, and sales statistics
- **Data Visualization**: Clean, modern card-based visualization of key metrics
- **Trend Indicators**: Showing trends with upward/downward indicators
- **Quick Action Cards**: Fast access to common actions

### Product Management
- **Product Listing**: View all products with filtering and pagination
- **Product Details**: Detailed view of individual products
- **Add/Edit Products**: Forms to create and modify product information
- **Delete Products**: Remove products from inventory

### UI/UX Features
- **Dark/Light Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive layout for all screen sizes
- **Animated Transitions**: Smooth animations for improved user experience
- **Toast Notifications**: Feedback system for user actions
- **Interactive Elements**: Hover states, tooltips, and interactive components

### Performance Optimizations
- **React Query**: Efficient data fetching and caching
- **Component Memoization**: Optimized rendering of components
- **Dynamic Imports**: Code splitting for improved load times

## Technical Decisions

### Architecture
- **Next.js App Router**: Utilizing the latest Next.js 15 App Router for routing
- **React Context**: Global state management for authentication and theme
- **Separation of Concerns**: Organized file structure for maintainability

### UI Framework
- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **Custom Components**: Reusable UI components created for consistency
- **CSS Variables**: Theme variables for flexible styling
- **Component Customization**: Extended Tailwind with custom utilities

### Data Management
- **Fake Store API**: Integration with external API for demo data
- **React Query**: Efficient data fetching with caching and background updates
- **TypeScript Interfaces**: Strong typing for data models

### Authentication
- **JWT Tokens**: JSON Web Tokens for authentication (simulated in demo)
- **Protected Routes**: Client-side route protection with React Context

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables by creating a `.env.local` file in the root directory (if needed)
```
# Example environment variables
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Challenges Faced and Solutions

### Challenge 1: Tailwind CSS Configuration with Next.js 15
**Issue**: Encountered compatibility issues with Tailwind CSS 4.x in Next.js 15, particularly with custom utility classes like `border-border`.

**Solution**: 
- Downgraded to Tailwind CSS 3.3.3 for better compatibility
- Implemented custom color theme variables in the Tailwind configuration
- Created alternative utility classes to replace problematic ones

### Challenge 2: Custom Theme Implementation
**Issue**: Implementing a dark/light theme with custom color schemes that properly transitions.

**Solution**:
- Created a ThemeContext with React's Context API
- Used CSS variables and Tailwind's color system
- Added client-side hydration handling to prevent flash of incorrect theme
- Implemented transition animations for smooth theme switching

### Challenge 3: Dynamic Component Icons
**Issue**: Needed a flexible system for icons that could adapt to different contexts.

**Solution**:
- Created a polymorphic icon system that accepts both string references and React components
- Implemented SVG-based icons with dynamic coloring based on theme
- Added contextual awareness for icons to change based on the component's state

### Challenge 4: Responsive Layout Design
**Issue**: Creating a consistent experience across mobile, tablet, and desktop views.

**Solution**:
- Implemented a responsive sidebar that collapses on smaller screens
- Created responsive grid layouts with Tailwind's grid system
- Used different component arrangements based on screen size
- Added touch-friendly controls for mobile devices

## Project Structure
```
src/
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Dashboard and related pages
│   ├── login/            # Authentication pages
│   └── layout.tsx        # Root layout component
├── components/           # Reusable components
│   ├── ui/               # Base UI components (Button, Input, etc.)
│   └── ...               # Feature-specific components
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Authentication context
│   └── ThemeContext.tsx  # Theme context
├── lib/                  # Utilities and helpers
│   ├── api.ts            # API integration functions
│   ├── auth.ts           # Authentication helpers
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
└── styles/               # Global styles
    └── globals.css       # Global CSS including Tailwind directives
```

## Future Enhancements
- Order management system
- Customer relationship management
- Advanced analytics and reporting
- Multi-user access with role-based permissions
- Integration with payment gateways

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Fake Store API](https://fakestoreapi.com/) for demo product data
- [React Query](https://tanstack.com/query/latest) for data fetching