import { describe, it } from 'mocha'
import { expect } from 'chai'
import chunks from './chunks'

describe('chunks', () => {
  it('works', async function() {
    async function* range(n: number): AsyncIterable<number> {
      for (let i = 0; i < n; i++) {
        yield i
      }
    }

    const result = []
    for await (const chunk of chunks(range(10), 3)) {
      result.push(chunk)
    }

    expect(result).to.deep.equal([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]])
  })
})
