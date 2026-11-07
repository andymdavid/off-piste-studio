const INDUSTRY_GROUPS = {
  trades: ['electricians', 'plumbers', 'builders', 'hvac', 'roofers', 'painters', 'landscapers', 'cleaners', 'pest-control', 'property-maintenance'],
  professional: ['accountants', 'bookkeepers', 'lawyers', 'mortgage-brokers', 'buyers-agents', 'real-estate', 'coaches'],
  health_creative: ['dentists', 'physiotherapy', 'photographers'],
};

function getRelatedIndustries(slug, allIndustries, count) {
  // Find which group this industry belongs to
  const group = Object.values(INDUSTRY_GROUPS).find(g => g.includes(slug)) || [];
  // Pick from same group first (excluding self), then fill from other groups
  const sameGroup = group.filter(s => s !== slug);
  const otherSlugs = Object.values(INDUSTRY_GROUPS).flat().filter(s => s !== slug && !sameGroup.includes(s));
  const ordered = [...sameGroup, ...otherSlugs].slice(0, count);
  return ordered.map(s => allIndustries.find(p => p.slug === s)).filter(Boolean);
}

function getDeterministicLocations(allLocations, count) {
  // Deterministic spread: Perth first, then capitals, then suburbs
  const priority = ['perth', 'sydney', 'melbourne', 'brisbane', 'fremantle', 'adelaide'];
  return priority.slice(0, count).map(s => allLocations.find(p => p.slug === s)).filter(Boolean);
}

function getDeterministicIndustries(allIndustries, count) {
  // Spread across groups: trades, professional, health
  const priority = ['electricians', 'accountants', 'dentists', 'plumbers', 'lawyers', 'builders', 'photographers', 'mortgage-brokers'];
  return priority.slice(0, count).map(s => allIndustries.find(p => p.slug === s)).filter(Boolean);
}

export function getPageLinks(page, type, industries, locations) {
  const groups = [];
  const industry = items => items.map(p => p.industry || p.title);
  const location = items => items.map(p => p.location || p.title);
  if (type === 'industry') groups.push({title:'We also build websites for', labels:industry(getRelatedIndustries(page.slug, industries, 4))});
  if (type === 'service' || type === 'location') groups.push({title:type === 'location' ? `Industries we serve in ${page.location || ''}` : 'Industries we serve', labels:industry(getDeterministicIndustries(industries, 6))});
  if (type !== 'location') groups.push({title:'Serving businesses in',labels:location(getDeterministicLocations(locations, 4))});
  return groups.filter(group => group.labels.length);
}
