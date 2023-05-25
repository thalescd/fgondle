import { Servant, NpTarget } from '../utils/constants';

export function toNormalCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, (str) => {
            return str.toUpperCase();
        });
}

export function getStarRating(num: number): string {
    let stars: string = '';
    for (let i = 0; i < num; i++) {
        stars += '★';
    }
    return stars;
}

export function filterServantInfo(fullData: any[]) {
    let filteredData: Servant[] = [];

    for (const fullServant of fullData) {
        try {
            const id: number = fullServant.collectionNo;
            const name: string = fullServant.name;
            const className: string = toNormalCase(fullServant.className);
            const npType: string = toNormalCase(fullServant.noblePhantasms?.[0].card);
            let npTarget: NpTarget = NpTarget.Support;
            const rarity: string = getStarRating(fullServant.rarity);
            const gender: string = toNormalCase(fullServant.gender);
            const icon: string = fullServant.extraAssets.faces.ascension[1];

            if (typeof icon === "undefined") {
                throw new Error("No icon");
            }
            switch (fullServant.noblePhantasms[0].effectFlags[0]) {
                case "attackEnemyOne":
                    npTarget = NpTarget.SingleTarget;
                    break;
                case "attackEnemyAll":
                    npTarget = NpTarget.AoE;
                    break;
            }
            const data: Servant = {
                id: id,
                name: name,
                class: className,
                npType: npType,
                npTarget: npTarget,
                rarity: rarity,
                gender: gender,
                icon: icon
            };
            filteredData.push(data);
        } catch (error) {
            console.error(`ERROR: Servant ${fullServant.name} cannot be loaded`);
            continue;
        }
    }
    filteredData.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });
    return filteredData;
}