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

## Recent Changes

### July 17, 2025 - Production Fixes
- Fixed form visibility issues with improved placeholder text styling
- Resolved JSON parsing errors by standardizing API functions to use Neon serverless
- Enhanced error handling for better user experience
- Added Content-Type headers to ensure proper JSON responses
- Improved form validation and error messaging

### July 22, 2025 - Source Tracking Implementation
- Added comprehensive visitor source tracking to capture lead origins
- Implemented referrer tracking to see which websites send visitors
- Added UTM parameter capture (utm_source, utm_medium, utm_campaign) for campaign tracking
- Enhanced admin dashboard with color-coded source tracking badges
- Updated CSV export to include all source tracking data
- Fixed Zod validation to properly handle nullable UTM values
- Database schema expanded with source tracking columns

### July 19, 2025 - Store Types Feature Complete & UI Improvements
- Successfully implemented complete store types functionality from form to admin dashboard
- Fixed critical database schema issue where store_types column was missing from Drizzle schema
- Added "Other" option with dynamic text input for custom platforms (Amazon, eBay, Facebook Marketplace, etc.)
- Updated admin dashboard to properly display store types as badges with comma-separated parsing
- Enhanced scrollbar visibility with custom black styling for better user experience
- Store types now save correctly as comma-separated text and display as arrays in admin interface
- Updated testimonial to Faith, CEO of Floxyluxe Limited (health & fitness brand, Germany)

### July 17, 2025 - Admin Page Fix
- Fixed `/admin` route 404 errors with proper rewrite configuration
- Added `api/admin/leads.js` serverless function for admin dashboard
- Implemented client-side routing support for SPA
- Enhanced form separation with independent confirmation states
- Removed password display from admin login for security

### July 14, 2025 - Vercel Deployment Success
- Successfully deployed Omnostock sales page to Vercel
- Resolved build configuration issues (toaster imports, CSS compilation)
- Professional always-on hosting eliminates 15-minute sleep timeouts
- Form functionality working with PostgreSQL database
- Ready for custom domain configuration