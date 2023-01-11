export interface IStanding {
    team: ITeam;
};

export interface ITeam {
    id: string;
    uid: string;
    location: string;
    name: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    isActive: boolean;
    logos: {
        href: string;
        width: number;
        height: number;
        alt: string;
        rel: string[];
        lastUpdated: string;
    }[];
    isNational: boolean;
};