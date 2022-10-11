import axios from 'axios'
import qs from 'querystring'


/**
*
 * error handling methods
 * status code
 * info
**/

const errorHandle = (status, info) =>{
    switch (status){
        case 400:{
            console.log('error 400: The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).');
            break;
        }
        case 401:{
            console.log('error 401: Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.');
            break;
        }
        case 403:{
            console.log('error 403: The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client\'s identity is known to the server.');
            break;
        }
        case 404:{
            console.log('error 404: The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.');
            break;
        }
        case 500:{
            console.log('error 500: The server has encountered a situation it does not know how to handle.')
            break;
        }
        case 502:{
            console.log('error 502: This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.');
            break;
        }
        default:
            console.log(info)
            break;


    }

    /**
     * create axios instance
     */

    const instance = axios.create({
    //    puiblic configuration
        timeout:5000
    })



    /**
     * Request interceptor
     */
    instance.interceptors.request.use(
        config =>{
            if (config.method === "post"){
                config.data = qs.stringify(config.data)
            }
            return config
        },
        error => Promise.reject(error)
    )

    /**
     * response interceptor
     */
    instance.interceptors.response.use(
        // complete
        response => response.status === 200 ? Promise.resolve(response) : Promise.reject(
        error => {
            const {response} = error
            errorHandle(response.status,response.info);
        }
    ))
}