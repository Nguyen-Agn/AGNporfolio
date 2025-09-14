# Portfolio Builder Platform

## Overview

This is a modern portfolio builder web application that allows users to create beautiful, professional portfolios using an A4-based design system. The platform provides an intuitive drag-and-drop interface with customizable templates, inspired by design platforms like Behance and Adobe Portfolio. Users can authenticate, create multiple portfolios, and share them easily.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: Radix UI components with shadcn/ui for consistent, accessible design system
- **Styling**: Tailwind CSS with custom design tokens following a violet/indigo color scheme
- **Typography**: Gluten font for headings, system sans-serif for body text

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with `/api` prefix for all endpoints
- **Session Management**: Express sessions with PostgreSQL session store
- **Error Handling**: Centralized error handling middleware with structured error responses

### Authentication System
- **Provider**: Replit Auth using OpenID Connect (OIDC)
- **Strategy**: Passport.js with OpenID client strategy
- **Session Storage**: Secure HTTP-only cookies with PostgreSQL backing
- **User Management**: Automatic user creation/update on authentication

### Data Architecture
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: 
  - Users table for authentication (required by Replit Auth)
  - Portfolios table with JSON content storage for flexible layouts
  - Sessions table for session persistence
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon Database serverless with WebSocket support

### A4 Canvas System
- **Design Approach**: A4 paper format as the foundation for portfolio layouts
- **Zoom Controls**: Built-in zoom functionality (25%-200%) with reset capability
- **Content Blocks**: Flexible JSON-based content system supporting text, images, and sections
- **Templates**: Predefined templates with customization options

### Portfolio Management
- **CRUD Operations**: Full create, read, update, delete functionality for portfolios
- **Content Storage**: JSON-based content structure for flexible layouts and styling
- **Template System**: Default template with extensibility for future template additions
- **Publishing**: Draft/published state management for portfolio visibility

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (PostgreSQL) via `@neondatabase/serverless`
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Authentication**: Replit Auth system with OpenID Connect
- **Session Storage**: PostgreSQL session store via `connect-pg-simple`

### UI and Frontend
- **Component Library**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with PostCSS

### Development Tools
- **Build Tool**: Vite with React plugin and TypeScript support
- **Development**: Replit-specific plugins for cartographer and runtime error handling
- **Fonts**: Google Fonts (Gluten family) loaded via CDN
- **Assets**: Static asset handling through Vite's asset system

### Runtime Environment
- **Platform**: Designed for Replit hosting environment
- **Environment Variables**: Database URL and session secrets required
- **Session Security**: Secure cookie configuration with HTTP-only and secure flags