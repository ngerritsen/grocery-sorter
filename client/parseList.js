export default function parseList(value) {
  const lines = value.split('\n')
  const items = parseWith(lines, str =>
    namedGroupMatch(str, /^(?:• )?(\d)x (.+)/, ['amount', 'name'])
  );

  if (items.length > 0) {
    return items;
  }

  return parseWith(lines, str =>
    namedGroupMatch(str, /(.+) (\d)/, ['name', 'amount']) ||
    { name: str, amount: 1 }
  );
}

function parseWith(lines, matcher) {
  return lines
    .map(matcher)
    .filter(item => item && item.name);
}

function namedGroupMatch(str, regex, captureGroups) {
  const matches = str.match(regex);

  if (!matches) {
    return null;
  }

  return captureGroups.reduce((item, group, index) => ({
    ...item,
    [group]: matches[index + 1]
  }), {})
}
