import child_process from 'child_process'

beforeAll(async () => {
  // console.log(`cleaning the ${process.env.TEST_DB} db`)
  await child_process.execFileSync(`${process.env.PWD}/cleanDb.sh`, [
    process.env.TEST_DB || 'sparked',
    process.env.USER,
    process.env.PASS,
  ])
})
