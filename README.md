# Craft Beer Emporium Frontend

This project is a React-based frontend application using Vite for Craft Beer Emporium, an online web store specializing in craft beers from breweries around the globe.

## Project Overview

Craft Beer Emporium's frontend is designed to be modular, scalable, and easily maintainable. It showcases a catalog of beers, allows for detailed views of individual beers, and includes a management interface for tracking sales and adding new products.

### Key Features

- Display a grid of beers with sorting and filtering capabilities
- Detailed view for individual beers
- Management view for top-selling beers and beer management
- Feature flag system for gradual feature rollout
- Responsive design for various screen sizes
- Lazy loaded components based on feature flags and pages for better optimization
- Fully accessible components for people with disabilities 

## Project Structure

The project follows a feature-based folder structure:

```
src/
  features/
    beerCatalog/
      components/
      store/
      api/
      types/
    beerManagement/
      components/
      store/
      api/
    beerRecommendations/
      components/
      store/
      api/
  shared/
    components/
    utils/
    types/
  config/
    featureFlags.ts
    appConfig.ts
  App.tsx
  index.tsx
  index.css
```

This structure allows for easy scalability and maintainability, with each feature having its own set of components, store, and API calls.

## Technologies Used

- React.js
- TypeScript
- Zustand for state management
- Visx for data visualization
- React Router for navigation
- Tailwind CSS for styling

## Testing

The project uses Vitest and React Testing Library for unit and integration testing. Test files are co-located with the components they test.

To run tests:

```bash
npm run test
```

## Feature Flags

The application uses a feature flag system to enable gradual rollout of new features. Current feature flags include:

- `USE_ML_RECOMMENDATION`: Enables machine learning-based beer recommendations
- `DATA_ENRICHMENT`: Enables enhanced beer data with additional attributes

Feature flags are managed in `src/config/featureFlags.ts`.

## Data Models

The application handles three types of beer data models:

1. `Beer`: Basic beer information
2. `BeerEnhancedData`: Extended beer information (available when `DATA_ENRICHMENT` is enabled)
3. `BeerWithSales`: Basic beer information with sales data

## Setup and Running

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

## Deployment

The application is designed to be deployed to a cloud environment. It supports containerization for easy deployment and scalability.

## Future Enhancements

- Integration with a backend microservice architecture
- Implementation of user authentication and personalized recommendations
- Enhanced data visualization in the management view
- Animation of chart visualizations
- Support for multiple languages and right-to-left layouts
