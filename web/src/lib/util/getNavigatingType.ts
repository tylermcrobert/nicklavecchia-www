import type { Navigation } from '@sveltejs/kit';
import { MODAL_ROUTES } from '../../constants';

export function getNavigatingType(navigating: Navigation | null) {
	const navigatingTo = navigating?.to?.route.id || '';
	const navigatingFrom = navigating?.from?.route.id || '';

	const toModal = MODAL_ROUTES.includes(navigatingTo);
	const fromModal = MODAL_ROUTES.includes(navigatingFrom);
	const lateral = !fromModal && !toModal;

	return { toModal, fromModal, lateral };
}
