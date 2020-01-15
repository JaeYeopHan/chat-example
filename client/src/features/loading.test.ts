import { loadingActions, loadingReducer } from './loading'

test('loadingActions open', () => {
  // Given
  const key = 'test'
  const prevState = {}

  // When
  const result = loadingReducer(prevState, loadingActions.start(key))

  // Then
  expect(result).toEqual({ [key]: true })
})

test('loadingActions close', () => {
  // Given
  const key = 'test'
  const prevState = {}

  // When
  const result = loadingReducer(prevState, loadingActions.finish(key))

  // Then
  expect(result).toEqual({ [key]: false })
})
