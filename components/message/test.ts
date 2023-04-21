// 测试数据
import message from ".";
const test = message;

test.info({ content: "1" });
test.info({ content: "2", delay: 3 });
test.info({ content: "3", delay: 4 });

test.console();

setTimeout(() => test.console(), 3000);

setTimeout(() => test.console(), 4000);

setTimeout(() => test.console(), 6000);
