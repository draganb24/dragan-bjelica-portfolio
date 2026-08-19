import listFilterImg from '../assets/images/reporting-list-filter.png';
import createModalImg from '../assets/images/reporting-create-modal.png';
import detailViewImg from '../assets/images/reporting-detail-view.png';

// Full case studies — shown as dedicated pages, linked from the Work section.
export const caseStudies = [
  {
    slug: 'reporting-platform',
    title: 'Reporting Platform for Machine & Workforce Data',
    result: 'Replaced years of scattered spreadsheets with a searchable, centralized reporting system.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'REST API'],
    highlights: [
      '4-entity PostgreSQL schema (report, report_entries, workers, machines) — no update/delete anomalies',
      'REST API: create/edit, filtering via JPA Specifications, machine/worker autocomplete',
      'Server-computed rates (km/t, mh/t) eliminate a class of data-entry error',
      'GPS-vs-self-reported hours discrepancy check the paper process couldn’t do',
    ],
    repoUrl: 'https://github.com/draganb24/constructionsite',
    frontendRepoUrl: 'https://github.com/draganb24/construction-front',
    image: listFilterImg,
    images: [
      { src: listFilterImg, caption: 'Filterable report list — by worker, machine, or date range' },
      { src: createModalImg, caption: 'Creating a report: structured entries instead of a free-form spreadsheet row' },
      { src: detailViewImg, caption: 'Detail view — auto-calculated rates (km/t, mh/t) alongside logged raw data' },
    ],
    sections: [
      {
        label: 'problem',
        heading: 'Problem',
        body: `The company had been accumulating dozens of Excel reports for years — redundant data, no fast way to search, and no clean way to compare this year's numbers against last year's. Every report lived as its own file, so there was no single source of truth.`,
      },
      {
        label: 'approach',
        heading: 'Approach & decisions',
        body: `I modeled the domain in PostgreSQL as four entities with single responsibilities: report, report_entries, workers, and machines. Separating entries from their parent report — rather than flattening everything into one wide table — avoided update and delete anomalies and kept each table answerable to one kind of change.

I chose a server-side, indexed database over local files because the reports needed to stay searchable years back, at a volume Excel physically can't hold onto without becoming unusable.

Rate fields like km/t and mh/t are computed server-side from logged raw data, not entered by hand — removing a class of data-entry error the spreadsheet version had no way to catch. The schema also tracks machine on/off times alongside worker-reported hours, so raw GPS-derived data can be compared against self-reported figures — a discrepancy check the paper process couldn't do at all.`,
      },
      {
        label: 'architecture',
        heading: 'API & backend design',
        body: `On top of the schema, I built a REST API in Spring Boot covering report creation and editing, filtering, autocomplete for machines and workers, and CRUD for the underlying resources. Filtering runs through Spring Data JPA specifications rather than hand-rolled queries, so new filter combinations (worker, machine, date range) compose without extra endpoints as requirements grow.`,
      },
      {
        label: 'result',
        heading: 'Result',
        body: `The team no longer stores files on disk or searches through spreadsheets by hand. Search and filtering are instant, and report history is centralized and consistent across years instead of fragmented across files.

After demoing the working app to leadership, a new requirement came directly out of that conversation — the GPS-vs-self-reported comparison — targeting a discrepancy they'd only been able to guess at before.`,
      },
    ],
  },
  {
    slug: 'research-publishing-dashboard',
    title: 'Research Publishing Dashboard',
    result: 'Gave a professor a searchable, backed-up archive in place of local Word files.',
    stack: ['Laravel', 'MySQL', 'Tabler'],
    highlights: [
      'MySQL schema: posts, media, users, sessions — rich-text and uploads without integrity loss',
      'Auth + route protection: only the owner edits, published work stays readable',
      'Schema built to scale with a growing volume of papers and files',
      'Replaced local Word files with a searchable, backed-up dashboard',
    ],
    repoUrl: 'https://github.com/draganb24/blog-app-admin-panel',
    image: null, // TODO: add screenshot
    sections: [
      {
        label: 'problem',
        heading: 'Problem',
        body: `A professor was writing academic papers in Word and storing them locally — no search, no backup, and no overview of what had already been published.`,
      },
      {
        label: 'approach',
        heading: 'Approach & decisions',
        body: `I designed a MySQL schema for a blog-style platform: posts, media files (images and documents), users, and sessions, with relations that support rich-text editing and file uploads without integrity loss. Technology choices — Laravel and Tabler — and hosting were set by the client; my scope was the data model and making sure it could scale with a growing volume of papers and files.`,
      },
      {
        label: 'architecture',
        heading: 'API & backend design',
        body: `I added authentication with route protection so only the owner could edit content, keeping the write path locked down while published work stayed readable. The schema was built to grow — new post types or media formats slot in without reshaping existing tables.`,
      },
      {
        label: 'result',
        heading: 'Result',
        body: `The professor now works from a dashboard instead of Word documents and local disk storage, with an organized, searchable archive of their published work.`,
      },
    ],
  },
];

// Shorter, secondary work — shown as compact entries linking out to the repo.
export const otherWork = [
  {
    slug: 'task-tool-nextjs',
    title: 'Task Tool (Next.js + Supabase)',
    summary: `First task in a Next.js codebase I hadn't worked in before. Used Supabase for auth instead of building it from scratch, dockerized the environment for a consistent local setup, and added Swagger docs so the API was readable by the team without extra explanation.`,
    stack: ['Next.js', 'Supabase', 'Docker', 'Swagger'],
    repoUrl: 'https://github.com/draganb24/flyrankai-be-01',
  },
  {
    slug: 'cafe-supply-panel',
    title: 'Supply Ordering Panel (Café)',
    summary: `An admin panel so workers at an isolated café location could order missing supplies directly, with automatic email notifications on order status. Chose MongoDB over a relational database — products and orders have no complex interdependencies and low volume, so a flexible schema cut overhead without losing structure.`,
    stack: ['Next.js', 'MongoDB'],
    repoUrl: null, // Under client NDA — no public repo
  },
  {
    slug: 'hr-contracts-platform',
    title: 'Workforce Contracts Platform (in progress)',
    summary: `For a client with ~600 employees on frequent short-term contracts, our team designed a Postgres schema linking workers, contracts, documentation, and time-off, with an admin view for expiring contracts and incomplete onboarding. Integrated carbone.io for bulk contract generation rather than building a custom PDF engine — the volume didn't justify the build cost.`,
    stack: ['Spring Boot', 'React', 'PostgreSQL', 'carbone.io'],
    repoUrl: null, // Under client NDA — no public repo
  },
];
