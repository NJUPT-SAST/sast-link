import { Linkqueue } from "@/type/class/linkqueue";

interface messageProps {
  content: string;
  delay?: number;
}

interface messageType extends messageProps {
  icon: "info" | "error" | "loading" | "success";
}

interface LinkType {
  isTail: boolean;
  before: LinkType | null;
  next: LinkType | null;
  message: messageType;
}

class Message {
  #queue;
  static #instance: Message;

  static getInstance() {
    if (!Message.#instance) {
      this.#instance = new Message();
    }
    return this.#instance;
  }

  private constructor() {
    this.#queue = new Linkqueue<messageType, LinkType>();
  }

  console() {
    console.log(this.#queue.getMessage());
  }

  info(props: messageProps) {
    if (props.delay === undefined) {
      props.delay = 6;
    }
    const linkNode: LinkType = {
      isTail: true,
      before: null,
      next: null,
      message: { icon: "info", ...props },
    };

    this.#queue.addLinkNode(linkNode);

    setTimeout(() => {
      this.#queue.RemoveLinkNode(linkNode);
    }, linkNode.message.delay! * 1000);
  }
  getHead() {
    return this.#queue.next;
  }

  getQueue() {
    return this.#queue;
  }
}

export default Message.getInstance();
