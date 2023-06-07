export
function decode(url: string) {
  try { return decodeURIComponent(url) } catch (e) { }
  return url;
}
