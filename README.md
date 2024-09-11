# Next.js Video Streaming Platform

This project is a responsive, SEO-optimized, and accessible video streaming platform built with [Next.js](https://nextjs.org/). The application features a seamless user interface and experience, with custom components designed for enhanced interactivity, including keyboard shortcuts and custom scrolling and dragging functionalities.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Accessing the Deployed Application](#accessing-the-deployed-application)
- [Project Structure](#project-structure)
- [Challenges and Solutions](#challenges-and-solutions)
- [Next Steps](#next-steps)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Deployment**: Vercel

## Features

- Responsive design for all devices
- Accessible components with keyboard shortcuts
- SEO optimization for better search engine visibility
- Custom scrolling and drag functionalities
- Component-based architecture for maintainability and scalability

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or later)
- npm or yarn

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ardaakkiz/nextjs-video-streaming-platform.git
cd nextjs-video-streaming-platform
npm install
# or
yarn install
```

### Running Locally

Start the development server with:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application running locally.

### Accessing the Deployed Application

The project is deployed on Vercel. You can access it here:

[https://nextjs-video-streaming-platform.vercel.app](https://nextjs-video-streaming-platform.vercel.app)

## Project Structure

The main components of the project include:

- **Navbar**: A responsive navigation bar with links to various sections and account controls.
- **FeaturedSlider**: A component that displays featured videos with custom scrolling and drag capabilities.
- **CardHolder**: Displays categories of videos with custom horizontal scrolling.
- **FilmCard**: Individual card components for displaying video thumbnails and detailed information.
- **VideoPlayer**: A custom video player component with interactive controls such as play, pause, volume control, and progress tracking.
- **Footer**: Contains links to additional information and social media icons.

## Challenges and Solutions

1. **Ensuring Additional Information Visibility for Cards**:

   - **Problem**: Horizontal overflow settings interfered with vertical content visibility, preventing seamless display of additional card information.
   - **Solution**: Implemented custom horizontal scrolling with CSS adjustments, event handlers, and momentum effects, ensuring smooth y-axis visibility.

2. **Slider Button Interference**:

   - **Problem**: Default slider controls interfered with custom button interactions, blocking click and hover events.
   - **Solution**: Removed default slider controls, added custom next/prev buttons, and implemented custom drag and scroll behavior for touch and wheel events.

3. **Flickering Control Layout Display**:

   - **Problem**: Video player controls flickered or did not display consistently.
   - **Solution**: Added event handlers for user activity and a timeout function to maintain control visibility based on user interaction.

4. **Vertical Input Range Slider Positioning**:

   - **Problem**: The use of CSS transform on sliders caused positioning issues.
   - **Solution**: Designed a custom slider component to ensure correct positioning and functionality.

5. **Dragging on Progress Bar Seamlessly**:
   - **Problem**: Confining drag interactions to the bar made navigation unintuitive.
   - **Solution**: Enhanced progress bar interactions to allow more fluid dragging behavior across the component.

## Next Steps

- Implement video detail and category pages to provide more in-depth content exploration.
- Add fullscreen customizations for a better viewing experience.
- Fix vertical slider touch dragging for enhanced mobile usability.
- Adjust controller layout and color schemes for improved accessibility.
- Introduce user accounts and profiles for personalized content.
- Implement user behavior analytics to gather insights for further improvements.

## Contributing

Contributions are welcome! If you have suggestions or find issues, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any questions or further information, please contact [Ali Arda Akkız](mailto:contact@example.com).
