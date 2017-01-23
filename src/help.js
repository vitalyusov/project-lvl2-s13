export default () => {
  const helpText = `Config Compare.

Usage:
  conf-compare.js <first-config> <second-config>
  conf-compare.js -h | --help
  conf-compare.js --version

Options:
  -h --help     Show this screen.
  --version     Show version.

  `;
  console.log(helpText);
};
