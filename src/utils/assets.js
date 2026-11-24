export function getAssetUrl(path) {
  const cleanPath = String(path).replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}assets/${cleanPath.replace(/^assets\//, '')}`;
}
