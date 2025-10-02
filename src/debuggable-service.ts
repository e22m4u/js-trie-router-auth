import {ServiceContainer} from '@e22m4u/js-service';
import {DebuggableService as BaseDebuggableService} from '@e22m4u/js-service';

/**
 * Debuggable service.
 */
export class DebuggableService extends BaseDebuggableService {
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container?: ServiceContainer) {
    super(container, {
      namespace: 'jsTrieRouterAuth',
      noEnvironmentNamespace: true,
    });
  }
}
