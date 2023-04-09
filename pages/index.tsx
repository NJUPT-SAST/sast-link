import { Input } from "@/components/input/inedx";
import { Button } from "@/components/button";
import { A } from "@/components/a";

export default function Home() {
  return (
    <>
      <Input defaultValue={"123"} />
      <Button>登录</Button>
      <A href="./">SAST 飞书登录</A>
    </>
  );
}
