/* tslint:disable */
/* eslint-disable */
/**
 * chsms
 * api docs
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';


/**
 * ChatApi - axios parameter creator
 * @export
 */
export const ChatApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerCreateChat: async (body: object, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('chatControllerCreateChat', 'body', body)
            const localVarPath = `/api/chat`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} chatId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerGetChatById: async (chatId: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'chatId' is not null or undefined
            assertParamExists('chatControllerGetChatById', 'chatId', chatId)
            const localVarPath = `/api/chat/getChat/{chatId}`
                .replace(`{${"chatId"}}`, encodeURIComponent(String(chatId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} senderId 
         * @param {string} recipients 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerGetChatByParticipants: async (senderId: string, recipients: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'senderId' is not null or undefined
            assertParamExists('chatControllerGetChatByParticipants', 'senderId', senderId)
            // verify required parameter 'recipients' is not null or undefined
            assertParamExists('chatControllerGetChatByParticipants', 'recipients', recipients)
            const localVarPath = `/api/chat`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (senderId !== undefined) {
                localVarQueryParameter['senderId'] = senderId;
            }

            if (recipients !== undefined) {
                localVarQueryParameter['recipients'] = recipients;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerGetChatsByUserId: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('chatControllerGetChatsByUserId', 'id', id)
            const localVarPath = `/api/chat/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ChatApi - functional programming interface
 * @export
 */
export const ChatApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ChatApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chatControllerCreateChat(body: object, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.chatControllerCreateChat(body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChatApi.chatControllerCreateChat']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} chatId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chatControllerGetChatById(chatId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.chatControllerGetChatById(chatId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChatApi.chatControllerGetChatById']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} senderId 
         * @param {string} recipients 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chatControllerGetChatByParticipants(senderId: string, recipients: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.chatControllerGetChatByParticipants(senderId, recipients, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChatApi.chatControllerGetChatByParticipants']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chatControllerGetChatsByUserId(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.chatControllerGetChatsByUserId(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChatApi.chatControllerGetChatsByUserId']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ChatApi - factory interface
 * @export
 */
export const ChatApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ChatApiFp(configuration)
    return {
        /**
         * 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerCreateChat(body: object, options?: any): AxiosPromise<void> {
            return localVarFp.chatControllerCreateChat(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} chatId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerGetChatById(chatId: string, options?: any): AxiosPromise<void> {
            return localVarFp.chatControllerGetChatById(chatId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} senderId 
         * @param {string} recipients 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerGetChatByParticipants(senderId: string, recipients: string, options?: any): AxiosPromise<void> {
            return localVarFp.chatControllerGetChatByParticipants(senderId, recipients, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerGetChatsByUserId(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.chatControllerGetChatsByUserId(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ChatApi - object-oriented interface
 * @export
 * @class ChatApi
 * @extends {BaseAPI}
 */
export class ChatApi extends BaseAPI {
    /**
     * 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatApi
     */
    public chatControllerCreateChat(body: object, options?: RawAxiosRequestConfig) {
        return ChatApiFp(this.configuration).chatControllerCreateChat(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} chatId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatApi
     */
    public chatControllerGetChatById(chatId: string, options?: RawAxiosRequestConfig) {
        return ChatApiFp(this.configuration).chatControllerGetChatById(chatId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} senderId 
     * @param {string} recipients 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatApi
     */
    public chatControllerGetChatByParticipants(senderId: string, recipients: string, options?: RawAxiosRequestConfig) {
        return ChatApiFp(this.configuration).chatControllerGetChatByParticipants(senderId, recipients, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatApi
     */
    public chatControllerGetChatsByUserId(id: string, options?: RawAxiosRequestConfig) {
        return ChatApiFp(this.configuration).chatControllerGetChatsByUserId(id, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * MessageApi - axios parameter creator
 * @export
 */
export const MessageApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} replyId 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerCreateMessage: async (replyId: string, body: object, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'replyId' is not null or undefined
            assertParamExists('messageControllerCreateMessage', 'replyId', replyId)
            // verify required parameter 'body' is not null or undefined
            assertParamExists('messageControllerCreateMessage', 'body', body)
            const localVarPath = `/api/message`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (replyId !== undefined) {
                localVarQueryParameter['replyId'] = replyId;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerGetMessageById: async (messageId: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageId' is not null or undefined
            assertParamExists('messageControllerGetMessageById', 'messageId', messageId)
            const localVarPath = `/api/message/getMessage/{messageId}`
                .replace(`{${"messageId"}}`, encodeURIComponent(String(messageId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerGetMessagesByChatId: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('messageControllerGetMessagesByChatId', 'id', id)
            const localVarPath = `/api/message/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MessageApi - functional programming interface
 * @export
 */
export const MessageApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MessageApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} replyId 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerCreateMessage(replyId: string, body: object, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerCreateMessage(replyId, body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['MessageApi.messageControllerCreateMessage']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerGetMessageById(messageId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerGetMessageById(messageId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['MessageApi.messageControllerGetMessageById']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerGetMessagesByChatId(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerGetMessagesByChatId(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['MessageApi.messageControllerGetMessagesByChatId']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * MessageApi - factory interface
 * @export
 */
export const MessageApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MessageApiFp(configuration)
    return {
        /**
         * 
         * @param {string} replyId 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerCreateMessage(replyId: string, body: object, options?: any): AxiosPromise<void> {
            return localVarFp.messageControllerCreateMessage(replyId, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerGetMessageById(messageId: string, options?: any): AxiosPromise<void> {
            return localVarFp.messageControllerGetMessageById(messageId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerGetMessagesByChatId(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.messageControllerGetMessagesByChatId(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MessageApi - object-oriented interface
 * @export
 * @class MessageApi
 * @extends {BaseAPI}
 */
export class MessageApi extends BaseAPI {
    /**
     * 
     * @param {string} replyId 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerCreateMessage(replyId: string, body: object, options?: RawAxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerCreateMessage(replyId, body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} messageId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerGetMessageById(messageId: string, options?: RawAxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerGetMessageById(messageId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerGetMessagesByChatId(id: string, options?: RawAxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerGetMessagesByChatId(id, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} query 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerFindAll: async (query: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'query' is not null or undefined
            assertParamExists('userControllerFindAll', 'query', query)
            const localVarPath = `/api/user`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (query !== undefined) {
                localVarQueryParameter['query'] = query;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerFindById: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('userControllerFindById', 'id', id)
            const localVarPath = `/api/user/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} query 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerFindAll(query: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerFindAll(query, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.userControllerFindAll']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerFindById(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerFindById(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.userControllerFindById']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserApiFp(configuration)
    return {
        /**
         * 
         * @param {string} query 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerFindAll(query: string, options?: any): AxiosPromise<void> {
            return localVarFp.userControllerFindAll(query, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerFindById(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.userControllerFindById(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @param {string} query 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerFindAll(query: string, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerFindAll(query, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerFindById(id: string, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerFindById(id, options).then((request) => request(this.axios, this.basePath));
    }
}



