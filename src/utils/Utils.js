export function fromMaterial(material) {
  return material.charAt(0) + this.replaceAll(material.substring(1).toLowerCase(), '_', ' ');
}

// Martin is using Chrome 78 (2019) for some reason... it doesn't have String#replaceAll
export function replaceAll(str, substr, replacement) {
  if (str.replaceAll) {
    return str.replaceAll(substr, replacement);
  }

  while (str.includes(substr)) {
    str = str.replace(substr, replacement);
  }
  return str;
}