import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import * as Colors from '../common/Colors'
import { RoundResultType } from '../common/DataTypes'
import { callMainApi } from '../utils/clientUtils'
import { getTimeLabel } from '../utils/tools'
import { CenterContainer, MainScrollContainer } from './Containers'
import { MainEmptyState } from './MainEmptyState'
import { ServiceWorkerController } from './ServiceWorkerController'

const NewsItemElementWrapper = styled.div``
const NewsItemElement = styled.div`
  border: 1px ${Colors.theme3} solid;
  border-radius: 3px;
  margin: 4px;
  cursor: pointer;
  height: 92px;
  max-height: 92px;
  overflow: hidden;
  display: flex;
  position: relative;
`

const NewsItemContentWrapper = styled.div``
const NewsItemTitle = styled.p`
  margin-top: 0px;
  margin-bottom: 4px;
  margin-left: 16px;
  color: ${Colors.theme5};
`
const NewsItemDescription = styled.p`
  margin-top: 0px;
  margin-bottom: 4px;
  margin-left: 16px;
  color: ${Colors.theme4};
`

const UpdatedTimeLabel = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  color: ${Colors.disabledText};
`

interface Props {}

interface State {
  newsItems: any[]
}

const getResultDescription = (roundResultType: RoundResultType, resultBoolean: boolean | null, resultFloat: number | null) => {
  if (roundResultType === 'boolean') {
    return resultBoolean ? 'Success' : 'Failure'
  } else if (roundResultType === 'float') {
    return `${resultFloat}`
  } else {
    return 'a result'
  }
}

export class NewsItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      newsItems: [],
    }
  }
  public handleRefreshData = () => {
    callMainApi('GET', '/api/news-items')
      .then(response => response.json())
      .then((responseJson: any) => {
        this.setState({ newsItems: responseJson.newsItems })
      })
  }
  public componentDidMount() {
    this.handleRefreshData()
  }
  public render() {
    return (
      <MainScrollContainer>
        <ServiceWorkerController />
        <CenterContainer width={400}>
          {this.state.newsItems.length > 0 ? (
            this.state.newsItems.map(newsItem => (
              <NewsItemElementWrapper>
                <NewsItemElement>
                  <NewsItemContentWrapper>
                    <NewsItemTitle>
                      <strong>{newsItem.loserName}</strong> has completed a round
                    </NewsItemTitle>
                    <NewsItemDescription>
                      Achieved <strong>{getResultDescription(newsItem.roundResultType, newsItem.resultBoolean, newsItem.resultFloat)}</strong> in <strong>{newsItem.challengeName}</strong> for{' '}
                      <strong>{getTimeLabel(moment(newsItem.startTime), moment(newsItem.endTime))}</strong>
                    </NewsItemDescription>
                    <UpdatedTimeLabel>{moment.duration(moment(newsItem.updatedDate).diff(moment())).humanize(true)}</UpdatedTimeLabel>
                  </NewsItemContentWrapper>
                </NewsItemElement>
              </NewsItemElementWrapper>
            ))
          ) : (
            <MainEmptyState />
          )}
        </CenterContainer>
      </MainScrollContainer>
    )
  }
}
