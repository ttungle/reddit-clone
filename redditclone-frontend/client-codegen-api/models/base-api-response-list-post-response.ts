/* tslint:disable */
/* eslint-disable */
/**
 * Reddit Clone API
 * Clone Reddit With Spring Boot.
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { PostResponse } from './post-response';
/**
 * 
 * @export
 * @interface BaseApiResponseListPostResponse
 */
export interface BaseApiResponseListPostResponse {
    /**
     * 
     * @type {number}
     * @memberof BaseApiResponseListPostResponse
     */
    status?: number;
    /**
     * 
     * @type {Array<PostResponse>}
     * @memberof BaseApiResponseListPostResponse
     */
    data?: Array<PostResponse>;
}
