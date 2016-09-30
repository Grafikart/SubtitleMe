export const isDragging = state => state.dragdrop.dragging
export const isLoading = state => state.loader.loading
export const hasSubtitles = state => state.subtitles.items.length > 0
export const subtitles = state => state.subtitles.items.slice(0).sort(subtitle => !subtitle.exact)
