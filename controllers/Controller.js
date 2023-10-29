class Controller {
  static sendResponse(response, payload) {
    
    /**
    * The default response-code is 200. We want to allow to change that. in That case,
    * payload will be an object consisting of a code and a payload. If not customized
    * send 200 and the payload as received in this method.
    */
    response.status(payload.code || 200);
    const responsePayload = payload;
    if (responsePayload instanceof Object) {
      response.json(responsePayload);
    } else {
      response.end(responsePayload);
    }
  }

  static sendError(response, error) {
    response.status(error.code || 500);
    if (error.error instanceof Object) {
      response.json(error.error);
    } else {
      response.end(error.error || error.message);
    }
  }

  static async handleRequest(request, response, serviceOperation) {

    let serviceParameter = null;

    //For GET requests, body is null/empty; send params instead    
    if(request.body == null || this.isEmpty(request.body)){
      serviceParameter = request.params;
    }else{
      serviceParameter = request.body;
    }

    try {
      const serviceResponse = await serviceOperation(serviceParameter);
      Controller.sendResponse(response, serviceResponse);
    } catch (error) {
      Controller.sendError(response, error);
    }
  }

  static isEmpty(o) {
    for (const prop in o) {
      if (Object.prototype.hasOwnProperty.call(o, prop)) {
        return false;
      }
    }
  
    return true;
  }
}

module.exports = Controller;
