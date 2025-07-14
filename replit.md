# OmnoStock - AI-Powered Inventory Management System

## Overview

OmnoStock is a comprehensive inventory management platform built for modern businesses operating across multiple channels and locations. The system combines AI-powered insights with real-time synchronization to help businesses manage their inventory efficiently across online stores, physical locations, and various sales channels.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React Single Page Application** built with Vite
- **UI Components**: Radix UI with Tailwind CSS for styling
- **State Management**: React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Dark/light mode support with system preference detection

### Backend Architecture
- **Express.js Server** with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Email Service**: Nodemailer with Gmail SMTP integration
- **Authentication**: Session-based authentication ready
- **API Design**: RESTful endpoints with proper error handling

### Database Schema
- **Users Table**: Basic user authentication
- **Waitlist Subscribers**: Email collection for pre-launch
- **Omnostock Leads**: Lead generation for sales inquiries
- **Row Level Security**: Implemented for secure data access

## Key Components

### 1. Waitlist System
- **Purpose**: Collect early access signups before product launch
- **Implementation**: Supabase integration with email validation
- **Features**: Duplicate prevention, email autoresponders, lead tracking

### 2. Lead Generation
- **Purpose**: Capture qualified leads for custom implementations
- **Form Fields**: Name, email, company, website, phone
- **Integration**: Direct database storage with error handling

### 3. Email System
- **Service**: Gmail SMTP with app passwords
- **Features**: Welcome emails, autoresponders, HTML templates
- **Fallback**: Graceful degradation if email service fails

### 4. UI/UX Components
- **Hero Section**: Animated landing with gradient backgrounds
- **Features Grid**: Modular showcase of platform capabilities
- **FAQ Section**: Accordion-style frequently asked questions
- **Mission Statement**: Company values and vision presentation

## Data Flow

### User Registration Flow
1. User enters email on landing page
2. Frontend validates email format
3. API checks for existing subscribers
4. Database stores/updates subscriber record
5. Email service sends welcome message
6. User receives confirmation feedback

### Lead Generation Flow
1. User fills out contact form
2. Frontend validates required fields
3. API processes lead data
4. Database stores lead information
5. Success/error feedback to user
6. Backend notifications for sales team

## External Dependencies

### Production Dependencies
- **Supabase**: Database and real-time features
- **Gmail SMTP**: Email delivery service
- **Tailwind CSS**: Styling framework
- **React Query**: Data fetching and caching
- **Radix UI**: Accessible component primitives

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and development experience
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Fast JavaScript bundling

## Deployment Strategy

### Multiple Deployment Options
1. **Render**: Full-stack deployment with PostgreSQL
2. **Netlify**: Static site deployment for frontend-only
3. **Vercel**: Serverless deployment alternative
4. **Namecheap**: Shared hosting with PHP backend option

### Environment Configuration
- **Database**: PostgreSQL connection string
- **Email**: Gmail credentials with app passwords
- **Supabase**: URL and anonymous key for client access
- **Build**: Node.js 18.x runtime environment

### Build Process
- **Client Build**: Vite bundles React app to `dist/public`
- **Server Build**: ESBuild compiles TypeScript to JavaScript
- **Static Assets**: Served from build directory
- **Environment**: Production/development mode switching

The system is designed to be deployment-flexible, with configurations for various hosting providers and both full-stack and static deployment options.