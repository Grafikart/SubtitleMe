import orderBy from 'lodash/orderBy'

export const langs = state => state.langs
export const isDragging = state => state.dragdrop.dragging
export const isLoading = state => state.loader.loading
export const hasSubtitles = state => state.subtitles.items.length > 0
export const subtitlesByLang = state => {
  let groupedSubtitles = {}
  let sortedSubtitles = orderBy(state.subtitles.items, 'exact', 'desc')
  console.log(sortedSubtitles)
  for (let lang in state.langs) {
    groupedSubtitles[state.langs[lang]] = []
  }
  for (let subtitle of sortedSubtitles) {
    groupedSubtitles[subtitle.lang].push(subtitle)
  }
  return groupedSubtitles
}
