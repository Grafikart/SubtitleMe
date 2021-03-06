import { orderBy } from 'lodash'

export const langs = state => state.langs
export const error = state => state.error
export const settings = state => state.settings
export const isDragging = state => state.dragdrop.dragging
export const isLoading = state => state.loader.loading
export const hasSubtitles = state => state.subtitles.items.length > 0
export const subtitlesByLang = state => {
  let groupedSubtitles = {}
  let sortedSubtitles = orderBy(state.subtitles.items, 'exact', 'desc')
  for (let lang in state.langs) {
    groupedSubtitles[state.langs[lang]] = []
  }
  for (let subtitle of sortedSubtitles) {
    groupedSubtitles[subtitle.lang].push(subtitle)
  }
  return groupedSubtitles
}
