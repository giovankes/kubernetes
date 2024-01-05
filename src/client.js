import path from 'path';
import fs from 'fs';
import k8s, { V1Secret } from '@kubernetes/client-node';

import { format } from './utils/format.js';

//TODO: destructure data?
export default class Client {
  constructor(config) {
    //NOTE: set base_url equal to where the kubernetes install is running
    //PASSED BY END USER
    this.base_url = `${config.host}:${config.port}/api/v1`;
    //CREATE NEW KUBERNETES CLIENT
    const kc = new k8s.KubeConfig();
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    const k8sApp = kc.makeApiClient(k8s.AppsV1Api);
    // make sure objects are available in the entire scope
    this.k8sApp = k8sApp;
    this.k8sApi = k8sApi;
  }

  //NOTE: list all pods
  async list({ metadata }) {
    const podsRes = await this.k8sApi.listNamespacedPod(metadata.name);
    return podsRes.body;
  }

  //TODO: no destructure here can start to be vague
  async create_namespace(namespace) {
    try {
      //NOTE: each k8 namespace will be created with a secret, volume and persistent volume claim
      await this.k8sApi.createNamespace(namespace);

      await this.k8sApi.createNamespacedSecret(
        namespace.metadata.name,
        format(namespace, volume_secret, 'vs')
      );
    } catch (err) {
      //NOTE: catch error
    }
  }
}
