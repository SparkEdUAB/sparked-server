import child_process from 'child_process'

afterAll(async () => {
  console.log('cleaning the db')
  await child_process.execFile(`${process.env.PWD}/cleanCollections.sh`, [
    process.env.TEST_DB || 'sparked',
  ])
})
