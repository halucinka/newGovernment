import fs from 'fs'
import childProcess from 'child_process'
import {Promise} from 'bluebird'

Promise.promisifyAll(fs)
Promise.promisifyAll(childProcess)
