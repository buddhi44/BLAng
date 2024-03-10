// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    defaultauth: 'localData',
    firebaseConfig: {
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: ''
    },
    apiConfig:{
        baseURL: 'https://bluelotus360.co/CoreAPI/api/',
        applicationId: 'e365035a-dca8-4466-852e-8f2995f5d78f',
        useLocalEndPoint: false
    },

    getEndpoint() {
        if (this.apiConfig.useLocalEndPoint) {
            return 'https://localhost:7036/api/';
        }
        return 'https://bluelotus360.co/CoreAPI/api/';
    }



};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
