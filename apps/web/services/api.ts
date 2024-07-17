import axios from 'axios';

import { createApiClient } from '../api-client';

export const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000');