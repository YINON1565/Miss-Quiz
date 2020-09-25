import { environment } from '../../../environments/environment';

export const BASE_URL = environment.production ? '/api/' : '//localhost:3030/api/' ;
