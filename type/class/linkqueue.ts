export class Linkqueue<
  M,
  T extends { before: T | null; next: T | null; isTail: boolean; message: M },
> {
  next: T | null;
  tail: T | null;
  size: number;
  constructor() {
    this.next = null;
    this.tail = null;
    this.size = 0;
  }

  addLinkNode(linkNode: T) {
    const presize = this.size;
    this.size++;
    if (presize === 0 || this.next === null || this.tail === null) {
      linkNode.before = null;
      linkNode.next = linkNode;
      this.next = linkNode;
      this.tail = linkNode;
      return;
    }

    this.tail.isTail = false;
    linkNode.next = this.next; // 下一个指向第一位
    linkNode.before = this.tail; // 前一个指向原末尾
    this.tail.next = linkNode; // 原末尾的下一个指向现末尾
    this.tail = linkNode; // 变更末尾为现末尾
    return;
  }

  RemoveLinkNode(linkNode: T) {
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

      linkNode.next!.before = null;
      this.next = linkNode.next;
      this.tail.next = linkNode.next;

      return;
    }

    // 删除的为尾部

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
    const res: M[] = [];
    if (this.next === null) {
      return res;
    }
    let linkNode: T = this.next;
    res.push(linkNode.message);
    if (linkNode.isTail) {
      return res;
    }
    do {
      linkNode = linkNode.next!;
      res.push(linkNode.message);
    } while (!linkNode.isTail);
    return res;
  }
}
