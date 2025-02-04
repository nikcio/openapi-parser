import { Validator } from '../lib/Validator'
import type {
  AnyObject,
  Filesystem,
  OpenAPI,
  ThrowOnErrorOption,
  ValidateResult,
} from '../types'
import { makeFilesystem } from './makeFilesystem'

/**
 * Validates an OpenAPI schema.
 */
export async function validate(
  value: string | AnyObject | Filesystem,
  options?: ThrowOnErrorOption,
): Promise<ValidateResult> {
  const filesystem = makeFilesystem(value)

  const validator = new Validator()
  const result = await validator.validate(filesystem, options)

  return {
    ...result,
    specification: validator.specification as OpenAPI.Document,
    version: validator.version,
  }
}
