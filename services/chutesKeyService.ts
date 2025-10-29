
import { dbService } from './db';

const CHUTES_SERVERS = [
    { id: 1, name: 'Server 1', key: 'cpk_6670036d8fa34019a0e57633974be86a.0dce1b81fd69535fbda051012064a30e.lRE9gF2tggYNm3RY4wQMhn0Q4l2wuKYT' },
    { id: 2, name: 'Server 2', key: 'cpk_d537856d255f492992218f5886f838af.0dce1b81fd69535fbda051012064a30e.QkLBWgsRakqubFS4cNOFTyKtEALR4t8n' },
    { id: 3, name: 'Server 3', key: 'cpk_857e52884c12411d9fbcd07dd3a9de4a.0dce1b81fd69535fbda051012064a30e.GswzodBbRvfkYZioxvkHitN7kIdZG9D1' },
    { id: 4, name: 'Server 4', key: 'cpk_329245da54294bc3be4dca70468b619e.0dce1b81fd69535fbda051012064a30e.ag2BbJYsDBKb9u7h3DL79axZVHnxk8T8' },
    { id: 5, name: 'Server 5', key: 'cpk_f3b57eac88b44aa288e7f3ea74f120ff.0dce1b81fd69535fbda051012064a30e.cnhmVvaXDF8s4ZmNosLECmp3fzrMHOzZ' },
    { id: 6, name: 'Server 6', key: 'cpk_d0ede59ceda74784a88628fe012845e4.0dce1b81fd69535fbda051012064a30e.KBX3uunfQNB3LPqGbiZrKFBSDTu753ln' }
];

const DEFAULT_SERVER_ID = 6;

export const getChutesServers = () => CHUTES_SERVERS.map(({id, name}) => ({id, name}));

export const getActiveChutesKey = async (): Promise<string> => {
    try {
        const setting = await dbService.getSetting('activeChutesServerId');
        const activeId = setting?.value as number | undefined;

        if (activeId !== null && activeId !== undefined) {
            const server = CHUTES_SERVERS.find(s => s.id === activeId);
            if (server) {
                return server.key;
            }
        }
    } catch (e) {
        console.error("Error getting active Chutes server from DB, using default.", e);
    }
    
    // Default to server 6 if nothing is set
    const defaultServer = CHUTES_SERVERS.find(s => s.id === DEFAULT_SERVER_ID)!;
    return defaultServer.key;
};
