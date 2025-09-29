# Design Guidelines for Role-Based Login Page

## Design Approach
**Reference-Based Approach**: Modern authentication UI inspired by premium SaaS platforms, focusing on glass morphism aesthetics and professional enterprise login experiences.

## Core Design Principles
- **Glass Morphism UI**: Semi-transparent elements with subtle backdrop blur effects
- **Role-Based Authentication**: Three distinct user roles (Manager, Creative Team, Digital Marketer)
- **Minimal & Professional**: Clean, enterprise-focused design without social login clutter
- **Animation-to-Static**: Smooth entry animations that settle into a static, professional interface

## Color Palette
- **Primary Colors**: Violet accent (violet-400) for interactive elements and links
- **Background**: Clean background with subtle foreground overlays (foreground/5)
- **Glass Elements**: Semi-transparent cards with border and backdrop blur
- **Text Hierarchy**: Standard foreground, muted-foreground, and accent colors

## Typography
- **Primary Font**: Geist font family for modern, clean readability
- **Heading**: 4xl-5xl font-semibold with tight tracking for impact
- **Body Text**: Small to medium sizes with proper contrast ratios
- **Form Labels**: Small font-medium for clear field identification

## Layout System
- **Spacing**: Tailwind units of 3, 4, 5, 6, and 8 for consistent rhythm
- **Two-Column Layout**: 50/50 split on desktop (form left, hero image right)
- **Mobile-First**: Single column stack on mobile devices
- **Container**: Max-width constraint (max-w-md) for optimal form readability

## Component Library
### Form Elements
- **Glass Input Wrappers**: Rounded-2xl containers with border and backdrop blur
- **Password Toggle**: Eye/EyeOff icons from Lucide React
- **Primary Button**: Full-width violet primary button with rounded corners
- **Checkbox**: Custom-styled checkbox for "Keep me signed in"

### Layout Components
- **Form Section**: Centered content with proper spacing and animation delays
- **Hero Section**: Right-side image container with rounded corners (desktop only)
- **Responsive Grid**: Flex-based layout adapting to screen sizes

## Animations
- **Entry Animations**: Fade and slide effects with staggered delays (100ms-900ms)
- **Static End State**: All animations complete within first few seconds
- **Smooth Transitions**: Subtle hover states and focus transitions only

## Authentication Flow
- **Role-Based Login**: Single form handling three user types through backend validation
- **Email/Password Only**: No social authentication options
- **Form Validation**: Standard form validation with proper error states
- **Success Routing**: Role-based dashboard redirection after authentication

## Images
- **Hero Image**: Large landscape image (2160px width recommended) positioned on right side
- **Image Treatment**: Subtle rounded corners (rounded-3xl) with full coverage
- **Mobile Behavior**: Hero image hidden on mobile devices
- **No Overlays**: Clean image presentation without testimonial cards or text overlays

## Responsive Behavior
- **Desktop**: Two-column layout with prominent hero image
- **Tablet**: Maintained two-column layout with adjusted proportions  
- **Mobile**: Single-column form-only layout, hero image hidden
- **Viewport Units**: 100dvh/100dvw for full viewport coverage