import { writable } from "svelte/store";

const NOW_PLAYING_API_URL =
    'https://splaying.sohamsen.workers.dev/api/nowplaying/8b5fda7c4d53bf85038500222e608423152dba132ebbe799cdc7fbfe0f2e7966';
const TOP_API_URL =
    'https://splaying.sohamsen.workers.dev/api/top/8b5fda7c4d53bf85038500222e608423152dba132ebbe799cdc7fbfe0f2e7966';

const fetchTopTracksArtistsGenres = async () => {
    type DataItem = {
        name: string;
        link: string;
    };

    const artists = {
        long_term: [] as DataItem[],
        medium_term: [] as DataItem[],
        short_term: [] as DataItem[]
    };
    const tracks = {
        long_term: [] as DataItem[],
        medium_term: [] as DataItem[],
        short_term: [] as DataItem[]
    };
    const genres = { long_term: new Set(), medium_term: new Set(), short_term: new Set() };

    const appendData = async (
        type: 'tracks' | 'artists',
        timeRange: 'long_term' | 'medium_term' | 'short_term'
    ) => {
        try {
            const data = await fetch(`${TOP_API_URL}?type=${type}&limit=5&time_range=${timeRange}`).then(
                (resp) => resp.json()
            );
            if (data.error) {
                return;
            }

            if (type === 'artists') {
                data.items.forEach((item: any) => {
                    if (!item.genres) return;
                    item.genres.forEach((genre: string) => genres[timeRange].add(genre));
                });
            }

            data.items.forEach((item: any) => {
                if (type === 'artists') {
                    artists[timeRange].push({
                        name: item.name,
                        link: item.link
                    });
                } else {
                    tracks[timeRange].push({
                        name: item.name,
                        link: item.link
                    });
                }
            });
        } catch (e) {
            return;
        }
    };

    await Promise.all([
        appendData('tracks', 'long_term'),
        appendData('tracks', 'medium_term'),
        appendData('tracks', 'short_term'),
        appendData('artists', 'long_term'),
        appendData('artists', 'medium_term'),
        appendData('artists', 'short_term')
    ]);

    return {
        artists,
        tracks,
        genres: {
            long_term: Array.from(genres.long_term) as string[],
            medium_term: Array.from(genres.medium_term) as string[],
            short_term: Array.from(genres.short_term) as string[]
        }
    };
};

export const nowPlayingSpotify = async () => {
    let nowPlayingData = undefined;
    try {
        const nowPlayingResp = await fetch(NOW_PLAYING_API_URL).then((resp) => resp.json());
        if (nowPlayingResp.spotify_running && nowPlayingResp.error === undefined) {
            nowPlayingData = {
                artists: nowPlayingResp.item.artists.map((artist: any) => ({
                    name: artist.name as string,
                    link: artist.link as string
                })),
                link: nowPlayingResp.item.link as string,
                name: nowPlayingResp.item.name as string
            };
        }
    } catch (e) {
        return;
    }
    return nowPlayingData;
};

export const topSpotify = async () => {
    const topSpotify = await fetchTopTracksArtistsGenres();

    return topSpotify;
}


export const spotifyData = writable({} as any);