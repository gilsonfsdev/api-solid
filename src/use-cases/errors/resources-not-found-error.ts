export class ResourcerNotFoundError extends Error {
  constructor() {
    super('Resources not found.')
  }
}
