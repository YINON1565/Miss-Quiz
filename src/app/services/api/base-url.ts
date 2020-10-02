import { environment } from '../../../environments/environment';
console.log(environment.production, 'environment.production');

export const BASE_URL = environment.production ? '/api/' : '//localhost:3030/api/' ;
