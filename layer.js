import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './layer.scss'

export default function Layer(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMoreInfo = () => {
    setIsExpanded(!isExpanded);
  };
  const moreInfoClasses = classNames(
    'dt-more-info-content',
    isExpanded ? 'block' : 'hidden'
  );
  const iconClasses = classNames(
    'dt-more-info-icon',
    'fas',
    isExpanded ? 'fa-minus' : 'fa-plus'
  );

  const removeWhitespaces = (string) => string.replace(/ /g, ''); // for accessibility

  return (
    <div className="dt-layer-container">
      { props.heading &&
        <div className="dt-layer-heading">
          { props.heading + ':'}
        </div>
      }

      <fieldset>
        { props.question &&
          <legend>
            <span>{props.question}</span>
            <span className="visuallyhidden">(required)</span>
          </legend>
        }

        <div className="dt-radio-group">
          <div>
            <div>
              {
                props.answers.map((answer, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      id={removeWhitespaces(answer.answer)}
                      name={props.layerCount}
                      value={index}
                      onClick={() => props.onClick(answer, props.index)}
                      data-test="layer-input"
                      />
                    <span>
                      {answer.answer}
                    </span>
                  </label>
                ))
              }
            </div>
          </div>
        </div>

        <div className="dt-more-info-container">
          { props.moreInfo.preview
            && (
              <button
                type="button"
                className="dt-more-info-button"
                aria-expanded={isExpanded}
                onClick={() => toggleMoreInfo()}
              >
                <i className={iconClasses} />
                { props.moreInfo.preview }
              </button>
            )}
          <div className={moreInfoClasses}>
            <p dangerouslySetInnerHTML={{ __html: props.moreInfo.fullText }} />
          </div>
        </div>

      </fieldset>
    </div>
  );
}

Layer.defaultProps = {
  heading: '',
  moreInfo: {}
};

Layer.propTypes = {
  heading: PropTypes.string,
  question: PropTypes.string.isRequired,
  moreInfo: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string
  }),
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  layerCount: PropTypes.number.isRequired,
};
