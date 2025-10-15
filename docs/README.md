# Documentation Structure

This directory contains all planning, design, and development documentation for the portfolio website.

## Directory Organization

### `/planning`
Product and technical planning documents:
- **`context-pack.md`** - Context engineering output (problem definition, decisions)
- **`prd/`** - Product Requirements Document
  - `001-prd-portfolio-website.md` - Full PRD with 27 functional requirements
- **`specs/`** - Technical specifications
  - `design-spec.md` - Frontend visual spec (components, layouts, accessibility)
  - `data-spec.md` - Database schema and Payload collections
  - `api-spec.md` - API contracts and endpoints
  - `events-spec.md` - Analytics and instrumentation
  - `system-spec.md` - Architecture and deployment
  - `spec-index.md` - Traceability map (requirements → specs)
  - `wireframes/` - ASCII wireframes for key components
- **`design-system/`** - Design tokens documentation
  - `design-tokens.md` - Complete design system from Figma (colors, typography, spacing, responsive)
- **`tasks/`** - Implementation task breakdown
  - `tasks-portfolio-website.md` - 24 parent tasks with subtasks and testing requirements

### `/design-system`
Design assets and tokens:
- **`figma-variables/`** - Exported Figma variable JSON files
  - `Colors.json` - Light/Dark mode color system
  - `Typography.json` - Responsive typography (Desktop/Mobile)
  - `Spacing.json` - Responsive spacing scale
  - `Radius.json` - Border radius values

### `/ai-dev`
AI development methodology and rules:
- `context-engineering.md` - Context gathering methodology
- `create-prd.md` - PRD creation guidelines
- `generate-spec.md` - Specification generation rules
- `generate-tasks.md` - Task breakdown methodology
- `process-task-list.md` - Task execution protocol

## Quick Links

- **Start Here:** [Context Pack](planning/context-pack.md)
- **Requirements:** [PRD](planning/prd/001-prd-portfolio-website.md)
- **Design Tokens:** [Design System](planning/design-system/design-tokens.md)
- **Tasks:** [Task List](planning/tasks/tasks-portfolio-website.md)
- **Figma:** https://www.figma.com/design/AzVxiCyRgc3uVWW9IaxkSk/Folio-Website

## Development Workflow

1. Review [Context Pack](planning/context-pack.md) for project overview
2. Consult [PRD](planning/prd/001-prd-portfolio-website.md) for requirements
3. Reference [Specs](planning/specs/) for implementation details
4. Follow [Tasks](planning/tasks/tasks-portfolio-website.md) for step-by-step execution
5. Use [Design Tokens](planning/design-system/design-tokens.md) for all styling

---

**Maintained by:** AI Development Assistant  
**Last Updated:** 2025-10-15
