# Member Locator

## Overview

This application allows users to search for members and view their locations on a map. The map is powered by Mapbox GL, and the search functionality is integrated with Algolia's instant search capabilities. Users can click on a member from the search suggestions to autofill the search bar and zoom into the selected member's location on the map.

## Features

- **Search Members**: Users can search for members using the search bar.
- **Member Details**: Displays member details including photo, name, and location.
- **Map Integration**: Visual representation of member locations on a Mapbox map.
- **Interactive Markers**: Clickable markers on the map that zoom in to the selected member's location.
- **Zoom Controls**: Buttons to zoom in and out on the map.

## Technologies Used

- **React**: For building the user interface.
- **Next.js**: For server-side rendering and static site generation.
- **Algolia**: For search functionality.
- **Mapbox GL**: For the interactive map.
- **Tailwind CSS**: For styling the application.

## Installation

1. **Clone the Repository**

    ```sh
    git clone https://github.com/Jatin-Rai/member-locator.git
    cd member-locator
    ```

2. **Install Dependencies**

    ```sh
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env.local` file in the root directory and add your Algolia and Mapbox API keys:

    ```env
    NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_algolia_search_api_key
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
    ```

4. **Run the Application**

    ```sh
    npm run dev
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

### Search Component

Located in `components/Search.jsx`, this component allows users to search for members. It uses Algolia's InstantSearch and displays search results.

### Map Component

Located in `components/Map.jsx`, this component displays the members on a Mapbox map. It also handles zooming in on members when they are selected from the search results.