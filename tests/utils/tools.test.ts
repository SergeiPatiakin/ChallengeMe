import { dummyAdderFunction } from '../../utils/tools'

describe('dummyAdderFunction', () => {
  it('add 3 and 4', () => {
    const result = dummyAdderFunction(3, 4)
    expect(result).toBe(7)
  })
})
