interface ResponseErrorType {
  Success: false;
  ErrCode: number;
  ErrMsg: string;
  Data: null;
}

interface ResponseSuccessType<T> {
  Success: true;
  Data: T;
}

export type ResType<T> = ResponseErrorType | ResponseSuccessType<T>;

/**
 * @param nickname 昵称
 * @param dep 当前所在部门
 * @param org 当前所在组织
 * @param email 用户个人邮箱
 * @param avatar 用户头像，存储url
 * @param bio 用户个人介绍
 * @param link 社群链接
 * @param badge 纪念卡
 * @param  hide 隐藏项
 */
export interface UserProfileType {
  nickname: string;
  dep: string | null;
  org: string | null;
  email: string;
  avatar: string | null;
  bio: string | null;
  link: string[] | null;
  badge: { title: string; description: string; create_at: string }[] | null;
  hide: string[] | null;
}

export interface EditableProfileType {
  nickname?: string | null;
  org_id?: number;
  bio?: string;
  link?: string[] | null;
  hide?: string[] | null;
}
