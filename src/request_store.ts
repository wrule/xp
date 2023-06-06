import { CompletedRequest, CompletedResponse } from 'mockttp';

const store = new Map<string, {
  request?: CompletedRequest,
  response?: CompletedResponse,
}>;

export
function UpdateRequest(request: CompletedRequest) {
  store.set(request.id, { request, response: store.get(request.id)?.response });
}

export
function UpdateResponse(response: CompletedResponse) {
  store.set(response.id, { request: store.get(response.id)?.request, response });
}
