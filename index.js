import { DecisionTreeContainer } from './decision-tree-container'

export const DecisionTree = (JSONdata, resultsHeader) => {
  return (
    <DecisionTreeContainer
      data={JSONdata}
      resultsHeader={resultsHeader}
    />
  )
}
