import { useState } from "react";
import "./styles.css";
import image from "./survey_tiger.png";

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

function DropDown(props) {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <>
      <select
        className="option"
        onChange={function (event) {
          console.log(event.target.value);
          setSelectedValue(event.target.value);
        }}
        value={selectedValue}
      >
        <option value="">Single Question Type</option>
        <option value="multi">Multi Select</option>
        <option value="single">Single Select</option>
      </select>
      {selectedValue === "single" ? (
        <SingleSelectQuestion
          showQuestion={props.showQuestion}
          setSelectedValue={setSelectedValue}
        />
      ) : null}
      {selectedValue === "multi" ? (
        <MultiSelectQuestion
          showQuestion={props.showQuestion}
          setSelectedValue={setSelectedValue}
        />
      ) : null}
    </>
  );
}

function SingleSelectQuestion(props) {
  const { setSelectedValue, showQuestion } = props;
  return (
    <div class="single-question">
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Question: <input />{" "}
        </label>

        <label>
          Option 1 <input />
        </label>

        <label>
          Option 2 <input />
        </label>
        <button
          onClick={() => {
            setSelectedValue("");
          }}
        >
          Add Question
        </button>
        <button
          onClick={function () {
            showQuestion(true);
          }}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

function MultiSelectQuestion(props) {
  const { setSelectedValue, showQuestion } = props;
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      const newOptions = [...options, ""];
      setOptions(newOptions);
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  return (
    <div class="multi-question">
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Question:
          <input type="text" value={question} />
          {options.map((option, index) => (
            <div key={index}>
              <label>
                Option {index + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionChange(index, event)}
                />
              </label>
              {options.length > 1 && (
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  -
                </button>
              )}
              {options.length < 4 && (
                <button type="button" onClick={handleAddOption}>
                  +
                </button>
              )}
            </div>
          ))}
        </label>
        <button
          onClick={() => {
            setSelectedValue("");
          }}
        >
          Add Question
        </button>
        <button
          onClick={function () {
            showQuestion(true);
          }}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleCreateSurveyClick = () => {
    setShowLandingPage(false);
  };

  return (
    <main className="surver-container">
      <img src={image} alt="Survey Tiger" />
      {showLandingPage ? (
        <>
          <div>
            <Button onClick={handleCreateSurveyClick}>Create Survey</Button>
            <Button>Take Survey</Button>
          </div>
        </>
      ) : (
        <DropDown />
      )}
    </main>
  );
}
