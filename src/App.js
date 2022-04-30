import React, { Fragment, useState } from "react";
import "./App.css";

const App = () => {
  let [lastCount, setLastCount] = useState(0);

  const [formData, setFormData] = useState({
    qNumber: [{ QCode: 0, Qtype: "input", question: "" }],
    // questions: [{ [`Q-${lastCount}`]: "" }],
  });

  const { qNumber } = formData;

  const changeHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let newValue = [];
    newValue = qNumber;

    newValue[lastCount] = {
      ...newValue[lastCount],
      question: value,
    };

    setFormData({ ...formData, qNumber: [...newValue] });
  };

  const addCountHandler = (e) => {
    e.preventDefault();

    if (qNumber[lastCount].question !== "") {
      const lastFieldCount = qNumber[qNumber.length - 1].QCode;
      setFormData({
        ...formData,
        qNumber: [
          ...qNumber,
          {
            QCode: lastFieldCount + 1,
            Qtype: "input",
            question: "",
          },
        ],
      });
      setLastCount(lastFieldCount + 1);
    } else alert();
  };

  const deleteAllCountHandler = (e) => {
    e.preventDefault();
    setFormData({
      qNumber: [{ QCode: 0, Qtype: "input", question: "" }],
    });
    setLastCount(0);
  };

  const removeCountHandler = (e, key) => {
    e.preventDefault();
    const newcount = qNumber?.filter((item) => item.QCode !== key);
    console.log(newcount);
    setFormData({
      qNumber: [...newcount],
    });
    setLastCount(newcount?.length - 1);
  };

  const checkEmptyHandler = (props) => {
    for (const i in props) {
      if (props[i] == "" || props[i] == [] || props[i] == 0) {
        return { value: false, index: i };
      } else return { value: true };
    }
  };

  const obj = {
    f: {},
    g: 0,

    b: "00",
    c: "01",
    a: "",
  };
  const check = checkEmptyHandler(obj);

  console.log(check);

  return (
    <form className="container mx-auto my-12">
      <div>
        <label
          className="font-semibold mb-1 flex justify-between self-center"
          htmlFor="questions"
        >
          <span>Add Your Questions</span>
          <div className="flex gap-4">
            {qNumber.length !== 1 ? (
              <button
                onClick={deleteAllCountHandler}
                className="px-4 py-2 bg-red-500 text-OldLace rounded text-center bolder hover:opacity-90 focus:border-0 cursor-pointer"
              >
                Delete All
              </button>
            ) : null}
            <button
              onClick={addCountHandler}
              className="px-4 py-2 bg-SpaceCadet text-OldLace rounded text-center bolder hover:opacity-90 focus:border-0 cursor-pointer"
            >
              Add
            </button>
          </div>
        </label>

        {/* {qNumber[lastCount].QCode !== 0 && (
          <> */}
        {qNumber?.map((item, index) => {
          return (
            <Fragment key={index}>
              <div
                className={
                  index !== lastCount
                    ? "w-full mt-2 relative  text-sm border-gray-200 border bg-gray-200 outline-gray-200 "
                    : "w-full mt-2 relative text-sm border-gray-200 border outline-gray-200 "
                }
              >
                <input
                  className="w-full p-2  outline-gray-200 bg-transparent"
                  placeholder="Enter Your Question"
                  name="question"
                  type={item.Qtype}
                  id="question"
                  autoComplete="false"
                  value={item.question}
                  onChange={changeHandler}
                  disabled={index !== lastCount}
                  required
                />
                {index !== lastCount ? (
                  <button
                    onClick={(e) => removeCountHandler(e, item.QCode)}
                    className=" px-4 py-2 absolute top-0 right-0 bg-red-500 text-OldLace rounded text-center bolder hover:opacity-90 focus:border-0 cursor-pointer"
                  >
                    -
                  </button>
                ) : null}
              </div>
            </Fragment>
          );
        })}
        {/* </>
        )} */}
      </div>
    </form>
  );
};

export default App;
