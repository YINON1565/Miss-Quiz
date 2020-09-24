import { isDevMode } from '@angular/core';

export const BASE_URL = isDevMode ? '//localhost:3030/api/' : '/api/' ;
