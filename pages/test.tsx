import { Message } from "@/components/message";
import { useRef } from "react";

const Test = () => {
  const ref = useRef(0);
  return (
    <>
      <button
        onClick={() => {
          Message.error(`error`, 3);
          ref.current++;
        }}
      >
        add1
      </button>
      <button
        onClick={() => {
          Message.info(`message`, 4);
          ref.current++;
        }}
      >
        add2
      </button>
      <button
        onClick={() => {
          Message.success(`success`, 5);
          ref.current++;
        }}
      >
        add3
      </button>
      <button
        onClick={() => {
          Message.warning(`warning`, 2);
          ref.current++;
        }}
      >
        add4
      </button>

      <div
        style={{
          color: "red",
          opacity: 0.1,
          height: "200px",
          width: "200px",
          boxShadow: "1px 1px 1px black",
        }}
      >
        sadjhasjkfakjshfjaks
      </div>
    </>
  );
};

export default Test;
