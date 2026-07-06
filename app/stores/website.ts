import { defineStore } from "pinia";

export interface UserData {
    isAuthenticated: boolean;
    isEnabled: boolean;
    firstname: string;
    lastname: string;
    email: string;
    category: number;
    userId: number;
    userHash: string;
    userCity: string;
    userState: string;
    userIp: string;
    tbreadId: number;
    eventId: number;
}

export const useSiteStore = defineStore('siteStore', {
    state: (): UserData => ({
        isAuthenticated: false,
        isEnabled: false,
        firstname: '',
        lastname: '',
        email: '',
        category: 0,
        userId: 0,
        userHash: '',
        userCity: '',
        userState: '',
        userIp: '',
        tbreadId: 1044,
        eventId: 404
    }),
    actions: {
        initStore() {
            if(import.meta.client){
                try{
                    const data = localStorage.getItem('userData');
                    if(data){
                        const sessionData = JSON.parse(data);
                        this.$patch({
                            isAuthenticated: sessionData.isAuthenticated ?? false,
                            isEnabled: sessionData.isEnabled ?? false,
                            firstname: sessionData.firstname ?? '',
                            lastname: sessionData.lastname ?? '',
                            email: sessionData.email ?? '',
                            category: sessionData.category ?? 0,
                            userId: sessionData.userId ?? 0,
                            userHash: sessionData.userHash ?? '',
                            userCity: sessionData.userCity ?? '',
                            userState: sessionData.userState ?? '',
                            userIp: sessionData.userIp ?? '',
                            tbreadId: sessionData.tbreadId ?? 1044,
                            eventId: sessionData.eventId ?? 404
                        });
                    }
                }catch(e){
                    console.error('Erro ao ler userData do localStorage:', e);
                }
            }
        },

        login(userData: Partial<UserData>){
            this.$patch({
                isAuthenticated: true,
                isEnabled: userData.isEnabled ?? false,
                firstname: userData.firstname ?? '',
                lastname: userData.lastname ?? '',
                email: userData.email ?? '',
                category: userData.category ?? 0,
                userId: userData.userId ?? 0,
                userHash: userData.userHash ?? '',
                userCity: userData.userCity ?? '',
                userState: userData.userState ?? '',
                userIp: userData.userIp ?? '',
                tbreadId: userData.tbreadId ?? 1044,
                eventId: userData.eventId ?? 404
            });
            
            if(import.meta.client){
                localStorage.setItem('userData', JSON.stringify(this.$state));
            }
        },

        logout(){
            this.$reset();
            if(import.meta.client){
                localStorage.removeItem('userData');
            }
        }
    }
})