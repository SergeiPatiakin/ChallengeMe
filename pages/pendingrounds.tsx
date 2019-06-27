import AppContainer from '../components/AppContainer'
import { RoundList } from '../components/RoundsList'

export default () => (
  <AppContainer titleParts={['Pending Rounds']}>
    <RoundList type="uncompleted" />
  </AppContainer>
)
