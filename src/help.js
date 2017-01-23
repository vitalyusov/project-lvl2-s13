import program from 'commander';

export default () => {
  program
    .version('0.3.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<first_config> <second_config>')
    .parse(process.argv);
};
