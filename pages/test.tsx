import { Messagefn, GlobalsComponents } from "@/components/message";
import { useRef } from "react";

const m = Messagefn();

const Test = () => {
  const ref = useRef(0);
  return (
    <>
      <button
        onClick={() => {
          m.info({ icon: "info", delay: 10, content: `${ref.current}` });
          ref.current++;
        }}
      >
        add1
      </button>
      <button
        onClick={() => {
          m.info({ icon: "info", delay: 3, content: `message` });
          ref.current++;
        }}
      >
        add2
      </button>

      <div
        style={{
          color:"red",
          opacity:0.1,
          height: "200px",
          width: "200px",
          boxShadow: "1px 1px 1px black",
        }}
      >sadjhasjkfakjshfjaks</div>
      <GlobalsComponents />
    </>
  );
};

export default Test;
