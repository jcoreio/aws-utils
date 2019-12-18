export default async function* chunks<T>(
  iterable: AsyncIterable<T>,
  size: number
): AsyncIterable<T[]> {
  let chunk = []
  for await (const item of iterable) {
    chunk.push(item)
    if (chunk.length === size) {
      yield chunk
      chunk = []
    }
  }
  if (chunk.length) yield chunk
}
