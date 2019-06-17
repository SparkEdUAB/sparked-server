/* eslint-disable */
// avoid the failing builds
import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, './*.graphql'))

export default mergeTypes(typesArray, { all: true })
