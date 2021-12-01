import { spawnSync } from 'child_process'
import path from 'path'

const __dirname = path
  .dirname(new URL(import.meta.url).pathname)
  .substring(process.platform === 'win32' ? 1 : 0)

const bin = path.resolve(__dirname, './outfile.cjs')
const playgroundDir = path.resolve(__dirname, './playground/')

function createProjectWithFeatureFlags(flags) {
  const projectName = flags.join('-')
  console.log(`Creating project ${projectName}`)
  const { status } = spawnSync(
    'node',
    [bin, projectName, ...flags.map((flag) => `--${flag}`), '--force'],
    {
      cwd: playgroundDir,
      stdio: ['pipe', 'pipe', 'inherit']
    }
  )

  if (status !== 0) {
    process.exit(status)
  }
}

const featureFlags = ['typescript', 'jsx', 'router', 'pinia', 'with-tests']

// The following code & comments are generated by GitHub CoPilot.
function fullCombination(arr) {
  const combinations = []

  // for an array of 5 elements, there are 2^5 - 1= 31 combinations
  // (excluding the empty combination)
  // equivalent to the following:
  // [0, 0, 0, 0, 1] ... [1, 1, 1, 1, 1]
  // We can represent the combinations as a binary number
  // where each digit represents a flag
  // and the number is the index of the flag
  // e.g.
  // [0, 0, 0, 0, 1] = 0b0001
  // [1, 1, 1, 1, 1] = 0b1111

  // Note we need to exclude the empty combination in our case
  for (let i = 1; i < 1 << arr.length; i++) {
    const combination = []
    for (let j = 0; j < arr.length; j++) {
      if (i & (1 << j)) {
        combination.push(arr[j])
      }
    }
    combinations.push(combination)
  }

  return combinations
}

const flagCombinations = fullCombination(featureFlags)
flagCombinations.push(['default'])

for (const flags of flagCombinations) {
  createProjectWithFeatureFlags(flags)
}
