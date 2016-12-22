import async from 'async'
const subtitler = window.require('subtitler')
const storage = window.require('electron-json-storage')
const langs = {eng: 'English', fre: 'Français'}

global.storage = storage

/**
 * Load settings from json storage
 */
export const loadSettings = ({ commit }) => {
  storage.get('settings', function (error, data) {
    if (error) throw error
    commit('SET_SETTINGS', data)
  })
}

/**
 * Save new settings
 * @param settings object containing settings
 */
export const setSettings = ({ commit, state }, settings) => {
  commit('SET_SETTINGS', settings)
  storage.set('settings', state.settings, (error) => {
    if (error) throw error
  })
}

/**
 * Add a new openSubtitle subtitle to the list
 * @param subtitle object subtitle returned from subtitler
 * @param file File file dropped
 * @param lang
 */
export const addOpenSubtitle = ({ commit }, { subtitle, file, lang }) => {
  commit('ADD_SUBTITLE', {
    name: subtitle.SubFileName,
    episode: subtitle.SeriesEpisode,
    season: subtitle.SeriesSeason,
    download: subtitle.SubDownloadLink,
    exact: subtitle.MatchedBy === 'moviehash',
    dislikes: subtitle.SubBad,
    file: file.path,
    lang: lang
  })
}

/**
 * Add a new openSubtitle subtitle to the list
 * @param files FileList dropped files
 */
export const handleFiles = ({ commit, dispatch }, files) => {
  if (files === undefined) {
    return null // TODO: Handle this error ?
  }
  commit('SUBTITLES_Q', files)
  dispatch('processQ')
}

/**
 * Process the first element in the subtitle Q
 */
export const processQ = ({ commit, dispatch, getters, state }) => {
  commit('SHIFT_SUBTITLES_Q')
  console.log(state.subtitles)
  let file = state.subtitles.current
  if (file === undefined) {
    return null // TODO: Handle this error ?
  }
  commit('RESET_SUBTITLES')
  commit('START_LOADING')
  subtitler.api.login().then(token => {
    let calls = []
    for (let lang in langs) {
      calls.push(function (callback) {
        subtitler.api.searchForFile(token, lang, file.path).then(subtitles => {
          subtitles.forEach(subtitle => {
            dispatch('addOpenSubtitle', { subtitle, file, lang: langs[lang] })
          })
          callback()
        })
      })
      calls.push(function (callback) {
        subtitler.api.searchForTitle(token, lang, file.name).then(subtitles => {
          subtitles.forEach(subtitle => {
            dispatch('addOpenSubtitle', { subtitle, file, lang: langs[lang] })
          })
          callback()
        })
      })
    }
    async.parallel(calls, _ => {
      if (!getters.hasSubtitles) {
        dispatch('error', file.name)
        window.setTimeout(function () {
          commit('REMOVE_ERROR')
        }, 2500)
      }
      commit('END_LOADING')
    })
  })
}

/**
 * Add error for a file
 * @param filename String name of the file that throw an error
 */
export const error = ({ commit }, filename) => {
  commit('ADD_ERROR', filename)
}

/**
 * Start a download for the subtitle
 * @param subtitle Object
 */
export const download = ({ commit, state, dispatch }, subtitle) => {
  let zlib = window.require('zlib')
  let http = window.require('http')
  let fs = window.require('fs')
  let path = window.require('path')

  // On construit le chemin du fichier
  let dirname = path.dirname(subtitle.file)
  let extension = path.extname(subtitle.file).substring(1)
  let basename = path.basename(subtitle.file, '.' + extension)
  let filename = state.settings.filename
    .replace('{name}', basename)
    .replace('{ext}', extension)

  // On télécharge le fichier
  let subtitleFile = path.join(dirname, filename)
  commit('START_LOADING')
  http.get(subtitle.download, function (response) {
    let gunzip = zlib.createGunzip()
    let dest = fs.createWriteStream(subtitleFile)
    response.pipe(gunzip).pipe(dest)
    return gunzip.on('end', function () {
      commit('END_LOADING')
      commit('RESET_SUBTITLES')
      response.unpipe(gunzip)
      response.unpipe(dest)
      if (state.settings.notifications) {
        /* eslint-disable no-new */
        new window.Notification('Bravo', {
          body: subtitle.name + '.srt téléchargé avec succès !'
        })
      }
      if (state.subtitles.q.length > 0) {
        dispatch('processQ')
      }
    })
  })
}
