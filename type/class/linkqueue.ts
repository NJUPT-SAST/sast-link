export class Linkqueue<
  M extends { id: number; delay: number },
  T extends {
    timer: NodeJS.Timer;
    this: T;
    before: T | null;
    next: T;
    isTail: boolean;
    message: M;
  },
> {
  private next: T | null;
  private tail: T | null;
  private size: number;
  private static maxSize: number;
  private static idCount: number = 0;
  constructor(props: {
    next: T | null;
    tail: T | null;
    size: number;
    maxSize?: number;
  }) {
    this.next = props.next;
    this.tail = props.tail;
    this.size = props.size;
    Linkqueue.maxSize = props.maxSize ?? 20;
  }

  private createNode(linkMsg: M): [T, number] {
    const linkNode = {
      isTail: true, // 新加入的节点一定在尾部
      before: null, // 前一个结点也为null
      message: linkMsg, // message 为传入的数据
    } as T;
    linkNode.this = linkNode; // 保留对当前节点的引用
    const presize = this.size; // 获取添加前队列中节点的数量
    // 设置定时器
    linkNode.timer = setTimeout(() => {
      this.removeLinkNode(linkNode.this);
    }, linkMsg.delay * 1000);
    // 若添加前容量已满
    if (presize === Linkqueue.maxSize && this.next) {
      clearTimeout(this.next.timer); // 则清除头部的定时器
      this.removeLinkNode(this.next); // 并且移除当前头部。
    }
    this.tail !== null ? (this.tail.isTail = false) : (this.tail = null); // 设置原尾节点为false
    linkNode.before = this.tail; // 当前节点的前一个指向原尾节点
    linkNode.next = this.next === null ? linkNode : linkNode; // 当前节点的下一个指向队列的头
    return [linkNode, presize];
  }

  addLinkNode(linkMsg: M) {
    linkMsg.id = Linkqueue.idCount;
    Linkqueue.idCount = (Linkqueue.idCount + 1) % Linkqueue.maxSize;
    // 构建
    this.size++; // 当前节点数量大小
    // 若添加前队列中还没任何节点

    const [linkNode, presize] = this.createNode(linkMsg);
    if (presize === 0 || this.next === null || this.tail === null) {
      this.next = linkNode; // 设置其为头节点
      this.tail = linkNode; // 设置其为尾节点
      return;
    }
    // 队列中若已存在节点
    this.tail.next = linkNode; // 原末尾的下一个指向现末尾
    this.tail = linkNode; // 变更末尾为现末尾
    // 设置定时器
    return;
  }

  removeLinkNode(linkNode: T) {
    // 为 null 即是首位元素
    this.size--;
    if (linkNode === null) return;
    if (this.next === null) return;
    if (this.tail === null) return;

    if (linkNode.before === null) {
      // 仅有一个元素
      if (linkNode.isTail) {
        this.next = null;
        this.tail = null;
        return;
      }
      // 不止一个元素时
      linkNode.next.before = null;
      this.next = linkNode.next;
      this.tail.next = linkNode.next;

      return;
    }
    // 删除的为尾部并且不止一个元素
    if (linkNode.isTail) {
      linkNode.before.next = this.next;
      this.tail = linkNode.before;
      this.tail.isTail = true;
      return;
    }
    linkNode.before.next = linkNode.next;
    linkNode.next!.before = linkNode.before;
    return;
  }

  getMessage() {
    const res: {timer: NodeJS.Timer; this: T; message: M }[] = [];
    if (this.next === null) {
      console.log(res)
      return res;
    }
    let linkNode: T = this.next!;
    res.push({
      timer: linkNode.timer,
      this: linkNode.this,
      message: linkNode.message,
    });
    if (linkNode.isTail) {
      console.log(res)
      return res;
    }
    do {
      linkNode = linkNode.next!;
      res.push({
        timer: linkNode.timer,
        this: linkNode.this,
        message: linkNode.message,
      });
    } while (!linkNode.isTail);
    console.log(res)
    return res;
  }
}
