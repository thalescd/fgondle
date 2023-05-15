export enum NpTarget {
    Support = 'Support',
    SingleTarget = 'Single Target',
    AoE = 'AoE',
}

export enum GameState {
    Win = 1,
    Lose = 2,
    Playing = 3,
};

export enum Region {
    JP = 'JP',
    NA = 'NA',
};

export interface Servant {
    id: number;
    name: string;
    class: string;
    npType: string;
    npTarget: string;
    rarity: string;
    gender: string;
    icon: string;
}

export interface Option {
    icon: string;
    name: string;
}