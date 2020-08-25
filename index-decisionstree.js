import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { useDebouncedCallback } from 'use-debounce';
import smoothscroll from 'smoothscroll-polyfill';

import Layer from 'layer';

const DecisionTree = (props) => {
  const [selectedAnswers, setSelectedAnswers] = useState([{ "answer": props.data, layerCount: 0 }]);
  const [layerCount, setLayerCount] = useState(1);
  const resultRef = useRef(null);
  const PPLlayerRef = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [delayShowResults] = useDebouncedCallback(
    () => {
      setShowResults(true);
    },
    600
  );

  const handleClick = (answer, layerLevel) => {
    setLayerCount(layerCount + 1);
    let newSelectedAnswers = selectedAnswers;
    if (selectedAnswers.length >= (layerLevel + 1)) {
      // if this is selecting an answer at an earlier level than what we've already selected
      // cut out the later level answers and results
      newSelectedAnswers = selectedAnswers.slice(0, layerLevel);
      setShowResults(false);
    }
    setSelectedAnswers([...newSelectedAnswers, { answer, layerCount }]);
  };

  const results = selectedAnswers.filter((selectedAnswer) => (selectedAnswer.answer.result))
    .map((a) => a.answer.result);

  if (selectedAnswers.length >= 1 && results.length >= 1) {
    // for screen reader accessibility. Bug in one of the major screen reader providers that reads the result before the rest of the layer options
    delayShowResults();
  }

  const scrollToSection = () => {
    let whichToScroll = null;
    let scrollOption = 'start';
    smoothscroll.polyfill();

    if (showResults) {
      whichToScroll = resultRef;
      if (window.innerWidth < 576) scrollOption = 'end';
    } else if (selectedAnswers.length >= 1) {
      whichToScroll = PPLlayerRef;
    }
    if (whichToScroll !== null && whichToScroll.current !== null) {
      whichToScroll.current.scrollIntoView({ behavior: 'smooth', block: scrollOption });
    }
  };

  useEffect(scrollToSection, [selectedAnswers, showResults]);

  return (
    <div>
    {
      selectedAnswers.map((selectedAnswer, index) => {
        const isLastItem = index + 1 === selectedAnswers.length;
        return selectedAnswer.answer.subquestion &&
        (
          <div className="form eligibility" key={selectedAnswer.layerCount}>
            <form>
              <div className="section-inner" ref={isLastItem ? PPLlayerRef : null}>
                <Layer
                  question={selectedAnswer.answer.subquestion.question}
                  answers={selectedAnswer.answer.subquestion.answers}
                  index={index + 1}
                  layerCount={selectedAnswer.layerCount}
                  onClick={handleClick}
                />
              </div>
            </form>
          </div>
        );
      })
    }

    <section aria-live="polite" aria-atomic="true">
      {
        showResults && results.length > 0 && (
          <div ref={resultRef} data-test="results">
            <h2>Support you can use</h2>
            {
              results.map((result, index) => (
                <div key={index}>
                  <div>
                  <p dangerouslySetInnerHTML={{ __html: result.text }} />
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </section>
    </div>
  )
}

PPLDecisionTree.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.shape({
    question: PropTypes.string,
    answers: PropTypes.array
  }).isRequired
}


exports.DecisionTree = DecisionTree
