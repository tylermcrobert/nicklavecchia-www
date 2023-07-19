export function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
	return ['touchstart', 'touchend', 'touchmove'].includes(e.type);
}
