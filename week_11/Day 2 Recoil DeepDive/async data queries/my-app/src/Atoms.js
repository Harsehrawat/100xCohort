import { atom, selector } from 'recoil'
import axios from 'axios'

export const allNotificationsAtom =  atom({
    key : "allNotificationsAtom",
    default : selector({
        key : "FetchData",
        get : async()=>{
            const resp = await axios.get("https://mocki.io/v1/177793ec-6b53-4d89-8c48-5203458ecab8");
            return resp.data;
        }
    })
})

export const jobsAtom = atom({
    key : "jobsAtom",
    default : selector({
        key : "fetchJobs",
        get : async ()=>{
            const resp = await axios.get("https://mocki.io/v1/177793ec-6b53-4d89-8c48-5203458ecab8");
            return resp.data.jobs;            
        }
    })

})

export const meSelector = selector({
    key : "meSelector",
    get : ({get})=>{
        const allNotifications = get(allNotificationsAtom);
        return allNotifications.network +
        allNotifications.jobs +
        allNotifications.message +
        allNotifications.notification
    }
}) 