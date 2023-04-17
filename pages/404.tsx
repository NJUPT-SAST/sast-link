import Image from "next/image";
import notFound from "@/public/404 Not Found.gif";

const Custom404 = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>404</h1>
        <p>Oops! That page is Not Found</p>
        <Image src={notFound} alt="404 Page Not Found" />
      </div>
    </>
  );
};

export default Custom404;
