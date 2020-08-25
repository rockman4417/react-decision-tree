# React Decision Tree
<p>A simple react module to enable chained questions, where each user response leads to a <em>unique</em> follow up question, ultimately ending in a final result based on that specific pathway of answers.</p>

**===THIS IS STILL A WIP====**

* Based off the code that was created for the [NZ COVID Financial Tool](https://covid19.govt.nz/business-work-and-money/financial-support/covid-19-financial-support-tool/)
* No limit on the number of questions you can ask in a given chain
* Made with accessibility in mind
* All inputs are radio buttons
* Option to include a customizable "moreInfo" dropdown for a given question to provide additional details to your user
* Features easy to understand class names to making CSS styling easier
* Embedded HTML allows customization of the results paragraph

<p> Check out the decision tree in action here!</p>

## Usage

```
import React, { Fragment } from "react";
import DATA from './data.json'
import { DecisionTree } from 'react-decision-tree-questionnaire';

export const myComponent = () => {
    return (
        <Fragment>
            <h1>My Decision Tree</h1>

            <DecisionTree
              data={DATA}
              resultsHeader={"Based on your results..."}
            />

        </Fragment>
    );
};
```

## Example
Click here to see the decision tree in action!

## Accepted JSON Format
Your data.json file should look like the following:

```
{
  "question": "What's your favourite animal?",
  "answers": [
    {
      "answer": "Dog",
      "subquestion": {
        "question": "Do you like being licked in the face?",
        "answers": [
          {
            "answer": "Yes",
            "subquestion": {
              "question": "Where's the best place to walk a dog?",
              "moreInfo": {
                "title": "What constitutes a walk?",
                "text": "Walking a dog is a shorthand to mean taking it outside to relive itself, play, run or indeed walk. Walks can be any length of time, and are expected to take place outdoors. A backyard or balcony is not considered a walk."
              },
              "answers": [
                {
                  "answer": "A park",
                  "result": {
                    "text": "<p><strong>Good human!</strong> Sounds like you'll make for an excellent dog friend. <a href='https://www.ecosia.org/images?q=dog' rel='noopener noreferrer'>Click here</a> to see some photos of dogs as a treat *pat pat*</p>"
                  }
                },
                {
                  "answer": "Around the block",
                  "result": {
                    "text": "<p><strong>Good human!</strong> Sounds like you'll make for an excellent dog friend. <a href='https://www.ecosia.org/images?q=dog' rel='noopener noreferrer'>Click here</a> to see some photos of dogs as a treat *pat pat*</p>"
                  }
                },
                {
                  "answer": "At a mall",
                  "result": {
                    "text": "<p><strong>Bad human!</strong> Dogs like being outside, and dogs can't wear most of the things available at a mall anyway.</p>"
                  }
                }
              ]
            }
          },
          {
            "answer": "No",
            "result": {
              "text": "<p><strong>It sounds like you might not like dogs very much.</strong> Dogs love you, why don't you love them back? Here is a <a href='https://www.ecosia.org/images?q=dog' rel='noopener noreferrer'>link</a> to see some images of dogs not licking you.</p>
            }
          }
        ]
      }
    },
    {
      "answer": "Cat",
      //...
    },
    {
      "answer": "Elephant",
      // ...
    },
    {
      "answer": "Penguin",
      // ...
    }
  ]
}
```
| Attribute       | Type     | Description     |
| :------------- | :----------: | -----------: |
|  **question** <br> *required* | string | Exists at every layer of the chain except for when a result is revealed |
| **answers** <br> *required* | array | An array containing all the answer options. There is no limit on the number of answer options you can include. |
| **answer** <br> *required* | string | This is the answer option for the previously listed question. |
| **subquestion** <br> *optional* | object<br> | What happens after a user clicks on a given answer? Either a new question (`subquestion`) or a `result`. `subquestion` is an object that contains the next layer of `question` and `answers`, which repeats itself until the chain of questioning has been completed. Only one `subquestion` can exist at a given layer. |
| **result** <br> *optional* | object<br> | What happens after a user clicks on a given answer? Either a new question (`subquestion`) or a `result`. `result` is an object that takes `text`. `text` accepts HTML markup. |
| **moreInfo** <br> *optional* | object | To provide user with further information about the question. This reveals an accordion with a display text (`title`) and `text` when clicked open. |
| **title / text** <br> as appears in `moreInfo` or `result`| string | -- |

## Accepted Parameters

| Attribute       | Type     | Description     |
| :------------- | :----------: | -----------: |
| **data** <br> *require* | JSON | As noted above |
| **resultsHeader** <br> *optional* | string | Suggested. The heading you would like to appear at the top of the results. This will be uniform across all results.
