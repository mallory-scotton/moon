import { downloadFlareSolverr } from './binaries';

async function main() {
  const final = await downloadFlareSolverr();

  console.log(final);
}

main();