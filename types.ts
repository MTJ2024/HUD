
export interface PlayerStatus {
  health: number;
  armor: number;
  hunger: number;
  thirst: number;
  stamina: number;
  stress?: number;
}

export interface PlayerInfo {
  id: number;
  name: string;
  job: string;
  jobGrade: string;
  cash: number;
  bank: number;
  blackMoney: number;
  onlinePlayers: number;
}

export interface VoiceStatus {
  level: number; // 1: whisper, 2: normal, 3: shout
  isTalking: boolean;
  isRadio: boolean;
}

export interface LocationInfo {
  street: string;
  zone: string;
  direction: string;
}

export interface HudState {
  visible: boolean;
  status: PlayerStatus;
  info: PlayerInfo;
  voice: VoiceStatus;
  location: LocationInfo;
  serverName: string;
}
