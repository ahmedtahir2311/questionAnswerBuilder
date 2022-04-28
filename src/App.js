import React, { Fragment, useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    questions: [],
    qNumber: [{ count: 1, type: "input" }],
  });

  const { qNumber, questions } = formData;

  const [lastCount, setLastCount] = useState(1);

  const addCountHandler = (e) => {
    e.preventDefault();
    const lastFieldCount = qNumber[qNumber.length - 1].count;
    setFormData({
      ...formData,
      qNumber: [...qNumber, { count: lastFieldCount + 1, type: "input" }],
    });

    setLastCount(lastFieldCount + 1);
  };

  return (
    <form className="container mx-auto my-12">
      <div>
        <label
          className="font-semibold mb-1 flex justify-between self-center"
          htmlFor="questions"
        >
          <span>Add Your Questions</span>
          <button
            onClick={addCountHandler}
            className="px-2 py-2 bg-SpaceCadet text-OldLace rounded text-center bolder hover:opacity-90 focus:border-0 cursor-pointer"
          >
            +
          </button>
        </label>

        {qNumber?.map((item, index) => {
          return (
            <Fragment key={index}>
              <input
                className={
                  item.count !== lastCount
                    ? "w-full mt-2 p-2 text-sm border-gray-200 border bg-gray-200 outline-gray-200 "
                    : "w-full mt-2 p-2 text-sm border-gray-200 border outline-gray-200 "
                }
                placeholder="Enter Your Job Title"
                name="questions"
                type={item.type}
                id="questions"
                //   value={jobTitle}
                // onChange={changeHandler}
                disabled={item.count !== lastCount}
                required
              />
            </Fragment>
          );
        })}
      </div>
    </form>
  );
};

export default App;
