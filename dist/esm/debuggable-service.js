import { DebuggableService as BaseDebuggableService } from '@e22m4u/js-service';
/**
 * Debuggable service.
 */
export class DebuggableService extends BaseDebuggableService {
    /**
     * Constructor.
     *
     * @param container
     */
    constructor(container) {
        super(container, { noEnvNs: true, namespace: '' });
    }
}
