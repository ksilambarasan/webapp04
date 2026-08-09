# NextGen Placement Consultancy Website

NextGen is a premium, highly responsive dark glassmorphic Single Page Application (SPA) built for a modern Placement Consultancy. It connects elite technical talent and executive leaders with future-proof corporate brands.

## 🚀 Key Features

- **Rich Glassmorphic Design System**: Modern aesthetic layout featuring neon indigo/cyan gradients, translucent glass overlays, and fluid floating micro-animations.
- **Client-Side SPA Router**: Smooth section transitions without full-page reloads, ensuring a premium application experience.
- **Service Detail Modal Overlays**: Clicking service cards displays comprehensive modal interfaces containing detailed deliverables dynamically injected.
- **Interactive Multi-Step Wizards**: Custom wizards with field validation, progressive steps tracker, and custom file upload styling for both Job Seeker and Employer registrations.
- **Real-Time Dynamic Dashboards**: 
  - **Job Seeker Dashboard**: Computes real-time match indices against open positions using registered skills tags, allowing users to apply instantly and monitor application states.
  - **Employer Dashboard**: Allows posting new vetted positions, monitors candidate match streams, and facilitates direct scheduling of candidate interviews.
- **Automated Testimonials Carousel**: Auto-rotating slider displaying reviews from engineering leads and candidates.
- **Full Mobile Responsiveness**: Tailored layout break-points and a customized sliding side drawer menu for mobile and tablet formats.

## 📂 File Architecture

- **[`index.html`](file:///e:/Projects/thagadur.in/index.html)**: Main HTML structure containing header navigation, sections (Home, About Us, Services, Job Seeker, Employer, Contact), dynamic dashboards, success toast alert nodes, and modal overlays.
- **[`style.css`](file:///e:/Projects/thagadur.in/style.css)**: Core style declarations including variables, custom background gradients, floating keyframe animations, grid layouts, form input status behaviors, and responsive query parameters.
- **[`app.js`](file:///e:/Projects/thagadur.in/app.js)**: Router routing controller, multi-step validations, service text dictionaries, dynamic dashboard matching engines, and mock scheduling handlers.

## 💻 Setup & Local Development

No compilation or build steps are required. Simply open `index.html` in any modern web browser or host it via a local development server.

### Local Server via VS Code (Live Server)
1. Install the "Live Server" extension in VS Code.
2. Right-click on `index.html` and select **Open with Live Server**.

### Local Server via Python
Alternatively, run the following command in the workspace directory to launch a local server:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Local Server via Node.js (npx)
You can also spin up a quick server using:
```bash
npx serve .
```
Then navigate to the port specified in your console output.
