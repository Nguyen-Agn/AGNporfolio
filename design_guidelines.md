# Portfolio Builder Platform Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Behance and Adobe Portfolio for their clean presentation of creative work and intuitive portfolio building tools. The platform emphasizes visual creativity while maintaining professional functionality.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 260 61% 66% (violet #8B5CF6)
- Secondary: 231 76% 66% (indigo #6366F1)  
- Background: 0 0% 100% (white #FFFFFF)
- Text: 232 77% 20% (dark indigo #1E1B4B)
- Accent: 258 90% 76% (light violet #A78BFA)
- Neutral: 210 40% 98% (off-white #F8FAFC)

**Dark Mode:**
- Primary: 260 61% 66% (maintains violet)
- Secondary: 231 76% 66% (maintains indigo)
- Background: 232 77% 8% (dark indigo base)
- Text: 0 0% 98% (near white)
- Accent: 258 90% 76% (light violet for contrast)
- Neutral: 232 50% 12% (dark neutral)

### B. Typography
- **Headings**: Gluten font family (Google Fonts)
- **Body Text**: System sans-serif stack
- **Hierarchy**: 48px/40px/32px/24px/20px/16px with corresponding weights (700/600/500/400)

### C. Layout System
**Tailwind Spacing Units**: Consistent use of 2, 4, 8, and 16 units
- Micro spacing: p-2, m-2
- Standard spacing: p-4, m-4, gap-4
- Section spacing: p-8, m-8, gap-8
- Large spacing: p-16, m-16

### D. Component Library

**Navigation**: Top navigation bar with logo, user avatar, and primary actions. Sticky positioning with backdrop blur effect.

**Portfolio Builder Interface**: 
- Left sidebar for templates and elements
- Center canvas with A4 preview and zoom controls
- Right panel for property editing
- Floating action buttons for save/publish

**Cards**: Clean white backgrounds with subtle shadows (shadow-sm), rounded corners (rounded-lg), and violet-indigo gradient accents on interactive elements.

**Forms**: Minimal input styling with focus states using primary violet. Labels above inputs, consistent spacing.

**Buttons**: 
- Primary: Solid violet with white text
- Secondary: Outline indigo with indigo text
- Ghost: Transparent with violet text
- All buttons use rounded-md corners

**Data Display**: Grid-based portfolio galleries with responsive columns (1/2/3/4 based on screen size). Preview cards with hover states showing portfolio details.

### E. Visual Treatments

**A4 Design Canvas**: Central design area with realistic paper shadow and margins, zoom controls, and ruler guidelines when active.

**Drag-and-Drop**: Visual feedback with dotted borders, highlight zones in accent violet, and smooth transitions.

**Template Gallery**: Grid layout with hover previews, categorized sections (Creative, Professional, Minimal), and quick-apply functionality.

**Responsive Behavior**: 
- Mobile: Single column, collapsible sidebar, touch-optimized controls
- Tablet: Two-column layout with adaptable panels
- Desktop: Full three-panel interface with optimal workflow

## Images
**Hero Section**: Clean gradient background (violet to indigo) with floating portfolio mockups. No large hero image needed - focus on product demonstration.

**Template Previews**: Screenshot thumbnails of actual portfolio designs showing variety and quality.

**Empty States**: Illustrated placeholders encouraging users to create their first portfolio, using brand colors and friendly messaging.

**User Portfolios**: Thumbnail previews in grid layouts with consistent aspect ratios and subtle borders.

The design emphasizes creativity within structure, allowing users to build professional portfolios while maintaining the platform's cohesive visual identity.