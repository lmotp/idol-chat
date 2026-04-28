export interface ClassMeetingDay {
  _id?: string;
  [key: string]: unknown;
}

export interface ClassMeetingRecord {
  _id: string;
  name: string;
  day: string;
  time: string;
  place: string;
  price: string | number;
  attendMember: string[];
  classId?: {
    _id: string;
    className: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface ClassInviteRecord {
  _id: string;
  profileimg?: string;
  nickname?: string;
  myself?: boolean;
  location?: string;
  info?: {
    _id: string;
    thumnail?: string;
    className: string;
    category: string;
    hashTag: string[];
    location: string;
    [key: string]: unknown;
  };
  createdTime?: string;
  [key: string]: unknown;
}

export interface ClassSummary {
  _id: string;
  className: string;
  classTarget: string;
  location: string;
  category: string;
  hashTag: string[];
  member: Array<string | { _id?: string }>;
  thumnail?: string;
  makeUser?: string;
  meetingDay?: ClassMeetingRecord[];
  [key: string]: unknown;
}

export interface ClassMemberRecord {
  _id?: string;
  classes?: string;
  profileImg?: string;
  profileimg?: string;
  nickName?: string;
  nickname?: string;
  mySelf?: string;
  myself?: boolean;
  location?: string;
  state?: string;
  [key: string]: unknown;
}

export interface ClassInviteCandidate {
  _id?: string;
  profileimg?: string;
  nickname?: string;
  myself?: boolean;
  location?: string;
  [key: string]: unknown;
}

export interface ClassDetail extends ClassSummary {
  member: string[];
}
