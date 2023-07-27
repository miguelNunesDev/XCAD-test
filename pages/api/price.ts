import type { NextApiRequest, NextApiResponse } from 'next'
import { Platforms } from '../../data';
import { PlatformStatus, PlatformsState } from '../../typings';

const fetchPrice = async (id: string) => {
    try {
        const raw = await fetch(Platforms[id].api);
        const data = await raw.json();

        if (!Platforms[id].isValidQuery(data)) return null;

        return Platforms[id].getPriceFromQuery(data);
    } catch (e) {
        console.error('Error in api:', id, 'Invalid api');
        return null;
    }
}

const calculateAveragePrice = (prices: Array<number>) => {
    const totalValues = prices.reduce((prev, curr) => curr + prev);
    return totalValues / prices.length;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const ids = req.query.activePlatforms;
    const prices: Array<number> = []
    const data: PlatformsState = { status: {}, price: 0 };

    if (!ids) { res.status(500).send('Not valid query'); return }

    // If only one plataform active
    if (!Array.isArray(ids)) {
        data.status[ids] = PlatformStatus.ACTIVE;
        data.price = await fetchPrice(ids);
        res.status(200).send(data);
        return;
    }

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const price = await fetchPrice(id);

        if (!price) { data.status[id] = PlatformStatus.ERROR; continue; }
        data.status[id] = PlatformStatus.ACTIVE;
        prices.push(price);
    }
    data.price = calculateAveragePrice(prices);
    console.log('Api fetched');
    
    res.status(200).json(data);
}
