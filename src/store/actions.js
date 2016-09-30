import async from 'async'
let subtitler = window.require('subtitler')
let langs = {eng: 'English', fre: 'Français'}

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

export const handleFile = ({ commit, dispatch }, file) => {
  if (file === undefined) {
    return null // TODO: Mettre un message d'erreur
  }
  subtitler.api.login().then(token => {
    commit('RESET_SUBTITLES')
    commit('START_LOADING')
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
      commit('END_LOADING')
    })
  })
}

export const download = ({ commit }, subtitle) => {
  let zlib = window.require('zlib')
  let http = window.require('http')
  let fs = window.require('fs')
  let subtitleFile = subtitle.file + '.srt'
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
      /* eslint-disable no-new */
      new window.Notification('Bravo', {
        body: subtitle.name + '.srt téléchargé avec succès !'
      })
    })
  })
}
