/* Inline SVG icon markup — copied verbatim from the approved design.
   Rendered via dangerouslySetInnerHTML so stroke="currentColor" inherits color. */

export const categoryIcons: Record<string, string> = {
  drop: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 6-10 6-10z"/></svg>',
  lip: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11c2.5-2.4 5.5-2.4 8 0 2.5-2.4 5.5-2.4 8 0-2.2 3-5.2 4-8 1.8-2.8 2.2-5.8 1.2-8-1.8z"/></svg>',
  comb: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M7 7v10M11 7v10M15 7v10M19 7v6"/></svg>',
  lotion: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="9" width="8" height="12" rx="2"/><path d="M11 9V6h3l1 2"/></svg>',
  perfume: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="9" width="8" height="11" rx="2"/><path d="M10 9V6h4v3M11 3h2"/></svg>',
  shower: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v3M6 11h12a6 6 0 0 0-12 0zM9 15v2M12 16v2M15 15v2"/></svg>',
  eye: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>',
  spark: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></svg>',
  gem: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l3 16 3-16"/></svg>',
  razor: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4-4M8 16l8-8 3 3-8 8zM13 7l4-4 3 3-4 4"/></svg>',
  gift: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 13h16M12 9v11M9 9a2 2 0 1 1 3-2 2 2 0 1 1 3 2"/></svg>',
  brush: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c2 0 3-1 3-3l8-8-3-3-8 8c-2 0-3 1-3 3z"/><path d="M14 6l4-4 2 2-4 4"/></svg>',
  leaf: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 6-13 14-14C18 13 13 19 5 19z"/><path d="M5 19c3-4 7-6 10-7"/></svg>',
};

/** The SHRINGAR monogram mark used in the footer / brand lockups. */
export const logoMark =
  '<svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8CBA0"/><stop offset="0.5" stop-color="#D8B08C"/><stop offset="1" stop-color="#A87E2E"/></linearGradient></defs><circle cx="24" cy="24" r="22.2" fill="none" stroke="url(#lg)" stroke-width="1"/><circle cx="24" cy="24" r="18.6" fill="none" stroke="url(#lg)" stroke-width="0.6" stroke-dasharray="1.4 2.6"/><g stroke="url(#lg)" stroke-width="1.4" fill="none" stroke-linecap="round"><path d="M24 13c-3.4 3.2-3.4 8.4 0 11.6 3.4-3.2 3.4-8.4 0-11.6Z"/><path d="M24 24.6c3.4-3.2 8.6-3.1 11.4.4-3.9 2.3-8.9 1.3-11.4-.4Z"/><path d="M24 24.6c-3.4-3.2-8.6-3.1-11.4.4 3.9 2.3 8.9 1.3 11.4-.4Z"/></g><circle cx="24" cy="24" r="2.1" fill="url(#lg)"/><circle cx="24" cy="7.4" r="1.5" fill="url(#lg)"/></svg>';
