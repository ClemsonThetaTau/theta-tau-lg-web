# Payload CMS Integration for Theta Tau Lambda Gamma Website

This document provides information about the Payload CMS integration for the Theta Tau Lambda Gamma website.

## Overview

Payload CMS has been integrated into the website to allow for easy content management of:

- Home page content (banner, pillars, socials)
- About Us page content (national history, chapter history, chapter stats)
- Countdown events
- Brothers information

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Next.js (already part of the project)

### Environment Variables

Make sure to set up the following environment variables in your `.env.local` file:

```
# MongoDB connection string
MONGODB_URI=mongodb://localhost/theta-tau-lg

# Server URL for CORS and CSRF protection
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Payload CMS secret key for JWT tokens
PAYLOAD_SECRET=your-payload-secret-key-change-me-in-production

# Payload CMS admin email and password for initial setup
PAYLOAD_ADMIN_EMAIL=admin@example.com
PAYLOAD_ADMIN_PASSWORD=password123
```

Replace these values with your actual MongoDB URI and a secure secret key for production.

### Installation

1. Install the required dependencies:

```bash
npm install payload
```

2. Start the development server:

```bash
npm run dev
```

3. Access the Payload CMS admin panel at:

```
http://localhost:3000/admin
```

## Content Structure

### Home Page Content

The home page content is stored in the `home-page-content` collection and includes:

- Banner (title, subtitle, location, image)
- Pillars (brotherhood, professionalism, service)
- Socials footer (social media links)

### About Us Content

The about us content is stored in the `about-us-content` collection and includes:

- National History (title, content, footer)
- Chapter History (title, content, image)
- Chapter Stats (title, stats)

### Countdown Events

Countdown events are stored in the `countdown-events` collection and include:

- Name
- Description
- Target Date
- Active Status
- Display Location

### Brothers

Brothers information is stored in the `brothers` collection and includes:

- Name
- First Name
- Last Name
- Major
- Badge Number
- Pledge Class
- Graduation Year
- Position
- Status
- Email
- User (relation to users collection)

## Migration from Firebase

A migration script is provided to help migrate data from Firebase to Payload CMS. The script is located at `src/payload/utilities/migrate-from-firebase.ts`.

To run the migration script:

```bash
npx ts-node src/payload/utilities/migrate-from-firebase.ts
```

The script will:

1. Migrate users from Firebase to Payload CMS
2. Create default content for home page, about us, and countdown events
3. Migrate brothers information from Firebase to Payload CMS

## Usage

### Editing Content

1. Log in to the Payload CMS admin panel at `http://localhost:3000/admin`
2. Navigate to the collection you want to edit
3. Make your changes and save

### Adding New Content

1. Log in to the Payload CMS admin panel
2. Navigate to the collection you want to add to
3. Click "Create New"
4. Fill in the required fields and save

### Managing Users

1. Log in to the Payload CMS admin panel
2. Navigate to the "Users" collection
3. Add, edit, or remove users as needed

## Development

### Adding New Collections

To add a new collection to Payload CMS:

1. Create a new file in `src/payload/collections/`
2. Define the collection schema
3. Import and add the collection to `src/payload/payload.config.ts`

### Customizing the Admin UI

To customize the Payload CMS admin UI:

1. Edit the styles in `src/payload/payload.css`
2. Update the admin layout in `src/app/admin/layout.tsx`

## Troubleshooting

### Common Issues

- **Connection Error**: Make sure MongoDB is running and the connection string is correct
- **Authentication Error**: Check that the admin email and password are set correctly
- **CORS Error**: Ensure the `NEXT_PUBLIC_SERVER_URL` is set to the correct URL

### Support

For more information about Payload CMS, visit the [official documentation](https://payloadcms.com/docs).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
