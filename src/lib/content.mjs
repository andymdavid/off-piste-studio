export const INSIGHT_TOPICS = ['AI & Automation', 'SEO & Search', 'Content & Brand', 'Websites & UX', 'Growth & Leads', 'Small Business'];
export const formatDate = date => new Intl.DateTimeFormat('en-US', {month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(`${date}T00:00:00Z`));
