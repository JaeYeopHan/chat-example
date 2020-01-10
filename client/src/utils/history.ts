import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
export default history

export function push(path: string) {
  history.push(path)
}
