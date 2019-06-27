import AppContainer from '../components/AppContainer'
import { RoundList } from '../components/RoundsList'

export default () => (
  <AppContainer titleParts={['Completed Rounds']}>
    <RoundList type="completed" />
  </AppContainer>
)
