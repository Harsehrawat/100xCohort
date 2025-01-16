import { atom,selector } from 'recoil'

export const connectionAtom = atom({
    key : "connectionAtom",
    default : 12
});

export const jobsAtom = atom({
    key : "jobsAtom",
    default : 3
})

export const messageAtom = atom({
    key : "messageAtom",
    default : 5
})

export const notificationAtom = atom({
    key : "notificationAtom",
    default : 110
})

export const myCountSelector = selector({
    key : "myCountSelector",
    get : ({get})=>{
        const connectionCount = get(connectionAtom);
        const jobsCount = get(jobsAtom);
        const messageCount = get(messageAtom);
        const notificationCount=  get(notificationAtom);

        return connectionCount+jobsCount+messageCount+notificationCount;
    }
})