import AppContainer from '../components/AppContainer'
import { LoserList } from '../components/LoserList'

export default () => {
  return (
    <AppContainer titleParts={['Losers']}>
      <LoserList />
    </AppContainer>
  )
}
