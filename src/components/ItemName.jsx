const colors = {
  0: '#000000',
  1: '#0000AA',
  2: '#00AA00',
  3: '#00AAAA',
  4: '#AA0000',
  5: '#AA00AA',
  6: '#FFAA00',
  7: '#AAAAAA',
  8: '#555555',
  9: '#5555FF',
  a: '#55FF55',
  b: '#55FFFF',
  c: '#FF5555',
  d: '#FF55FF',
  e: '#FFFF55',
  f: '#FFFFFF',
}

function ItemName(props) {
  const { name, material } = props;

  if (!name) {
    return <div className="item-name default">{material.charAt(0) + material.substring(1).replaceAll('_', ' ').toLowerCase()}</div>
  }

  if (!name.includes('&')) {
    return <div className="item-name">{name}</div>
  } else {
    const elements = [];
    let lookingForCode = false;
    let currentCode = undefined;
    let chars = [];

    for (let char of name.split('')) {
      // console.log(`  ${char} - code: ${lookingForCode}, current: ${currentCode} (${lookingForCode} && ${/[a-fk-or0-9]/g.test(char)}) -- chars: ${chars.join('')}`);
      if (char === '&') {
        lookingForCode = true;
      } else if (lookingForCode && /[a-fk-or0-9]/g.test(char)) {

        // If there is no color (for example, bold or obfuscated) just skip the processing.
        if (colors[char] === undefined) {
          continue;
        }

        // We found a valid "&x" now we want to make a new element if applicable
        if (currentCode && chars.length > 0) {
          elements.push({ color: currentCode, name: chars.join('') })
        }

        // Reset values
        lookingForCode = false;
        currentCode = char;
        chars = [];
      } else {
        lookingForCode = false;
        chars.push(char);
      }
    }

    // If we have chars left over then add them
    if (chars.length > 0) {
      if (currentCode) {
        elements.push({ color: currentCode, name: chars.join('') });
      } else {
        elements.push({ name: chars.join('') });
      }
      chars = [];
    }

    // Build
    return <div className="item-name">{elements.map((element, idx) => {
      return <span style={{ color: `${colors[element.color]}` }} key={idx}>{element.name}</span>
    })}</div>;
  }
}

export default ItemName;