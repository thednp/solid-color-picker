// https://github.com/lukewarlow/user-agent-data-types/blob/master/index.d.ts
export declare interface NavigatorUABrand {
  readonly brand: string;
  readonly version: string;
}

export declare interface NavigatorUAData {
  readonly brands: NavigatorUABrand[];
  readonly mobile: boolean;
  readonly platform: string;
}

export declare interface NavigatorUA extends Navigator {
  readonly userAgentData: NavigatorUAData;
}
