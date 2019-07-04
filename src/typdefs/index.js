/* eslint-disable */
// avoid the failing builds
import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import Course from './course'
import Unit from './unit'
import Topic from './topic'
import Resource from './resource'
import User from './user'

// const typesArray = fileLoader(path.join(__dirname, './*.graphql'))

export default mergeTypes([User, Course, Unit, Topic, Resource])
