import { table } from 'console'
import crypto from 'crypto'

const access = crypto.randomBytes(32).toString('hex')
const refresh = crypto.randomBytes(32).toString('hex')

table({access,refresh});