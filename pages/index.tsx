import AppContainer from '../components/AppContainer'
import { NewsItemList } from '../components/NewsItemList'

export default () => {
  return (
    <AppContainer titleParts={['Newsfeed']}>
      <NewsItemList />
    </AppContainer>
  )
}
