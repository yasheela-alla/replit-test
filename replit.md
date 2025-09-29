# Overview

This is a task management application for Emmadi Jewelers, built with React, Express, and TypeScript. The application supports role-based authentication with three user types (Manager, Creative Team, Digital Marketer) and provides a comprehensive task management system for jewelry marketing content creation and approval workflows.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript, built using Vite
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with a custom design system featuring glass morphism effects
- **State Management**: React state with TanStack React Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Authentication**: Session-based authentication (storage interface prepared)
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **API Design**: RESTful API with `/api` prefix routing

## Design System
- **Component Library**: Custom shadcn/ui implementation with glass morphism styling
- **Color Scheme**: Neutral base with violet accents, professional enterprise focus
- **Typography**: Geist font family for modern readability
- **Layout**: Responsive grid system with mobile-first approach
- **Animations**: Subtle entry animations that settle to static professional interface

## Database Schema
- **Users**: Role-based user system (manager, creative_team, digital_marketer)
- **Tasks**: Comprehensive task management with content types, priorities, and workflow states
- **Task Comments**: Comment system for collaboration and approval feedback
- **Status Workflow**: Draft → In Review → Approved/Rejected → Completed

## Authentication & Authorization
- **Role-Based Access**: Three distinct user roles with different permissions
- **Login Flow**: Email/password authentication without social login options
- **User Management**: Database-driven user authentication with role-specific dashboards

## Task Management Features
- **Content Types**: Support for image, video, carousel, and text content
- **Workflow States**: Draft, In Review, Approved, Rejected, Completed
- **Priority Levels**: Low, Medium, High, Urgent
- **Assignment System**: Task assignment to team members
- **Campaign Organization**: Tasks grouped by marketing campaigns
- **Approval Process**: Manager approval with notes and rejection reasons

# External Dependencies

## Core Dependencies
- **Database**: PostgreSQL with Neon serverless driver
- **UI Components**: Radix UI primitives for accessible components
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography

## Development Tools
- **Build Tool**: Vite for fast development and building
- **Database Migration**: Drizzle Kit for schema management
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **Type Checking**: TypeScript with strict configuration

## Styling Framework
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Class Variance Authority**: Type-safe component variants
- **Tailwind Merge**: Conditional class merging utility

## Form & Validation
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod
- **Input OTP**: One-time password input component

## UI Enhancement
- **Embla Carousel**: Carousel component implementation
- **Vaul**: Drawer component for mobile interfaces
- **CMDK**: Command palette and search interface